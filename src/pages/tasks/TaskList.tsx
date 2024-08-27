import React, { useState } from "react";
import { IonRouterOutlet, IonHeader, IonPage, useIonRouter, IonToolbar } from "@ionic/react";
import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircle } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { TaskEntry } from "../../types/tasks";
import { useHistory } from "react-router";
import { useGetTasksQuery, useUpdateTaskMutation } from "../../api/tasks";
import Loading from "../../components/Loading";

const TaskItem: React.FC<{ entry: TaskEntry }> = ({ entry }) => {
    const router = useIonRouter();
    const [hidder, setHidder] = useState(true);
    const [updateTask] = useUpdateTaskMutation();
    const [task, checkTask] = useState(false);

    const checkTaskDb = () => {
        updateTask({
            id: entry.id,
            changes: {
                isDone: !entry.isDone,
            },
        });
    };
    return (
        <div className="flex flex-row w-full bg-black/30 p-2 rounded-xl items-center justify-between gap-4">
            <div className="text-5xl flex items-start text-white">{entry.isDone ? <MdOutlineCheckCircle onClick={() => checkTaskDb()} /> : <MdOutlineRadioButtonUnchecked onClick={() => checkTaskDb()} />}</div>
            <div className="flex flex-col flex-1" onClick={() => setHidder(!hidder)}>
                <div className="text-xl font-bold">{entry.title}</div>
                <div className={`text-lg opacity-45 text-wrap overflow-hidden ${hidder ? "h-8" : "max-h-full"} `}>{entry.text}</div>
            </div>
        </div>
    );
};

const TaskList: React.FC = () => {
    const router = useIonRouter();
    const [hidder, setHidder] = useState(true);
    const [updateTask] = useUpdateTaskMutation();
    const history = useHistory();
    const { data: entries, isLoading } = useGetTasksQuery({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    });

    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <IonHeader>
                    <IonToolbar>
                        <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                            <div className="py-2">Tasks</div>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <div className="flex flex-col gap-3 p-4">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full bg-black/30 p-2 rounded-xl items-center justify-between gap-4">{isLoading ? <Loading /> : entries?.map((entry) => <TaskItem entry={entry} />)}</div>
                    </div>
                </div>
                <div className="p-3 overflow-auto">
                    <div className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl" onClick={() => history.push("/tasks/add")}>
                        <FaPlus />
                    </div>
                </div>
            </IonRouterOutlet>
        </IonPage>
    );
};

export default TaskList;
