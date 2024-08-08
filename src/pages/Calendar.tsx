import * as React from "react";
import { FaSmile, FaRegStar, FaStar, FaBed } from "react-icons/fa";
import { IonHeader, IonToolbar } from "@ionic/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";

function nearestMonday() {
    let day = now.getDay();
    let diff = now.getDate() - day + (day == 0 ? -6 : 1) + addPrevDays().length;
    return diff;
}

function daysInDisplayedMonth(month = month_now_number, year = year_now) {
    return new Date(year, month + 1, 0).getDate();
}

function daysInPrevMonth() {
    return new Date(now.getFullYear(), now.getMonth(), 0).getDate();
}

function getDay() {
    let day = now.getDay();
    return weekDays[day - 1];
}

function addPrevDays() {
    const x = getFirstDayName();
    let arr_front = [];
    let j = daysInPrevMonth() - 6 + x;

    for (let i = j; i <= 31; i++) {
        arr_front.push(i);
    }
    return arr_front;
}

function lackingDays(displayedMonth: number) {
    let jestPierwszaWNocyMamDość = addPrevDays().length + displayedMonth;
    return jestPierwszaWNocyMamDość;
}

function addLastDays() {
    let arr_back = [];
    const j = lackingDays(displayedMonth);
    let lastDays = 1;
    for (let i = j; i < 35; i++) {
        arr_back.push(lastDays);
        lastDays++;
    }
    return arr_back;
}

function getFirstDayName(month = now.getMonth(), year = now.getFullYear()) {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay;
}

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    input: {
        color: "white",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        width: "auto",
    },
    ".MuiInputBase-root": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
    },
}));

let now = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const month_now = months[new Date().getMonth()];
let month_now_number = new Date().getMonth();
let year_now = new Date().getFullYear();
let displayedMonth = daysInDisplayedMonth();
const day_month = Array.from({ length: displayedMonth}, (_, i) => i + 1);
const dates_month = [...addPrevDays(), ...day_month, ...addLastDays()];
const dates_week = dates_month.slice(nearestMonday() - 1, nearestMonday() + 6);

const Calendar: React.FC = () => {
    const [view, setView] = React.useState("month");
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                        <div className="py-2">Calendar</div>
                        <div className="flex gap-1">
                            <button className={`flex gap-2 px-2 p-1 items-center w-fit rounded-xl text-sm h-fit ${view === "month" ? "bg-accent" : "bg-white/10"}`} onClick={() => setView("month")}>
                                Month
                            </button>
                            <button className={`flex gap-1 px-2 p-1 items-center w-fit rounded-xl text-sm h-fit ${view === "week" ? "bg-accent" : "bg-white/10"}`} onClick={() => setView("week")}>
                                Week
                            </button>
                        </div>
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
                <div className={`grid grid-cols-7 text-center text-lg border-gray-700 ${view === "month" ? "border-0" : "border-b"}`}>
                    {(view === "month" ? dates_month : dates_week).map((date, index) => (
                        <div key={index} className={`${date === now.getDate() ? "text-accent" : "text-white" && (index < getFirstDayName(month_now_number, year_now) - 1 || index > lackingDays(displayedMonth) - 1) && view === "month" ? "opacity-30" : "opacity-100"} p-1 font-bold`}>
                            {date}
                        </div>
                    ))}
                </div>
                <div className={`w-full justify-center border-b border-gray-700 p-2 font-bold text-xl ${view === "month" ? "flex" : "hidden"}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatePicker defaultValue={dayjs(`${year_now}-${month_now}`)} views={["month", "year"]} onChange={(newValue) => {const { $y, $M } = Object(newValue); displayedMonth = daysInDisplayedMonth($M, $y); year_now = $y; month_now_number = $M; console.log(year_now, month_now_number, displayedMonth)}}/>
                    </LocalizationProvider>
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
                        <div className="text-[50px] text-green-400">
                            <FaSmile />
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="text-xl font-bold">Title</div>
                            <div className="text-lg opacity-45">date</div>
                        </div>
                        <div className="text-[26px] text-accent">
                            <FaStar />
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
