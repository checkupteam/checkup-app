import { IonHeader, IonToolbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { FaPlus, FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectJournalEntires, updateJournalEntry } from "../../store/journal";
import Mood from "../../components/Mood";
import { JournalEntry } from "../../types/journal";

const ListItem: React.FC<{ entry: JournalEntry; index: number }> = ({
    entry,
    index,
}) => {
    const dispatch = useDispatch();

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
            <Mood mood={entry.mood} className="text-4xl" />
            <div className="flex flex-col justify-center flex-1">
                <div className="text-xl font-bold leading-6">{entry.title}</div>
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

const JournalList: React.FC = () => {
    const dispatch = useDispatch();
    const entries = useSelector(selectJournalEntires);
    const router = useIonRouter();
    const [favorites, setFavorites] = useState(false);

    const switchFavoriteStatus = (index: number) => {
        dispatch(
            updateJournalEntry({
                index,
                favorite: !entries[index].favorite,
            })
        );
    };

    const filtredEntries = entries
        .map((entry, index) => ({
            ...entry,
            index,
        }))
        .filter((entry) => (favorites ? entry.favorite : true));

    return (
        <>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-2xl font-bold">
                        <div className="py-2">Journal</div>
                        <div
                            className={`flex gap-1 px-2 p-1 items-center w-fit rounded-lg text-sm h-fit ${
                                favorites ? "bg-accent" : "bg-white/10"
                            }`}
                            onClick={() => setFavorites((c) => !c)}
                        >
                            <FaStar />
                            <div>favorites</div>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <div className="p-3 py-0 overflow-auto flex flex-col gap-2">
                {entries.length == 0 ? (
                    <div className="text-center w-full text-neutral-600 font-bold uppercase py-4 mt-3">
                        no entires
                    </div>
                ) : (
                    <>
                        <div className="text-center uppercase font-semibold text-sm text-white/20">
                            today
                        </div>
                        {filtredEntries
                            .filter((entry) => {
                                const today = new Date().setHours(0, 0, 0, 0);
                                return (
                                    today ===
                                    new Date(entry.date).setHours(0, 0, 0, 0)
                                );
                            })
                            .map((entry) => (
                                <ListItem
                                    key={entry.index}
                                    entry={entry}
                                    index={entry.index}
                                />
                            ))}
                        <div className="bg-primary/20 h-[1px]"></div>
                        <div className="text-center uppercase font-semibold text-sm text-white/20">
                            this week
                        </div>
                        {filtredEntries
                            .filter((entry) => {
                                const date = new Date(entry.date);
                                const today = new Date().setHours(0, 0, 0, 0);
                                const weekStart = new Date(
                                    today - (today % 86400000) - 86400000 * 6
                                );
                                return (
                                    date >= weekStart &&
                                    date < new Date(today) &&
                                    date <= new Date()
                                );
                            })
                            .map((entry) => (
                                <ListItem
                                    key={entry.index}
                                    entry={entry}
                                    index={entry.index}
                                />
                            ))}
                        <div className="bg-primary/20 h-[1px]"></div>
                        <div className="text-center uppercase font-semibold text-sm text-white/20">
                            this month
                        </div>
                        {filtredEntries
                            .filter((entry) => {
                                const date = new Date(entry.date);
                                const today = new Date().setHours(0, 0, 0, 0);
                                const monthStart = new Date(
                                    today - (today % 86400000) - 86400000 * 30
                                );
                                const weekStart = new Date(
                                    today - (today % 86400000) - 86400000 * 6
                                );
                                return (
                                    date >= monthStart &&
                                    date < weekStart &&
                                    date <= new Date()
                                );
                            })
                            .map((entry) => (
                                <ListItem
                                    key={entry.index}
                                    entry={entry}
                                    index={entry.index}
                                />
                            ))}
                        <div className="bg-primary/20 h-[1px]"></div>
                    </>
                )}
                <div
                    className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl"
                    onClick={() => router.push("/journal/add")}
                >
                    <FaPlus />
                </div>
            </div>
        </>
    );
};

export default JournalList;
