import React, { useRef, useState } from "react";
import { FaSmile, FaRegStar, FaBed, FaStar } from "react-icons/fa";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import { JournalEntry } from "../types/journal";
import { selectJournalEntires, updateJournalEntry } from "../store/journal";
import { useDispatch, useSelector } from "react-redux";
import Mood from "../components/Mood";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const JournalItem: React.FC<{ entry: JournalEntry; index: number }> = ({
    entry,
    index,
}) => {
    const dispatch = useDispatch();
    const router = useIonRouter();

    const switchFavoriteStatus = () => {
        dispatch(
            updateJournalEntry({
                index,
                favorite: !entry.favorite,
            })
        );
    };

    return (
        <div
            key={entry.date}
            className="bg-white/5 p-3 px-4 rounded-lg flex gap-3 items-center"
        >
            <div
                className="flex gap-3 flex-1 shrink-0 w-0 items-center"
                onClick={() => router.push(`/journal/edit/${index}`)}
            >
                <Mood mood={entry.mood} className="text-4xl" />
                <div className="flex flex-col justify-center flex-1">
                    <div className="text-xl font-bold leading-6">
                        {entry.title}
                    </div>
                    <div className="text-neutral-500 leading-5 font-semibold">
                        {new Date(entry.date)
                            .toLocaleString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                            })
                            .replaceAll("/", ".")}
                    </div>
                </div>
            </div>
            <div className="self-stretch w-8 text-xl flex justify-center items-center">
                {entry.favorite ? (
                    <FaStar
                        className="text-accent"
                        onClick={() => switchFavoriteStatus()}
                    />
                ) : (
                    <FaRegStar
                        className="text-white/20"
                        onClick={() => switchFavoriteStatus()}
                    />
                )}
            </div>
        </div>
    );
};

const Calendar: React.FC = () => {
    const journalEntries = useSelector(selectJournalEntires);
    const [currDate, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const datetime = useRef<null | HTMLIonDatetimeElement>(null);
    const now = new Date();
    const selectedEntries = journalEntries
        .map((entry, index) => ({
            ...entry,
            index,
        }))
        .filter(
            (entry) =>
                new Date(entry.date).toDateString() ===
                selectedDate.toDateString()
        );

    function getWeekDay() {
        let day = selectedDate.getDay();
        return weekDays[day - 1];
    }

    function displayCalendar() {
        const month = currDate.getMonth();
        const year = currDate.getFullYear();
        const firstWeekDay = new Date(year, month, 1).getDay() - 1;
        const days = new Date(year, month + 1, 0).getDate();
        const calendar = [];

        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 7; j++) {
                const x = 7 * (i - 1) + j;

                if (i === 1 && j <= firstWeekDay) {
                    calendar.push(new Date(year, month, 0 - firstWeekDay + j));
                } else if (7 * (i - 1) + j - firstWeekDay > days) {
                    calendar.push(
                        new Date(year, month + 1, x - days - firstWeekDay)
                    );
                } else {
                    calendar.push(new Date(year, month, x - firstWeekDay));
                }
            }
        }

        return calendar;
    }

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold text-white">
                        <div className="py-2">Calendar</div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="p-4">
                    <div className="grid grid-cols-7 text-center text-xs mb-2 gap-3">
                        {weekDays.map((day, index) => (
                            <div
                                key={index}
                                className={`${
                                    getWeekDay() === day
                                        ? "text-accent"
                                        : "text-white"
                                } font-bold`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div
                        className={`grid grid-cols-7 text-center text-lg gap-x-3 mb-1`}
                    >
                        {displayCalendar().map((date, index) => (
                            <div
                                key={index}
                                className={`aspect-square content-center text-center rounded-full transition-colors duration-200 ${
                                    date.toDateString() ==
                                    selectedDate.toDateString()
                                        ? "bg-accent"
                                        : date.getMonth() != currDate.getMonth()
                                        ? "text-white/20"
                                        : "text-white font-semibold"
                                }`}
                                onClick={() => setSelectedDate(date)}
                            >
                                {date.getDate()}
                            </div>
                        ))}
                    </div>
                    <div
                        className={`flex border-b w-full justify-center border-white/10 p-3`}
                    >
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                id="datetime"
                                presentation="month-year"
                                ref={datetime}
                                value={currDate.toISOString()}
                                onIonChange={({ detail }) =>
                                    setDate((c) =>
                                        typeof detail.value == "string"
                                            ? new Date(detail.value)
                                            : c
                                    )
                                }
                            >
                                {/* <IonButtons slot="buttons">
                <IonButton onClick={() => datetime.current?.cancel(true)}>
                  Cancel
                </IonButton>
                <IonButton onClick={() => datetime.current?.confirm(true)}>
                  Confirm
                </IonButton>
              </IonButtons> */}
                            </IonDatetime>
                        </IonModal>
                    </div>
                </div>
                <div className="flex flex-col gap-3 px-4">
                    {selectedEntries.length == 0 ? (
                        <div className="text-center text-white/20 font-bold uppercase py-2">
                            no entries
                        </div>
                    ) : (
                        <>
                            {selectedEntries.map((entry, index) => (
                                <JournalItem
                                    key={entry.date}
                                    entry={entry}
                                    index={entry.index}
                                />
                            ))}
                        </>
                    )}
                    {/* <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full bg-black/30 p-3 rounded-xl items-center justify-between gap-3">
                            <div className="text-5xl text-green-400">
                                <FaSmile />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="text-xl font-bold">Title</div>
                                <div className="text-lg opacity-45 leading-5">
                                    date
                                </div>
                            </div>
                            <div className="self-stretch w-11 aspect-square flex justify-center items-center text-2xl opacity-45">
                                <FaRegStar />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full bg-black/30 p-2 rounded-xl items-center justify-between gap-4">
                            <div className="text-[50px] text-blue-400">
                                <FaBed />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="text-xl font-bold">Sleep</div>
                                <div className="text-lg opacity-45">
                                    8h 35min
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Calendar;
