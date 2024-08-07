import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiJugglingSeal } from "react-icons/gi";

const Home: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
            </IonContent> */}
            <div className="grid grid-cols-2 min-w-full p-2 gap-3">
                <div className="flex flex-col p-2 gap-2 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl  overflow-hidden">
                    <div className="text-3xl font-bold text-accent">Friday</div>
                    <div className="text-lg">5.01</div>
                    <div className="absolute text-accent text-[120px] -bottom-2 -right-2 rotate-45"><FaCalendarAlt /></div>
                </div>
                <div className="flex flex-col p-2 gap-2 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl">
                    <div className="text-3xl font-bold text-accent">Journal</div>
                    <div className="opacity-40">NO ENTRIES TODAY</div>
                </div>
                <div className="flex flex-col p-2 gap-2 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl">
                    <div className="text-3xl font-bold text-accent">Tasks</div>
                    <div className="opacity-40">NO TASKS ADDED</div>
                </div>
                <div className="flex flex-col p-2 gap-2 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl overflow-hidden">
                    <div className="text-3xl font-bold text-accent">Health</div>
                    <div className="text-lg">1235 steps</div>
                    <div className="absolute text-accent text-[110px] -bottom-5 -right-0 rotate-[30deg]"><BsFillHeartPulseFill /></div>
                </div>
            </div>
            <div className="flex flex-row p-2 m-2 gap-2 relative bg-black/30 min-w-1/2 min-h-[33%] rounded-2xl items-center">
                <div className="text-accent text-[110px]"><GiJugglingSeal /></div>
                <div className="flex flex-col">
                    <div className="text-3xl font-bold text-accent">Seal Quote</div>
                    <div className="">"Success is not final, failure is not fatal: It is the courage to continue that counts." — Winston S. Churchill</div>
                </div>
            </div>        
        </div>        
    );
};

export default Home;
