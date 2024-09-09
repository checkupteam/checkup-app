import { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaRegCircle,
    FaTrash,
    FaTrashAlt,
} from "react-icons/fa";
import { Step } from "../../types/goals";
import { useDebounce } from "@reactuses/core";
import { useDeleteStepMutation, useUpdateStepMutation } from "../../api/goals";

const GoalStepEditor: React.FC<{ close: () => void; step: Step }> = ({
    close,
    step,
}) => {
    const [updateStep] = useUpdateStepMutation();
    const [deleteStep] = useDeleteStepMutation();
    const [title, setTitle] = useState(step.title);
    const [description, setDescription] = useState(step.description || "");
    const debouncedTitle = useDebounce(title, 200);
    const debouncedDescription = useDebounce(description, 200);

    useEffect(() => {
        if (debouncedTitle.length == 0) return;
        updateStep({
            id: step.id,
            changes: {
                title: debouncedTitle,
                description: debouncedDescription,
            },
        });
    }, [debouncedTitle, debouncedDescription]);

    const toggleDone = () => {
        updateStep({
            id: step.id,
            changes: {
                isDone: !step.isDone,
            },
        });
    };

    const handleDelete = () => {
        deleteStep(step.id);
        close();
    };

    return (
        <>
            <div
                className="absolute top-0 left-0 h-full w-full flex items-end bg-black/30 backdrop-blur-xs animate-fadeIn"
                onClick={() => close()}
            ></div>
            <div className="absolute bottom-0 left-0 z-50 w-full rounded-t-xl bg-zinc-800 flex flex-col gap-2 p-4">
                <div className="flex gap-1 items-center w-full">
                    {step.isDone ? (
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
                    <input
                        className="outline-none overflow-x-auto whitespace-nowrap bg-black/20 text-xl p-2 rounded-lg flex-1 w-0 ml-2"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FaTrashAlt
                        className="text-red-500 w-5 h-5 cursor-pointer mx-2"
                        onClick={() => handleDelete()}
                    />
                </div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="outline-none bg-black/20 text-xl p-2 rounded-lg"
                    rows={4}
                    placeholder="Description"
                ></textarea>
            </div>
        </>
    );
};

export default GoalStepEditor;
