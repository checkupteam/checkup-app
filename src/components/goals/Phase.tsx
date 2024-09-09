import { FaPlus, FaRegCircle } from "react-icons/fa";
import GoalStep from "./Step";
import { useEffect, useState } from "react";
import { Phase } from "../../types/goals";
import HoldMenu from "../HoldMenu";
import { useDeletePhaseMutation } from "../../api/goals";

const GoalPhase: React.FC<{ phase: Phase }> = ({ phase }) => {
    const [addingStep, setAddingStep] = useState(false);
    const [doneAddingStep, setDoneAddingStep] = useState(false);
    const [deletePhase] = useDeletePhaseMutation();

    useEffect(() => {
        setDoneAddingStep(false);
    }, [addingStep]);

    const PhaseMenu: React.FC<{ close: () => void }> = ({ close }) => {
        const handleDelete = () => {
            console.log("delete phase", phase.id);
            deletePhase(phase.id);
            close();
        };

        return (
            <div className="absolute z-50 -bottom-2 translate-y-full rounded-lg p-1 w-full flex justify-center items-center h-12 bg-zinc-800 font-semibold">
                <div
                    className="rounded-md flex-1 text-center h-full flex justify-center items-center text-red-500"
                    onClick={() => handleDelete()}
                >
                    Delete
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-1.5">
            <HoldMenu menu={PhaseMenu}>
                <div className="bg-black/20 rounded-md flex justify-between items-center px-2 font-semibold">
                    <div>{phase.title}</div>
                    <div className="text-white/50 text-sm">
                        {phase.Subpoint.filter((step) => step.isDone).length}/
                        {phase.Subpoint.length}
                    </div>
                </div>
            </HoldMenu>
            {phase.Subpoint.map((step) => (
                <GoalStep key={step.id} step={step} editable />
            ))}
            {addingStep ? (
                <>
                    <GoalStep
                        phaseId={phase.id}
                        create
                        onCreate={() => setAddingStep(false)}
                        doneCreating={doneAddingStep}
                    />
                    <div className="flex gap-1">
                        <div
                            className="bg-black/20 rounded-md flex flex-1 justify-center items-center gap-1 font-bold uppercase h-8"
                            onClick={() => setAddingStep(false)}
                        >
                            <div>Cancel</div>
                        </div>
                        <div
                            className="bg-accent rounded-md flex flex-1 justify-center items-center gap-1 font-bold uppercase h-8"
                            onClick={() => setDoneAddingStep(true)}
                        >
                            <div>Add</div>
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className="bg-accent rounded-md flex justify-center items-center gap-1 font-bold uppercase h-8"
                    onClick={() => setAddingStep(true)}
                >
                    <FaPlus />
                    <div>Add Step</div>
                </div>
            )}
        </div>
    );
};

export default GoalPhase;
