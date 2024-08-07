import { IonHeader, IonToolbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";

const JournalList: React.FC = () => {
    const router = useIonRouter();
    const [favorites, setFavorites] = useState(false);

    return (
        <>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-2xl font-bold">
                        <div className="py-2">Journal</div>
                        <div
                            className={`flex gap-1 px-2 p-1 items-center w-fit rounded-lg text-sm h-fit ${
                                favorites ? "bg-accent" : "bg-white/10"
                            }`}
                            onClick={() => setFavorites((c) => !c)}
                        >
                            <FaStar />
                            <div>favorites</div>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <div className="p-3 overflow-auto">
                <div className="text-center w-full text-neutral-600 font-bold uppercase py-4">
                    no entires
                </div>
                <div
                    className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl"
                    onClick={() => router.push("/journal/add")}
                >
                    <FaPlus />
                </div>
            </div>
        </>
    );
};

export default JournalList;
