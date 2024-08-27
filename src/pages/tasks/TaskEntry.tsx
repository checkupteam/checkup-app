import React, { useState } from "react";
import { IonRouterOutlet, IonHeader, IonPage, useIonRouter, IonToolbar } from "@ionic/react";
import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircle } from "react-icons/md";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Route } from "react-router";
import { MdEdit } from "react-icons/md";

const TaskEntry: React.FC = () => {
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <IonHeader className="shadow-none bg-primary/20">
                    <IonToolbar>
                        <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1">
                            <div className="flex justify-center items-center h-10 w-10" onClick={() => router.goBack()}>
                                <FaArrowLeft />
                            </div>
                            <div className="flex flex-row items-center gap-2 flex-1">
                                <div className="py-2 outline-none overflow-x-auto whitespace-nowrap" contentEditable>
                                    New Task
                                </div>
                                <MdEdit className="opacity-30" />
                            </div>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <div className="flex flex-col p-3 w-full h-full bg-primary/40 gap-6">
                    <textarea name="" id="" placeholder="Add description" className="w-full flex flex-1 flex-start outline-none resize-none rounded-2xl text-xl p-3"></textarea>

                    {!keyboardVisible && (
                        <div
                            className="bg-accent rounded-full h-12 flex justify-center items-center text-lg font-bold uppercase"
                            // onClick={saveEntry}
                        >
                            save
                        </div>
                    )}
                </div>
            </IonRouterOutlet>
        </IonPage>
    );
};

export default TaskEntry;
