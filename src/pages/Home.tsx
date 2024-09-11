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
import Mood from "../components/Mood";
import { JournalEntry } from "../types/journal";
import { useGetJournalEntriesQuery } from "../api/journal";
import { useGetUserQuery } from "../api/auth";
import GoalElement from "../components/goals/Goal";
import { useGetGoalsQuery } from "../api/goals";
import Loading from "../components/Loading";

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
    const { data: user } = useGetUserQuery();
    const { data: journalEntries } = useGetJournalEntriesQuery({
        year: date_time.getFullYear(),
        month: date_time.getMonth() + 1,
        day: date_time.getDate(),
    });
    const { data: goals } = useGetGoalsQuery();

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar className="h-0"></IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="grid grid-cols-2 w-full p-3 gap-3">
                    <div className="flex flex-col p-3 py-8 gap-1 col-span-2 relative h-fit rounded-2xl text-white">
                        <div className="text-5xl font-bold text-accent">
                            Hello, {user?.name}
                        </div>
                        <div className="text-2xl font-semibold pl-0.5">
                            Have a nice day!
                        </div>
                    </div>
                    <Link
                        to={"/app/journal"}
                        className="flex flex-col p-3 gap-2 col-span-2 relative bg-black/30 h-44 rounded-2xl text-white"
                    >
                        <div className="text-3xl font-bold text-accent leading-7 mx-1">
                            Journal
                        </div>
                        {!journalEntries || journalEntries.length == 0 ? (
                            <div className="opacity-40 text-sm mx-1">
                                NO ENTRIES TODAY
                            </div>
                        ) : (
                            <div className="flex-1 shrink-0 h-0 overflow-auto flex flex-col gap-1">
                                {journalEntries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="text-lg font-semibold bg-black/30 p-1 px-2 rounded-lg flex gap-1 items-center"
                                    >
                                        <Mood mood={entry.mood} />
                                        <div>{entry.title}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>
                    <Link 
                    to={"/app/goals"}
                    className="flex flex-col p-3 col-span-2 gap-2 relative bg-black/30 h-44 rounded-2xl text-white">
                        <div className="text-3xl font-bold text-accent leading-7 mx-1">
                            Your Goals
                        </div>
                        {goals ? (
                        goals.map((goal) => (
                            <GoalElement key={goal.id} goal={goal} extendable={false}/>
                        ))
                    ) : (
                        <Loading />
                    )}
                    </Link>
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
