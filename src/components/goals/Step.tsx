import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import GoalStepEditor from './StepEditor';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateStepMutation, useUpdateStepMutation } from '../../api/goals';
import { Step } from '../../types/goals';

const GoalStep: React.FC<{
    step?: Step;
    editable?: boolean;
    phaseId?: number;
    create?: boolean;
    onCreate?: () => void;
    doneCreating?: boolean;
    className?: string;
}> = ({
    step,
    editable = false,
    phaseId,
    create = false,
    onCreate,
    doneCreating,
    className,
}) => {
    const { register, handleSubmit } = useForm();
    const [createStep] = useCreateStepMutation();
    const [updateStep] = useUpdateStepMutation();
    const [inEdit, setInEdit] = useState(false);
    const [done, setDone] = useState(step ? step.isDone : false);
    const createForm = useRef<HTMLFormElement | null>(null);

    const toggleDone = (e: MouseEvent) => {
        e.stopPropagation();
        if (step) {
            updateStep({
                id: step.id,
                changes: { isDone: !done },
            });
        } else {
            setDone(!done);
        }
    };

    useEffect(() => {
        if (!step) return;
        setDone(step.isDone);
    }, [step]);

    useEffect(() => {
        if (!doneCreating) return;
        createForm.current && createForm.current.requestSubmit();
    }, [doneCreating]);

    const handleCreate = async (data: any) => {
        phaseId &&
            (await createStep({
                phaseId,
                title: data.title,
                isDone: done,
            }));
        onCreate && onCreate();
    };

    return (
        <>
            {inEdit && step && (
                <GoalStepEditor step={step} close={() => setInEdit(false)} />
            )}
            <div
                className={
                    'bg-white/5 rounded-md flex items-center px-2 font-semibold h-14 gap-3 ' +
                    className
                }
                onClick={() => editable && setInEdit(true)}
            >
                {done ? (
                    <FaCheckCircle
                        className="text-accent w-6 h-6 ml-2"
                        onClick={toggleDone}
                    />
                ) : (
                    <FaRegCircle
                        className="text-white/20 w-6 h-6 ml-2"
                        onClick={toggleDone}
                    />
                )}
                {create ? (
                    <form
                        className="flex-1 w-0 h-full"
                        onSubmit={handleSubmit(handleCreate)}
                        ref={createForm}
                    >
                        <input
                            className="h-full text-lg bg-transparent w-full outline-none overflow-x-auto whitespace-nowrap"
                            autoFocus
                            {...register('title', { required: true })}
                        />
                    </form>
                ) : (
                    step && (
                        <div className="flex flex-col flex-1 w-0">
                            <div className="text-lg leading-5">
                                {step.title}
                            </div>
                            <div className="text-white/50 leading-4 whitespace-nowrap truncate">
                                {step.description}
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default GoalStep;
