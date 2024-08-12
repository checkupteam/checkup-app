import * as React from "react";
import { FaSmile, FaRegStar, FaStar, FaBed } from "react-icons/fa";
import { IonHeader, IonToolbar } from "@ionic/react";
import { IonDatetime, IonDatetimeButton, IonButton, IonButtons, IonModal } from "@ionic/react";

const Calendar: React.FC = () => {
    function getDay() {
        let day = now.getDay();
        return weekDays[day - 1];
    }

    function displayCalendar(month: number = now.getMonth()+1, year: number = now.getFullYear()) {
        const firstDay = new Date(year, month - 1, 0);
        const lastDay = new Date(year, month, 0);
        const firstDayWeek = firstDay.getDay();
        const days = lastDay.getDate();
        const calendar = [];
        let day_now = 1;
        let day_prev = new Date(year, month, 0).getDate() - firstDayWeek + 1;
        let day_next = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayWeek) {
                    calendar.push("a" + day_prev);
                    day_prev++;
                } else if (day_now > days) {
                    calendar.push("a" + day_next);
                    day_next++;
                } else {
                    calendar.push(String(day_now));
                    day_now++;
                }
            }
        }
        return calendar;
    }

    const confirm = () => {
        console.log("confirm");
    };
    const cancel = () => {
        console.log("cancel");
    };

    let now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const month_now = months[new Date().getMonth()];
    let displayedMonth = displayCalendar();

    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                        <div className="py-2">Calendar</div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <div className="p-4">
                <div className="grid grid-cols-7 text-center text-xs mb-2">
                    {weekDays.map((day, index) => (
                        <div key={index} className={`${getDay() === day ? "text-accent" : "text-white"} font-bold`}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className={`grid grid-cols-7 text-center text-lg`}>
                    {displayedMonth.map((date, index) => (
                        <div key={index} className={`${date.includes("a") ? "text-white/20" : "text-white"}`}>
                            {date.includes("a") ? date.replace("a", "") : date}
                        </div>
                    ))}
                </div>
                <div className={`flex border-b w-full justify-center border-gray-700 p-2`}>
                    <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime" presentation="month-year" >
                            <IonButtons slot="buttons">
                                <IonButton onClick={cancel}>Cancel</IonButton>
                                <IonButton onClick={confirm}>Confirm</IonButton>
                            </IonButtons>
                        </IonDatetime>
                    </IonModal>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full bg-black/30 p-3 rounded-xl items-center justify-between gap-3">
                        <div className="text-5xl text-green-400">
                            <FaSmile />
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="text-xl font-bold">Title</div>
                            <div className="text-lg opacity-45 leading-5">date</div>
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
                            <div className="text-lg opacity-45">8h 35min</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
