import { Camera, CameraResultType } from "@capacitor/camera";
import { Keyboard } from "@capacitor/keyboard";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
    FaArrowLeft,
    FaImage,
    FaMicrophone,
    FaRegStar,
    FaStar,
} from "react-icons/fa";
import {
    FaFaceFrown,
    FaFaceFrownOpen,
    FaFaceLaugh,
    FaFaceMeh,
    FaFaceSmile,
} from "react-icons/fa6";
import { Moods } from "../../types/journal";
import { useDispatch, useSelector } from "react-redux";
import {
    addJournalEntry,
    selectJournalEntires,
    updateJournalEntry,
} from "../../store/journal";
import { RouteComponentProps, useHistory } from "react-router";
import { Capacitor } from "@capacitor/core";

interface JournalEntryPageProps
    extends RouteComponentProps<{
        id?: string;
    }> {}

const JournalEntry: React.FC<JournalEntryPageProps> = ({ match }) => {
    const entries = useSelector(selectJournalEntires);
    const id =
        match.params.id !== undefined ? parseInt(match.params.id) : undefined;
    const entry = id !== undefined ? entries[id] : null;
    const dispatch = useDispatch();
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [content, setContent] = useState("");
    const [mood, setMood] = useState<Moods>(Moods.OKAY);
    const [title, setTitle] = useState("New Entry");
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (entry) {
            setTitle(entry.title);
            setContent(entry.content);
            setMood(entry.mood);
            setFavorite(entry.favorite);
        }

        if (Capacitor.getPlatform() != "web") {
            Keyboard.addListener("keyboardWillShow", () => {
                setKeyboardVisible(true);
            });

            Keyboard.addListener("keyboardDidHide", () => {
                setKeyboardVisible(false);
            });

            return () => {
                Keyboard.removeAllListeners();
            };
        }
    }, []);

    const selectPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 50,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
        });

        setContent(
            content +
                `<img src="${image.dataUrl}" alt="photo" class="w-full rounded-lg my-1" />`
        );
    };

    const Mood: React.FC<{
        label: string;
        icon: IconType;
        className: string;
        name: Moods;
    }> = ({ label, icon, className, name }) => {
        const Icon = icon;

        return (
            <div
                className="flex flex-col gap-1 items-center"
                onClick={() => setMood(name)}
            >
                <Icon
                    className={"text-5xl " + className}
                    style={{
                        opacity: mood === name ? 1 : 0.4,
                    }}
                />
                <div>{label}</div>
            </div>
        );
    };

    const saveEntry = () => {
        if (entry && id !== undefined) {
            dispatch(
                updateJournalEntry({
                    index: id,
                    title,
                    content,
                    mood,
                    favorite,
                })
            );
        } else {
            dispatch(
                addJournalEntry({
                    title,
                    content,
                    mood,
                    date: new Date().getTime(),
                    favorite,
                })
            );
        }
        router.goBack();
    };

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1 h-10">
                        <div
                            className="flex justify-center items-center h-10 w-10"
                            onClick={() => router.goBack()}
                        >
                            <FaArrowLeft />
                        </div>
                        <input
                            className="py-2 flex-1 outline-none overflow-x-auto whitespace-nowrap bg-transparent"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div
                            className="flex justify-center items-center h-10 w-10"
                            onClick={() => setFavorite((c) => !c)}
                        >
                            {favorite ? (
                                <FaStar className="text-accent" />
                            ) : (
                                <FaRegStar className="text-white/20" />
                            )}
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="p-3 flex flex-col gap-3 w-full h-full">
                    <div className="flex flex-col gap-3">
                        <div className="text-xl font-bold px-2">
                            How are you feeling today?
                        </div>
                        <div className="flex justify-evenly font-bold text-xs text-white/40">
                            <Mood
                                label="Terrible"
                                icon={FaFaceFrown}
                                className="text-red-500"
                                name={Moods.TERRIBLE}
                            />
                            <Mood
                                label="Bad"
                                icon={FaFaceFrownOpen}
                                className="text-orange-500"
                                name={Moods.BAD}
                            />
                            <Mood
                                label="Okay"
                                icon={FaFaceMeh}
                                className="text-yellow-500"
                                name={Moods.OKAY}
                            />
                            <Mood
                                label="Good"
                                icon={FaFaceSmile}
                                className="text-green-500"
                                name={Moods.GOOD}
                            />
                            <Mood
                                label="Great"
                                icon={FaFaceLaugh}
                                className="text-green-700"
                                name={Moods.GREAT}
                            />
                        </div>
                    </div>
                    <div
                        className="flex-1 shrink-0 h-0 overflow-auto bg-primary/40 rounded-2xl p-3 outline-none relative pb-32"
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: content }}
                        onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                    >
                        {/* <textarea
                            className="w-full h-full bg-transparent outline-none placeholder:text-white/40 placeholder:font-bold resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write something you would like to share..."
                        /> */}
                        {/* {photo && (
                            <img
                                src={`data:image/jpeg;base64,${photo}`}
                                alt="photo"
                                className="w-full aspect-w-16 aspect-h-9 rounded-lg mt-3"
                            />
                        )} */}
                    </div>
                    {!keyboardVisible && (
                        <div className="flex gap-2 h-12">
                            <div
                                className="bg-primary/30 rounded-full flex-[1] flex justify-center items-center text-xl"
                                onClick={selectPhoto}
                            >
                                <FaImage />
                            </div>
                            <div className="bg-primary/30 rounded-full flex-[1] flex justify-center items-center text-xl">
                                <FaMicrophone />
                            </div>
                            <div
                                className="bg-accent rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase"
                                onClick={saveEntry}
                            >
                                save
                            </div>
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default JournalEntry;
