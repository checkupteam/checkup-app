import { Camera, CameraResultType } from '@capacitor/camera';
import { Keyboard } from '@capacitor/keyboard';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
    useIonViewWillEnter,
} from '@ionic/react';
import { startTransition, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import {
    FaArrowLeft,
    FaImage,
    FaMicrophone,
    FaRegStar,
    FaStar,
} from 'react-icons/fa';
import {
    FaFaceFrown,
    FaFaceFrownOpen,
    FaFaceLaugh,
    FaFaceMeh,
    FaFaceSmile,
} from 'react-icons/fa6';
import { Moods } from '../../types/journal';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Capacitor } from '@capacitor/core';
import {
    useGetJournalEntryQuery,
    useUpdateJournalAnswerMutation,
    useUpdateJournalEntryMutation,
} from '../../api/journal';
import Loading from '../../components/Loading';
import { hideTabBar } from '../../utils/tabBar';
import Mood from '../../components/Mood';
import { motion } from 'framer-motion';
import LongSeal from '../../assets/long_seal.svg';
import { useTranslation } from 'react-i18next';
import { useDebounce, useDebounceFn } from '@reactuses/core';

interface JournalEntryPageProps
    extends RouteComponentProps<{
        id?: string;
    }> {}

const JournalEntry: React.FC<JournalEntryPageProps> = ({ match }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [content, setContent] = useState('');
    const [mood, setMood] = useState<Moods>(Moods.OKAY);
    const [title, setTitle] = useState('New Entry');
    const [favorite, setFavorite] = useState(false);
    const [haveDreams, setHaveDreams] = useState(false);
    const [dreamText, setDreamText] = useState('');
    const [sleepRating, setSleepRating] = useState<String>(
        Moods.OKAY.toString(),
    );
    const [feelHappy, setFeelHappy] = useState('');
    const [changeMood, setChangeMood] = useState(false);
    const debouncedContent = useDebounce(content, 1000);
    const debouncedFeelHappy = useDebounce(feelHappy, 1000);
    const debouncedDreamText = useDebounce(dreamText, 1000);

    const [updateJournalEntry] = useUpdateJournalEntryMutation();
    const [updateJournalAnswer] = useUpdateJournalAnswerMutation();

    const id = match.params.id ? parseInt(match.params.id) : undefined;
    if (!id) return null;
    const { data: entry, isLoading } = useGetJournalEntryQuery(id);

    useIonViewWillEnter(() => {
        hideTabBar();
    });

    const { run: saveEntry } = useDebounceFn(() => {
        if (entry) {
            updateJournalEntry({
                id,
                changes: {
                    text: content,
                    title: title,
                },
            });
        }
    }, 1000);

    useEffect(() => {
        if (debouncedFeelHappy && id) {
            updateJournalAnswer({
                id: entry!.Answer[0].id,
                answer: debouncedFeelHappy,
            });
        }
    }, [debouncedFeelHappy]);

    useEffect(() => {
        if (debouncedDreamText && id) {
            updateJournalAnswer({
                id: entry!.Answer[3].id,
                answer: debouncedDreamText,
            });
        }
    }, [debouncedDreamText]);

    useEffect(() => {
        if (Capacitor.getPlatform() != 'web') {
            Keyboard.addListener('keyboardWillShow', () => {
                setKeyboardVisible(true);
            });

            Keyboard.addListener('keyboardDidHide', () => {
                setKeyboardVisible(false);
            });

            return () => {
                Keyboard.removeAllListeners();
            };
        }
    }, []);

    useEffect(() => {
        if (entry) {
            setContent(entry.text);
            setMood(entry.mood);
            setTitle(entry.title);
            setFavorite(entry.isFavorite);
            if (entry.Answer?.length == 4) {
                setFeelHappy(entry.Answer[0].answer);
                setSleepRating(entry.Answer[1].answer);
                setHaveDreams(entry.Answer[2].answer == 'true');
                setDreamText(entry.Answer[3].answer);
            }
        }
    }, [entry]);

    const selectPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 50,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
        });

        setContent(
            content +
                `<img src="${image.dataUrl}" alt="photo" class="w-full rounded-lg my-1" />`,
        );
    };

    useEffect(() => {
        return () => saveEntry();
    }, []);

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
                            onChange={(e) => {
                                setTitle(e.target.value);
                                saveEntry();
                            }}
                        />
                        <div
                            className="flex justify-center items-center h-10 w-10"
                            onClick={() =>
                                id &&
                                updateJournalEntry({
                                    id,
                                    changes: { isFavorite: !favorite },
                                })
                            }
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
                {id && isLoading ? (
                    <Loading />
                ) : (
                    <div className="p-3 flex flex-col gap-3 w-full h-full overflow-auto">
                        <div className="px-3 mt-1 flex gap-6 gap-y-4 items-center pl-3 min-h-36 flex-wrap relative">
                            {!changeMood &&
                                Object.entries(Moods).map(
                                    ([_, mood]) =>
                                        mood == entry?.mood && (
                                            <div
                                                key={mood}
                                                className="flex flex-col gap-1 items-center w-fit text-2xl font-semibold text-white/40 z-10"
                                                onClick={() =>
                                                    startTransition(() => {
                                                        setChangeMood(
                                                            (c) => !c,
                                                        );
                                                    })
                                                }
                                            >
                                                <Mood
                                                    mood={mood}
                                                    className={'text-6xl'}
                                                />
                                            </div>
                                        ),
                                )}
                            {changeMood && id && (
                                <div className="absolute w-full top-0 h-full items-center justify-evenly left-0 z-10 flex gap-2">
                                    {Object.values(Moods)
                                        .filter(
                                            (mood) => typeof mood === 'number',
                                        )
                                        .map((mood, index) => (
                                            <div
                                                key={mood}
                                                className="flex flex-col gap-1 items-center w-fit text-base font-semibold text-white/40"
                                                onClick={() => {
                                                    updateJournalEntry({
                                                        id,
                                                        changes: {
                                                            mood: mood as Moods,
                                                        },
                                                    });
                                                    setChangeMood(false);
                                                }}
                                            >
                                                <Mood
                                                    mood={mood}
                                                    className={'text-5xl'}
                                                />
                                                <div>
                                                    {t(
                                                        'journal.mood.' +
                                                            (index + 1),
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                            {!changeMood && (
                                <div className="rounded-xl bg-darker-violet-850 min-h-28 flex-1 p-2 px-3 pr-14 relative font-semibold overflow-hidden animate-fadeIn">
                                    <div>
                                        {t('journal.motivation.' + entry?.mood)}
                                    </div>
                                    <img
                                        src={LongSeal}
                                        alt=""
                                        className="absolute h-18 -rotate-45 -right-1 -bottom-2"
                                    />
                                </div>
                            )}
                            <div className="w-full h-0.5 bg-darker-violet-850"></div>
                        </div>
                        <div className="flex-1 h-0 flex flex-col gap-3">
                            <div className="text-2xl font-bold px-2">
                                {t('journal.question.2')}
                            </div>
                            <textarea
                                className="rounded-xl bg-darker-violet-950 w-full min-h-36 p-2 px-3 font-semibold resize-none outline-none scroll-mt-12"
                                value={feelHappy}
                                onChange={(event) =>
                                    setFeelHappy(event.target.value)
                                }
                            />
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.3')}
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-center w-fulls">
                                {Object.values(Moods)
                                    .filter((mood) => typeof mood === 'number')
                                    .map((mood) => (
                                        <div
                                            key={mood}
                                            className={`flex flex-col items-center justify-center gap-1 font-semibold ${sleepRating == mood.toString() ? 'opacity-100' : 'opacity-40'} `}
                                            onClick={() =>
                                                updateJournalAnswer({
                                                    id: entry!.Answer[1].id,
                                                    answer: mood.toString(),
                                                })
                                            }
                                        >
                                            <Mood
                                                mood={mood}
                                                className="text-5xl"
                                            />
                                            <div>
                                                {t('journal.mood.' + mood)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {/* <textarea className="rounded-xl bg-darker-violet-950 w-full min-h-36 p-2 px-3 font-semibold resize-none outline-none scroll-mt-12" /> */}
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.4')}
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2 h-10">
                                <div
                                    className={`rounded-full flex-1 h-full flex justify-center items-center transition-colors text-lg font-bold uppercase ${haveDreams == true ? 'bg-accent' : 'bg-darker-violet-800'}`}
                                    onClick={() =>
                                        updateJournalAnswer({
                                            id: entry!.Answer[2].id,
                                            answer: 'true',
                                        })
                                    }
                                >
                                    YES
                                </div>
                                <div
                                    className={`rounded-full flex-1 h-full flex justify-center items-center transition-colors text-lg font-bold uppercase ${haveDreams == false ? 'bg-accent' : 'bg-darker-violet-800'}`}
                                    onClick={() =>
                                        updateJournalAnswer({
                                            id: entry!.Answer[2].id,
                                            answer: 'false',
                                        })
                                    }
                                >
                                    NO
                                </div>
                            </div>
                            {haveDreams == true && (
                                <textarea
                                    className={`rounded-xl bg-darker-violet-950 w-full min-h-36 p-2 px-3 font-semibold resize-none outline-none scroll-mt-12`}
                                    value={dreamText}
                                    onChange={(event) =>
                                        setDreamText(event.target.value)
                                    }
                                />
                            )}
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.5')}
                            </div>
                            <div
                                className="shrink-0 min-h-64 overflow-auto bg-primary/40 rounded-2xl p-3 outline-none relative pb-32"
                                contentEditable
                                dangerouslySetInnerHTML={{ __html: content }}
                                onBlur={(e) => {
                                    setContent(e.currentTarget.innerHTML);
                                    saveEntry();
                                }}
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
                        </div>
                        {/* {!keyboardVisible && (
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
                        )} */}
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default JournalEntry;
