import { useLongPress } from "@reactuses/core";
import { useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Goal } from "../../types/goals";
import { Link } from "react-router-dom";
import { useDeleteGoalMutation, useGetGoalQuery } from "../../api/goals";
import GoalStep from "./Step";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const GoalDetails: React.FC<{ goal: Goal }> = ({ goal }) => {
    const { data } = useGetGoalQuery(goal.id);

    return (
        data && (
            <div className="flex flex-col gap-2 p-3 pt-0">
                {data.Phase.length > 0 ? (
                    data.Phase.map((phase) => (
                        <div className="flex flex-col gap-1" key={phase.id}>
                            <div className="bg-black/20 rounded-md flex justify-between items-center px-2 font-semibold">
                                <div>{phase.title}</div>
                                <div className="text-white/50 text-sm">
                                    {
                                        phase.Subpoint.filter(
                                            (step) => step.isDone
                                        ).length
                                    }
                                    /{phase.Subpoint.length}
                                </div>
                            </div>
                            {phase.Subpoint.map((step) => (
                                <GoalStep
                                    key={step.id}
                                    step={step}
                                    className="bg-black/20"
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-white/50 text-center font-semibold">
                        No steps yet
                    </div>
                )}
            </div>
        )
    );
};

const GoalElement: React.FC<{ goal: Goal; extendable?: boolean }> = ({
    goal,
    extendable = true,
}) => {
    const { data } = useGetGoalQuery(goal.id);
    const [extended, setExtended] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [deleteGoal] = useDeleteGoalMutation();

    const onLongPress = () => {
        if (!extendable) return;
        Haptics.impact({ style: ImpactStyle.Light });
        setExtended(false);
        setTooltip(true);
    };

    const longPressEvent = useLongPress(onLongPress, {
        isPreventDefault: false,
        delay: 300,
    });

    return (
        data && (
            <>
                {tooltip && (
                    <div
                        className="z-40 fixed bottom-0 top-0 left-0 h-full w-full bg-black/30 backdrop-blur-xs animate-fadeIn"
                        onClick={() => setTooltip(false)}
                    ></div>
                )}
                <div
                    className={
                        "flex flex-col bg-white/5 rounded-lg relative animate-slideIn " +
                        (extended ? "h-fit" : "h-16") +
                        (tooltip ? " z-50" : "")
                    }
                >
                    <div
                        className="flex items-center gap-2 cursor-pointer p-2.5 h-16"
                        onClick={() =>
                            extendable && !tooltip && setExtended(!extended)
                        }
                        {...longPressEvent}
                    >
                        <div className="rounded-md h-full aspect-square bg-black/20 grid place-content-center font-bold">
                            {data.Phase.reduce(
                                (acc, phase) =>
                                    acc +
                                    phase.Subpoint.filter((step) => step.isDone)
                                        .length,
                                0
                            )}
                            /
                            {data.Phase.reduce(
                                (acc, phase) => acc + phase.Subpoint.length,
                                0
                            )}
                        </div>
                        <div className="flex flex-col flex-1 font-bold text-lg gap-0.5 pr-1">
                            <div>{goal.title}</div>
                            <div className="rounded-full p-0.5 h-2 w-full bg-black/20">
                                <div
                                    className="bg-accent rounded-full h-full transition-all"
                                    style={{
                                        width: `${
                                            (data.Phase.reduce(
                                                (acc, phase) =>
                                                    acc +
                                                    phase.Subpoint.filter(
                                                        (step) => step.isDone
                                                    ).length,
                                                0
                                            ) /
                                                data.Phase.reduce(
                                                    (acc, phase) =>
                                                        acc +
                                                        phase.Subpoint.length,
                                                    0
                                                )) *
                                            100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    {extended && <GoalDetails goal={goal} />}
                    {tooltip && (
                        <div className="absolute z-50 -bottom-2 translate-y-full rounded-lg p-1 w-full flex justify-center items-center h-12 bg-zinc-800 font-semibold">
                            <Link
                                to={`/app/goals/${goal.id}`}
                                onClick={() => setTooltip(false)}
                                className="rounded-md flex-1 text-center h-full flex justify-center items-center"
                            >
                                Edit
                            </Link>
                            <div className="h-full w-[2px] bg-zinc-700"></div>
                            <div
                                className="rounded-md flex-1 text-center h-full flex justify-center items-center text-red-500"
                                onClick={() => deleteGoal(goal.id)}
                            >
                                Delete
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    );
};

export default GoalElement;
