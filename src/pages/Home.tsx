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

let date_time = new Date();
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let date = ("0" + date_time.getDate()).slice(-2);
let day = date_time.getDay();
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const Home: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar h-0>
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
            <div className="grid grid-cols-2 min-w-full p-3 gap-3">
                <div className="flex flex-col p-3 gap-1 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl  overflow-hidden">
                    <div className="text-2xl font-bold text-accent">{weekDays[day-1]}</div>
                    <div className="text-4xl font-light">{date}.{month}</div>
                    <div className="absolute text-accent text-9xl -bottom-5 -right-2 rotate-45 -z-10"><FaCalendarAlt /></div>
                </div>
                <div className="flex flex-col p-3 gap-1 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl">
                    <div className="text-3xl font-bold text-accent">Journal</div>
                    <div className="opacity-40 text-sm">NO ENTRIES TODAY</div>
                </div>
                <div className="flex flex-col p-3 gap-1 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl">
                    <div className="text-3xl font-bold text-accent">Tasks</div>
                    <div className="opacity-40 text-sm">NO TASKS ADDED</div>
                </div>
                <div className="flex flex-col p-3 gap-1 relative bg-black/30 min-w-1/2 min-h-[33%] aspect-square rounded-2xl overflow-hidden">
                    <div className="text-3xl font-bold text-accent">Health</div>
                    <div className="text-lg">1235 steps</div>
                    <div className="absolute text-accent text-9xl -bottom-5 -right-0 rotate-[30deg] -z-10"><BsFillHeartPulseFill /></div>
                </div>
            </div>
            <div className="flex flex-row p-3 m-2 gap-1 relative bg-black/30 min-w-1/2 min-h-[33%] rounded-2xl items-center">
                <div className="text-accent text-9xl"><GiJugglingSeal /></div>
                <div className="flex flex-col">
                    <div className="text-3xl font-bold text-accent">Seal Quote</div>
                    <div className="opacity-40 text-sm">"Success is not final, failure is not fatal: It is the courage to continue that counts." — Winston S. Churchill</div>
                </div>
            </div>        
        </div>        
    );
};

export default Home;
