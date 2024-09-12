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
import { useGetQuoteQuery } from "../api/home";

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
    const { data: quote } = useGetQuoteQuery();
    const { data: user } = useGetUserQuery();
    const { data: journalEntries } = useGetJournalEntriesQuery({
        year: date_time.getFullYear(),
        month: date_time.getMonth() + 1,
        day: date_time.getDate(),
    });
    const { data: goals } = useGetGoalsQuery();

    return (
        <IonPage>
            <IonContent>
                <div className="grid grid-cols-2 w-full p-3 gap-3 top-safe">
                    <div className="flex flex-col p-3 py-4 gap-1 col-span-2 relative h-fit rounded-2xl text-white">
                        <div className="text-5xl font-bold text-accent">
                            Hello, {user?.name}
                        </div>
                        <div className="text-2xl font-semibold pl-0.5">
                            Have a nice day!
                        </div>
                    </div>
                    {quote && (
                        <div className="flex flex-row p-3 col-span-2 gap-1 relative bg-black/30 rounded-2xl animate-slideIn">
                            <div className="text-accent text-8xl">
                                <GiJugglingSeal />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-accent">
                                    Seal Quote
                                </div>
                                <div className="opacity-40 text-sm">
                                    {quote}
                                </div>
                            </div>
                        </div>
                    )}
                    <Link
                        to={"/app/journal"}
                        className="flex flex-col p-3 gap-3 col-span-2 relative bg-black/30 rounded-2xl text-white"
                    >
                        <div className="text-3xl font-bold text-accent leading-7 mx-1">
                            Journal
                        </div>
                        <div className="flex flex-col gap-2 min-h-[6.5rem]">
                            {journalEntries ? (
                                journalEntries.slice(0, 2).map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="text-lg font-semibold bg-white/5 p-1 px-3 rounded-lg flex gap-2 h-12 items-center"
                                    >
                                        <Mood
                                            mood={entry.mood}
                                            className="text-2xl"
                                        />
                                        <div className="text-xl">
                                            {entry.title}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Loading />
                            )}
                            {journalEntries && journalEntries.length == 0 && (
                                <div className="opacity-40 text-sm font-semibold mt-12 w-full text-center">
                                    NO ENTRIES TODAY
                                </div>
                            )}
                        </div>
                        {journalEntries && journalEntries.length > 2 && (
                            <div className="text-sm text-accent mx-1 text-center">
                                +{journalEntries.length - 2} more
                            </div>
                        )}
                    </Link>
                    <Link
                        to={"/app/goals"}
                        className="flex flex-col p-3 col-span-2 gap-3 relative bg-black/30 rounded-2xl text-white"
                    >
                        <div className="text-3xl font-bold text-accent leading-7 mx-1">
                            Your Goals
                        </div>
                        <div className="flex flex-col gap-2 min-h-[8.5rem]">
                            {goals ? (
                                goals
                                    .slice(0, 2)
                                    .map((goal) => (
                                        <GoalElement
                                            key={goal.id}
                                            goal={goal}
                                            extendable={false}
                                        />
                                    ))
                            ) : (
                                <Loading />
                            )}
                            {goals && goals.length == 0 && (
                                <div className="opacity-40 text-sm font-semibold mt-12 w-full text-center">
                                    NO GOALS SET
                                </div>
                            )}
                        </div>
                        {goals && goals.length > 2 && (
                            <div className="text-sm text-accent mx-1 text-center">
                                +{goals.length - 2} more
                            </div>
                        )}
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
