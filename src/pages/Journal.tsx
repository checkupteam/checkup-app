import { Camera, CameraResultType } from "@capacitor/camera";
import { Keyboard } from "@capacitor/keyboard";
import {
    IonHeader,
    IonRouterOutlet,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaImage,
    FaMicrophone,
    FaPlus,
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
import { Route } from "react-router";

const Journal: React.FC = () => {
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("okay");
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

    return (
        <div>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/journal">
                    <IonHeader className="shadow-none">
                        <IonToolbar>
                            <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold">
                                <div className="py-2">Journal</div>
                                <div className="flex gap-1 px-2 p-1 items-center bg-white/10 w-fit rounded-lg text-sm h-fit">
                                    <FaStar />
                                    <div>favorites</div>
                                </div>
                            </div>
                        </IonToolbar>
                    </IonHeader>
                    <div className="p-3 overflow-auto">
                        <div className="text-center w-full text-neutral-600 font-bold uppercase py-4">
                            no entires
                        </div>
                        <div
                            className="fixed bottom-24 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl"
                            onClick={() => router.push("/journal/add")}
                        >
                            <FaPlus />
                        </div>
                    </div>
                </Route>
                <Route exact path="/journal/add">
                    <IonHeader className="shadow-none bg-primary/20">
                        <IonToolbar>
                            <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold gap-1">
                                <div
                                    className="flex justify-center items-center h-10 w-10"
                                    onClick={() => router.goBack()}
                                >
                                    <FaArrowLeft />
                                </div>
                                <div
                                    className="py-2 flex-1 outline-none overflow-x-auto whitespace-nowrap"
                                    contentEditable
                                >
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
                        <div className="flex flex-col gap-2">
                            <div className="text-xl font-bold px-2">
                                How are you feeling today?
                            </div>
                            <div className="flex justify-evenly font-bold text-xs text-white/40">
                                <div className="flex flex-col gap-1 items-center">
                                    <FaFaceFrown className="text-5xl text-red-500/50" />
                                    <div>Terrible</div>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <FaFaceFrownOpen className="text-5xl text-orange-500/50" />
                                    <div>Bad</div>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <FaFaceMeh className="text-5xl text-yellow-500/50" />
                                    <div>Okay</div>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <FaFaceSmile className="text-5xl text-green-600/50" />
                                    <div>Good</div>
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <FaFaceLaugh className="text-5xl text-green-400/50" />
                                    <div>Great</div>
                                </div>
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
                </Route>
            </IonRouterOutlet>
        </div>
        // <IonPage>
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonTitle>Journal</IonTitle>
        //         </IonToolbar>
        //     </IonHeader>
        //     <IonContent fullscreen>
        //         <IonHeader collapse="condense">
        //             <IonToolbar>
        //                 <IonTitle size="large">Journal</IonTitle>
        //             </IonToolbar>
        //         </IonHeader>
        //         <ExploreContainer />
        //     </IonContent>
        // </IonPage>
    );
};

export default Journal;
