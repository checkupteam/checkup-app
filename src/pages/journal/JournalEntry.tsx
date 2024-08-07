import { Camera, CameraResultType } from "@capacitor/camera";
import { Keyboard } from "@capacitor/keyboard";
import { IonHeader, IonToolbar, useIonRouter } from "@ionic/react";
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

const JournalEntry: React.FC = () => {
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [content, setContent] = useState("");
    const [mood, setMood] = useState<Moods>(Moods.OKAY);
    const [photo, setPhoto] = useState<string | null>(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", () => {
            setKeyboardVisible(true);
        });

        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            Keyboard.removeAllListeners();
        };
    }, []);

    const selectPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
        });

        setPhoto(image.base64String ?? null);
        console.log(image);
    };

    const Mood: React.FC<{
        label: string;
        icon: IconType;
        color: string;
        name: Moods;
    }> = ({ label, icon, color, name }) => {
        const Icon = icon;

        return (
            <div
                className="flex flex-col gap-1 items-center"
                onClick={() => setMood(name)}
            >
                <Icon
                    className={"text-5xl text-" + color}
                    style={{
                        opacity: mood === name ? 1 : 0.4,
                    }}
                />
                <div>{label}</div>
            </div>
        );
    };

    return (
        <>
            <IonHeader className="shadow-none bg-primary/20">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1">
                        <div
                            className="flex justify-center items-center h-10 w-10"
                            onClick={() => router.goBack()}
                        >
                            <FaArrowLeft />
                        </div>
                        <div className="py-2 flex-1 outline-none overflow-x-auto whitespace-nowrap">
                            New Entry
                        </div>
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
            <div className="p-3 flex flex-col gap-3 w-full flex-1 shrink-0 h-0">
                <div className="flex flex-col gap-3">
                    <div className="text-xl font-bold px-2">
                        How are you feeling today?
                    </div>
                    <div className="flex justify-evenly font-bold text-xs text-white/40">
                        <Mood
                            label="Terrible"
                            icon={FaFaceFrown}
                            color="red-500"
                            name={Moods.TERRIBLE}
                        />
                        <Mood
                            label="Bad"
                            icon={FaFaceFrownOpen}
                            color="orange-500"
                            name={Moods.BAD}
                        />
                        <Mood
                            label="Okay"
                            icon={FaFaceMeh}
                            color="yellow-500"
                            name={Moods.OKAY}
                        />
                        <Mood
                            label="Good"
                            icon={FaFaceSmile}
                            color="green-500"
                            name={Moods.GOOD}
                        />
                        <Mood
                            label="Great"
                            icon={FaFaceLaugh}
                            color="green-700"
                            name={Moods.GREAT}
                        />
                    </div>
                </div>
                <div className="flex-1 shrink-0 h-0 overflow-auto bg-primary/40 rounded-2xl p-3 outline-none relative">
                    <textarea
                        className="w-full h-full bg-transparent outline-none placeholder:text-white/40 placeholder:font-bold"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something you would like to share..."
                    />
                    {photo && (
                        <img
                            src={`data:image/jpeg;base64,${photo}`}
                            alt="photo"
                            className="w-full aspect-w-16 aspect-h-9 rounded-lg mt-3"
                        />
                    )}
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
                        <div className="bg-accent rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase">
                            save
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default JournalEntry;
