import React, { useState } from 'react';
import { FaSmile, FaRegStar, FaStar, FaBed } from 'react-icons/fa';
import { IonHeader, IonToolbar } from '@ionic/react';

let now = new Date();
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const [view, setView] = useState('month');    
const day_month = Array.from({ length: daysInThisMonth() }, (_, i) => i + 1);
const dates_month = [...addPrevDays(), ...day_month];
const dates_week = dates_month.slice(nearestMonday(), nearestMonday() + 7);

function nearestMonday() {
    let day = now.getDay();
    let diff = now.getDate() - day + (day == 0 ? -6 : 1);
    return diff
    }

function daysInThisMonth() {
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }

function daysInPrevMonth() {
    return new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

function getDay() {
    let day = now.getDay();
    
    return weekDays[day-1];
    }

function addPrevDays() {
    const x = getFirstDayName();
    let arr = [];
    let j = (daysInPrevMonth() - 7) + x;

    for (let i = j; i <= 31; i++) {
        arr.push(i);
    }
    return arr; 
    }

function getFirstDayName() {
    let firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    return firstDay;
}

const Calendar: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                        <div className="py-2">Calendar</div>
                        <div className="flex gap-1">
                            <button className={`flex gap-2 px-2 p-1 items-center w-fit rounded-xl text-sm h-fit ${view === 'month' ? 'bg-accent' : 'bg-white/10'}`} onClick={() => setView('month')}>Month</button>
                            <button className={`flex gap-1 px-2 p-1 items-center w-fit rounded-xl text-sm h-fit ${view === 'week' ? 'bg-accent' : 'bg-white/10'}`} onClick={() => setView('week')}>Week</button>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <div className="p-4">
                <div className="grid grid-cols-7 text-center text-xs mb-2">
                    {weekDays.map((day, index) => (
                        <div key={index} className={`${getDay() === day ? 'text-accent' : 'text-white'} font-bold`}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className={`grid grid-cols-7 text-center text-lg border-gray-700 ${view === 'month' ? 'border-0' : 'border-b'}`}>
                    {(view === 'month' ? dates_month : dates_week).map((date, index) => (
                        <div key={index} className={`${date === now.getDate()-1 ? 'text-accent' : 'text-white' && index < getFirstDayName() ? 'opacity-30' : 'opacity-100' } p-1 font-bold`}>
                            {date}
                        </div>
                    ))}
                </div>
                <div className={`w-full justify-center border-b border-gray-700 p-2 font-bold text-xl ${view === 'month' ? 'flex' : 'hidden'}`}>September 2024</div>
            </div>
            <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full bg-black/30 p-2 rounded-xl items-center justify-between gap-4">
                        <div className="text-[50px] text-green-400">
                            <FaSmile />
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="text-xl font-bold">Title</div>
                            <div className="text-lg opacity-45">date</div>
                        </div>
                        <div className="text-[26px] opacity-45">
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