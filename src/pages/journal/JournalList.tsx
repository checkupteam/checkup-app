import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { FaPlus, FaRegStar, FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Mood from "../../components/Mood";
import { JournalEntry } from "../../types/journal";
import { useHistory } from "react-router";
import {
    useGetJournalEntriesQuery,
    useUpdateJournalEntryMutation,
} from "../../api/journal";
import Loading from "../../components/Loading";

const ListItem: React.FC<{ entry: JournalEntry }> = ({ entry }) => {
    const router = useIonRouter();
    const [updateJournalEntry] = useUpdateJournalEntryMutation();

    const switchFavoriteStatus = () => {
        updateJournalEntry({
            id: entry.id,
            changes: {
                isFavorite: !entry.isFavorite,
            },
        });
    };

    return (
        <div className="bg-white/5 p-3 px-4 rounded-lg flex gap-3 items-center">
            <div
                className="flex gap-3 flex-1 shrink-0 w-0 items-center"
                onClick={() => router.push(`/app/journal/edit/${entry.id}`)}
            >
                <Mood mood={entry.mood} className="text-4xl" />
                <div className="flex flex-col justify-center flex-1">
                    <div className="text-xl font-bold leading-6">
                        {entry.title}
                    </div>
                    <div className="text-neutral-500 leading-5 font-semibold">
                        {new Date(entry.createdAt)
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
                {entry.isFavorite ? (
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
    const history = useHistory();
    const { data: entries, isLoading } = useGetJournalEntriesQuery({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    });
    const [favorites, setFavorites] = useState(false);
    const [popup, setPopUp] = useState(true);

    const filtredEntries = entries?.filter(
        (entry) => !favorites || entry.isFavorite
    );

    const getEntiresByRange = (type: "day" | "week" | "month") => {
        const today = new Date().setHours(0, 0, 0, 0);
        const weekStart = new Date(today - (today % 86400000) - 86400000 * 6);
        switch (type) {
            case "day":
                return filtredEntries?.filter((entry) => {
                    const date = new Date(entry.createdAt).setHours(0, 0, 0, 0);
                    return today === date;
                });
            case "week":
                return filtredEntries?.filter((entry) => {
                    const date = new Date(entry.createdAt);
                    return (
                        date >= weekStart &&
                        date < new Date(today) &&
                        date <= new Date()
                    );
                });
            case "month":
                const monthStart = new Date(
                    today - (today % 86400000) - 86400000 * 30
                );
                return filtredEntries?.filter((entry) => {
                    const date = new Date(entry.createdAt);
                    return (
                        date >= monthStart &&
                        date < weekStart &&
                        date <= new Date()
                    );
                });
        }
    };

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-2xl font-bold h-10 text-white">
                        <div>Journal</div>
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
            <IonContent>
            <div className={`m-4 rounded-2xl bg-accent p-3 justify-between items-center ${popup ? 'flex' : 'hidden'}`}>
                <div>
                    <a href="https://www.innerdrive.co.uk/blog/benefits-of-keeping-a-diary/" className="text-white font-medium">
                        Why is wrritting journal beneficial?
                    </a>
                    <div className="opacity-40">(click to find out)</div>
                </div>
                <div onClick={() => setPopUp((c) => !c)}><IoMdCloseCircle />
                </div>
            </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="p-3 pb-0 overflow-auto flex flex-col gap-2 h-full">
                        {!filtredEntries || filtredEntries.length == 0 ? (
                            <div className="text-center w-full text-neutral-600 font-bold uppercase py-4">
                                no entires
                            </div>
                        ) : (
                            <>
                                <div className="text-center uppercase font-semibold text-sm text-white/20">
                                    today
                                </div>
                                {getEntiresByRange("day")?.map((entry) => (
                                    <ListItem key={entry.id} entry={entry} />
                                ))}
                                <div className="bg-primary/20 h-[1px]"></div>
                                <div className="text-center uppercase font-semibold text-sm text-white/20">
                                    this week
                                </div>
                                {getEntiresByRange("week")?.map((entry) => (
                                    <ListItem key={entry.id} entry={entry} />
                                ))}
                                <div className="bg-primary/20 h-[1px]"></div>
                                <div className="text-center uppercase font-semibold text-sm text-white/20">
                                    this month
                                </div>
                                {getEntiresByRange("month")?.map((entry) => (
                                    <ListItem key={entry.id} entry={entry} />
                                ))}
                                <div className="bg-primary/20 h-[1px]"></div>
                            </>
                        )}
                        <div
                            className="fixed bottom-3 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl text-white"
                            onClick={() => history.push("/app/journal/create")}
                        >
                            <FaPlus />
                        </div>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default JournalList;
