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
import SealLong from "../assets/long_seal.svg";

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
                <div className="grid grid-cols-2 w-full p-4 px-6 gap-3">
                    <div className="flex flex-col p-1 py-4 gap-1 col-span-2 relative h-fit rounded-2xl text-white">
                        <div className="text-5xl font-bold text-darker-violet-500">
                            Hello, {user?.name}
                        </div>
                        <div className="text-2xl font-semibold pl-0.5 opacity-90">
                            Have a nice day!
                        </div>
                    </div>
                    {quote && (
                        <div className="flex col-span-2">
                            <div className="flex flex-1 w-0 flex-row p-2 min-h-36 px-3 col-span-2 overflow-hidden gap-3 relative bg-gradient-to-br from-darker-violet-700 to-darker-violet-800 rounded-xl z-10">
                                <div className="flex flex-col">
                                    <div className="text-2xl font-bold text-darker-violet-300">
                                        Seal Quote
                                    </div>
                                    <div className="opacity-60 font-semibold text-sm pb-1">
                                        "{quote}"
                                    </div>
                                </div>
                            </div>
                            <img
                                src={SealLong}
                                alt=""
                                className="h-32 rotate-[50deg] -mt-1 -ml-10"
                            />
                        </div>
                    )}
                    <Link
                        to={"/app/journal"}
                        className="flex flex-col p-2 pt-3 gap-2 col-span-2 md:col-span-1 relative bg-gradient-to-br from-darker-violet-800 to-darker-violet-850 rounded-xl text-white shadow-md shadow-darker-violet-900"
                    >
                        <div className="text-lg font-bold text-darker-violet-300 leading-5 mx-1 uppercase">
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
                                <div className="opacity-40 text-violet-300 text-sm font-bold mt-8 w-full text-center">
                                    NO ENTRIES TODAY
                                </div>
                            )}
                        </div>
                        {journalEntries && journalEntries.length > 2 && (
                            <div className="text-sm opacity-40 text-violet-300 mx-1 text-center">
                                +{journalEntries.length - 2} more
                            </div>
                        )}
                    </Link>
                    <Link
                        to={"/app/goals"}
                        className="flex flex-col p-2 pt-3 gap-2 col-span-2 md:col-span-1 relative bg-gradient-to-br from-darker-violet-800 to-darker-violet-850 rounded-xl text-white shadow-md shadow-darker-violet-900"
                    >
                        <div className="text-lg font-bold text-darker-violet-300 leading-5 mx-1 uppercase">
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
                                <div className="opacity-40 text-violet-300 text-sm font-bold mt-8 w-full text-center">
                                    NO GOALS SET
                                </div>
                            )}
                        </div>
                        {goals && goals.length > 2 && (
                            <div className="text-sm opacity-40 text-violet-300 mx-1 text-center">
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
