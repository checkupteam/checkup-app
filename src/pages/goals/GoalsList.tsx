import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useLongPress } from "@reactuses/core";
import { useState } from "react";
import { FaCheckCircle, FaPlus, FaRegCircle } from "react-icons/fa";
import { useHistory } from "react-router";

const ListItem: React.FC = () => {
    const [extended, setExtended] = useState(false);
    const [tooltip, setTooltip] = useState(false);

    const onLongPress = () => {
        setExtended(false);
        setTooltip(true);
    };

    const longPressEvent = useLongPress(onLongPress, {
        isPreventDefault: false,
        delay: 300,
    });

    return (
        <>
            {tooltip && (
                <div
                    className="z-40 absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-xs animate-fadeIn"
                    onClick={() => setTooltip(false)}
                ></div>
            )}
            <div
                className={
                    "flex flex-col bg-white/5 rounded-lg relative " +
                    (extended ? "h-fit" : "h-16") +
                    (tooltip ? " z-50" : "")
                }
            >
                <div
                    className="flex items-center gap-2 cursor-pointer p-2.5 h-16"
                    onClick={() => !tooltip && setExtended(!extended)}
                    {...longPressEvent}
                >
                    <div className="rounded-md h-full aspect-square bg-black/20 grid place-content-center font-bold">
                        1/4
                    </div>
                    <div className="flex flex-col flex-1 font-bold text-lg gap-0.5 pr-1">
                        <div>Create an Application</div>
                        <div className="rounded-full p-0.5 h-2 w-full bg-black/20">
                            <div className="bg-accent rounded-full w-1/2 h-full"></div>
                        </div>
                    </div>
                </div>
                {extended && (
                    <div className="flex flex-col gap-2 p-3 pt-0">
                        <div className="flex flex-col gap-1">
                            <div className="bg-black/20 rounded-md flex justify-between items-center px-2 font-semibold">
                                <div>Phase 1</div>
                                <div className="text-white/50 text-sm">1/2</div>
                            </div>
                            <div className="bg-black/20 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
                                <FaCheckCircle className="text-accent w-6 h-6 ml-2" />
                                <div className="flex flex-col">
                                    <div className="text-lg leading-5">
                                        Eat a sandwich
                                    </div>
                                    <div className="text-white/50 leading-4">
                                        with butter and ham
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/20 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
                                <FaRegCircle className="text-white/20 w-6 h-6 ml-2" />
                                <div className="flex flex-col">
                                    <div className="text-lg leading-5">
                                        Eat a sandwich
                                    </div>
                                    <div className="text-white/50 leading-4">
                                        with butter and ham
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-black/20 rounded-md flex justify-between items-center px-2 font-semibold">
                                <div>Phase 2</div>
                                <div className="text-white/50 text-sm">1/2</div>
                            </div>
                            <div className="bg-black/20 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
                                <FaCheckCircle className="text-accent w-6 h-6 ml-2" />
                                <div className="flex flex-col">
                                    <div className="text-lg leading-5">
                                        Eat a sandwich
                                    </div>
                                    <div className="text-white/50 leading-4">
                                        with butter and ham
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/20 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
                                <FaRegCircle className="text-white/20 w-6 h-6 ml-2" />
                                <div className="flex flex-col">
                                    <div className="text-lg leading-5">
                                        Eat a sandwich
                                    </div>
                                    <div className="text-white/50 leading-4">
                                        with butter and ham
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {tooltip && (
                    <div className="absolute z-50 -bottom-2 translate-y-full rounded-lg p-1 w-full flex justify-center items-center h-12 bg-zinc-800 font-semibold">
                        <div className="rounded-md flex-1 text-center h-full flex justify-center items-center">
                            Edit
                        </div>
                        <div className="h-full w-[2px] bg-zinc-700"></div>
                        <div className="rounded-md flex-1 text-center h-full flex justify-center items-center text-red-500">
                            Delete
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const GoalsList: React.FC = () => {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-2xl font-bold h-10 text-white">
                        <div>Goals</div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} class="flex flex-col">
                <div className="p-3 pb-24 overflow-auto flex flex-col gap-2 h-full">
                    <ListItem />
                    <ListItem />
                </div>
                <div
                    className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl text-white"
                    onClick={() => router.push("/goals/12")}
                >
                    <FaPlus />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GoalsList;
