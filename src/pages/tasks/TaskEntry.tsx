import React, { useEffect, useState } from "react";
import { IonRouterOutlet, IonHeader, IonPage, useIonRouter, IonToolbar } from "@ionic/react";
import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircle } from "react-icons/md";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Route, RouteComponentProps } from "react-router";
import { MdEdit } from "react-icons/md";
import { useCreateTaskMutation, useGetTaskQuery, useUpdateTaskMutation } from "../../api/tasks";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { set } from "react-hook-form";

interface TaskEntryPageProps
    extends RouteComponentProps<{
        id?: string;
    }> {}

const TaskEntry: React.FC<TaskEntryPageProps> = ({ match }) => {
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const [createTaskEntry] = useCreateTaskMutation();
    const [updateTaskEntry] = useUpdateTaskMutation();

    const id = match.params.id ? parseInt(match.params.id) : undefined;

    const { data: entry, isLoading } = useGetTaskQuery(id!, {
        skip: id == undefined,
    });

    useEffect(() => {
        if (Capacitor.getPlatform() != "web") {
            Keyboard.addListener("keyboardWillShow", () => {
                setKeyboardVisible(true);
            });

            Keyboard.addListener("keyboardDidHide", () => {
                setKeyboardVisible(false);
            });

            return () => {
                Keyboard.removeAllListeners();
            };
        }
    }, []);

    useEffect(() => {
        if (entry) {
            setContent(entry.text);
            setTitle(entry.title);
        }
    }, [entry]);

    const saveEntry = () => {
        if (entry && id !== undefined) {
            updateTaskEntry({
                id,
                changes: {
                    title,
                    text: content,
                },
            });
        } else {
            createTaskEntry({
                title,
                isDone: false,
                text: content,
            });
        }
        router.goBack();
    };

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
                                <input className="py-2 outline-none overflow-x-auto whitespace-nowrap" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                <MdEdit className="opacity-30" />
                            </div>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <div className="flex flex-col p-3 w-full h-full bg-primary/40 gap-6">
                    <div
                        className="w-full flex flex-1 flex-start outline-none resize-none rounded-2xl text-xl p-3"
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: content }}
                        onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                    ></div>

                    {!keyboardVisible && (
                        <div className="bg-accent rounded-full h-12 flex justify-center items-center text-lg font-bold uppercase" onClick={saveEntry}>
                            save
                        </div>
                    )}
                </div>
            </IonRouterOutlet>
        </IonPage>
    );
};

export default TaskEntry;
