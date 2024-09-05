import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaPen,
    FaPlus,
    FaRegCircle,
} from "react-icons/fa";

const StepItem: React.FC = () => {
    return (
        <div className="bg-white/5 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
            <FaCheckCircle className="text-accent w-6 h-6 ml-2" />
            <div className="flex flex-col">
                <div className="text-lg leading-5">Eat a sandwich</div>
                <div className="text-white/50 leading-4">
                    with butter and ham
                </div>
            </div>
        </div>
    );
};

const GoalEdit: React.FC = () => {
    const router = useIonRouter();
    const [title, setTitle] = useState("New Goal");

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1 h-10">
                        <div
                            className="flex justify-center items-center h-10 w-10"
                            onClick={() => router.goBack()}
                        >
                            <FaArrowLeft />
                        </div>
                        <input
                            className="py-2 flex-1 outline-none overflow-x-auto whitespace-nowrap bg-transparent"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="h-full flex flex-col gap-3 p-3">
                    <div className="flex flex-col gap-6 flex-1 h-0">
                        <div className="flex flex-col gap-1.5">
                            <div className="bg-white/5 rounded-md flex justify-between items-center px-2 font-semibold">
                                <div>Phase 1</div>
                                <div className="text-white/50 text-sm">1/2</div>
                            </div>
                            <StepItem />
                            <div className="bg-white/5 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
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
                            <div className="bg-accent rounded-md flex justify-center items-center gap-1 font-bold uppercase h-8">
                                <FaPlus />
                                <div>Add Step</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="bg-white/5 rounded-md flex justify-between items-center px-2 font-semibold">
                                <div>Phase 2</div>
                                <div className="text-white/50 text-sm">1/2</div>
                            </div>
                            <div className="bg-white/5 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
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
                            <div className="bg-white/5 rounded-md flex items-center px-2 font-semibold h-14 gap-3">
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
                            <div className="bg-accent rounded-md flex justify-center items-center gap-1 font-bold uppercase h-8">
                                <FaPlus />
                                <div>Add Step</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 h-12">
                        <div className="bg-accent rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase">
                            Add Phase
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GoalEdit;
