import React, { useState } from "react";
import { IonRouterOutlet, IonHeader, IonPage, useIonRouter, IonToolbar } from "@ionic/react";
import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircle } from "react-icons/md";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Route } from "react-router";

const TaskManager: React.FC = () => {
    const router = useIonRouter();
    const [hidder, setHidder] = useState(true);
    const [task, checkTask] = useState(false);
    return (
        <div>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/tasks">
                    <IonHeader>
                        <IonToolbar>
                            <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                                <div className="py-2">Tasks</div>
                            </div>
                        </IonToolbar>
                    </IonHeader>
                    <div className="flex flex-col gap-3 p-4">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row w-full bg-black/30 p-2 rounded-xl items-center justify-between gap-4">
                                <div className="text-5xl flex items-start text-white" onClick={() => checkTask(!task)}>
                                    {task ? <MdOutlineCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
                                </div>
                                <div className="flex flex-col flex-1" onClick={() => setHidder(!hidder)}>
                                    <div className="text-xl font-bold">Groceries</div>
                                    <div className={`text-lg opacity-45 text-wrap overflow-hidden ${hidder ? "h-8" : "max-h-full"} `}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 overflow-auto">
                        <div className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl" onClick={() => router.push("/tasks/add")}>
                            <FaPlus />
                        </div>
                    </div>
                </Route>
                <Route exact path="/tasks/add">
                    <IonHeader className="shadow-none bg-primary/20">
                        <IonToolbar>
                            <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1">
                                <div className="flex justify-center items-center h-10 w-10" onClick={() => router.goBack()}>
                                    <FaArrowLeft />
                                </div>
                                <div className="py-2 flex-1 outline-none overflow-x-auto whitespace-nowrap" contentEditable>
                                    New Task
                                </div>
                                <div className="">

                                </div>
                            </div>
                        </IonToolbar>
                    </IonHeader>
                </Route>
            </IonRouterOutlet>
        </div>
    );
};

export default TaskManager;
