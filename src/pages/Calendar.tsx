import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { FaFaceSmile } from "react-icons/fa6";

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [1, 2, 3, 4, 5, 6, 7];

const Calendar: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                        <div className="py-2">Calendar</div>
                        <div className="flex flex-row gap-2">
                            <div className="flex gap-2 px-2 p-1 items-center bg-white/10 w-fit rounded-xl text-sm h-fit">
                                <div>Week</div>                            
                            </div>
                            <div className="flex gap-1 px-2 p-1 items-center w-fit rounded-xl text-sm h-fit bg-accent">
                                <div>Month</div>                            
                            </div>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <div className="p-4">
                <div className="grid grid-cols-7 text-center text-xs mb-2">
                    {weekDays.map((day, index) => (
                    <div key={index} className={`${index === 0 ? 'text-accent' : 'text-white'} font-bold`}>
                        {day}
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 text-center text-lg border-b border-gray-700">
                    {dates.map((date, index) => (
                    <div key={index} className={`${index === 0 ? 'text-accent' : 'text-white'} p-1 font-bold`}>
                        {date}
                    </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full p-4">
                <div className="flex flex-row w-full bg-black/30 p-2">
                    <div className="w-[40px]"><FaFaceSmile /></div>
                </div>
            </div>
        </div>
        
    );
};

export default Calendar;
