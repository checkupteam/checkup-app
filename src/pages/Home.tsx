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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJournalEntires } from "../store/journal";
import Mood from "../components/Mood";

let date_time = new Date();
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let date = ("0" + date_time.getDate()).slice(-2);
let day = date_time.getDay();
const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const Home: React.FC = () => {
    const journalEntires = useSelector(selectJournalEntires);
    const todayEntires = journalEntires
        .map((entry, index) => ({
            ...entry,
            index,
        }))
        .filter(
            (entry) =>
                new Date(entry.date).toDateString() === date_time.toDateString()
        );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar h-0></IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="grid grid-cols-2 w-full p-3 gap-3">
                    <Link
                        to={"/calendar"}
                        className="flex flex-col p-3 gap-1 relative bg-black/30 aspect-square rounded-2xl overflow-hidden text-white"
                    >
                        <div className="text-2xl font-bold text-accent leading-7">
                            {weekDays[day - 1]}
                        </div>
                        <div className="text-4xl leading-8 font-light">
                            {date}.{month}
                        </div>
                        <div className="absolute text-accent/80 text-9xl -bottom-5 -right-2 rotate-[40deg]">
                            <FaCalendarAlt />
                        </div>
                    </Link>
                    <Link
                        to={"/journal"}
                        className="flex flex-col p-3 px-2 gap-2 relative bg-black/30 aspect-square rounded-2xl text-white"
                    >
                        <div className="text-3xl font-bold text-accent leading-7 mx-1">
                            Journal
                        </div>
                        {todayEntires.length == 0 ? (
                            <div className="opacity-40 text-sm">
                                NO ENTRIES TODAY
                            </div>
                        ) : (
                            <div className="flex-1 shrink-0 h-0 overflow-auto flex flex-col gap-1">
                                {todayEntires.map((entry) => (
                                    <div
                                        key={entry.index}
                                        className="text-lg font-semibold bg-black/30 p-1 px-2 rounded-lg flex gap-1 items-center"
                                    >
                                        <Mood mood={entry.mood} />
                                        <div>{entry.title}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>
                    <div className="flex flex-col p-3 gap-1 relative bg-black/30 aspect-square rounded-2xl text-white">
                        <div className="text-3xl font-bold text-accent leading-7">
                            Tasks
                        </div>
                        <div className="opacity-40 text-sm mt-1">
                            NO TASKS ADDED
                        </div>
                    </div>
                    <div className="flex flex-col p-3 gap-1 relative bg-black/30 aspect-square rounded-2xl overflow-hidden text-white">
                        <div className="text-3xl font-bold text-accent leading-7">
                            Health
                        </div>
                        <div className="text-lg font-semibold">1235 steps</div>
                        <div className="absolute text-accent/80 text-9xl -bottom-5 -right-0 rotate-[30deg]">
                            <BsFillHeartPulseFill />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row p-3 mx-3 gap-1 relative bg-black/30 rounded-2xl items-center">
                    <div className="text-accent text-8xl">
                        <GiJugglingSeal />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold text-accent">
                            Seal Quote
                        </div>
                        <div className="opacity-40 text-sm">
                            "Success is not final, failure is not fatal: It is
                            the courage to continue that counts." — Winston S.
                            Churchill
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
