import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
    useIonViewDidEnter,
    useIonViewWillEnter,
    useIonViewWillLeave,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Moods } from '../../types/journal';
import Mood from '../../components/Mood';
import { AnimatePresence, motion } from 'framer-motion';
import LongSeal from '../../assets/long_seal.svg';
import { hideTabBar, showTabBar } from '../../utils/tabBar';
import { useTranslation } from 'react-i18next';
import { useActiveElement, useDebounce } from '@reactuses/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { useCreateJournalEntryMutation } from '../../api/journal';

const moods: Record<Moods, string> = {
    [Moods.TERRIBLE]: 'Terrible',
    [Moods.BAD]: 'Bad',
    [Moods.OKAY]: 'Okay',
    [Moods.GOOD]: 'Good',
    [Moods.GREAT]: 'Great',
};

const JournalCreate: React.FC = () => {
    const router = useIonRouter();
    const { t } = useTranslation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [currStep, setCurrStep] = useState(0);
    const [selectedMood, setSelectedMood] = useState<Moods | null>(null);
    const [sleepRating, setSleepRating] = useState<Moods | null>(null);
    const [showMotivation, setShowMotivation] = useState(false);
    const debouncedSelectedMood = useDebounce(selectedMood, 50);
    const activeElement = useActiveElement();
    const [title, setTitle] = useState<string>('New Entry');
    const [firstQuestion, setFirstQuestion] = useState<string>('');
    const [haveDreams, setHaveDreams] = useState<boolean | null>(null);
    const [dreamText, setDreamText] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [createJournalEntry] = useCreateJournalEntryMutation();

    useEffect(() => {
        if (Capacitor.getPlatform() != 'web') {
            Keyboard.addListener('keyboardWillShow', () => {
                setKeyboardVisible(true);
            });

            Keyboard.addListener('keyboardDidShow', () => {
                activeElement?.scrollIntoView();
            });

            Keyboard.addListener('keyboardDidHide', () => {
                setKeyboardVisible(false);
            });

            return () => {
                Keyboard.removeAllListeners();
            };
        }
    }, [activeElement]);

    useEffect(() => {
        keyboardVisible &&
            activeElement?.scrollIntoView({ behavior: 'smooth' });
    }, [activeElement]);

    const goBack = () => {
        if (currStep > 0) setCurrStep(currStep - 1);
        else router.goBack();
    };

    const goNext = () => {
        if (currStep < 2 && canGoNext()) setCurrStep(currStep + 1);
    };

    const canGoNext = () => {
        return (
            selectedMood !== null &&
            (currStep < 1 || (sleepRating !== null && haveDreams !== null)) &&
            (currStep < 2 || text.length > 0)
        );
    };

    useIonViewWillEnter(() => {
        hideTabBar();
    });

    useEffect(() => {
        setTimeout(() => {
            setShowMotivation(true);
        }, 400);

        return () => {
            setShowMotivation(false);
        };
    }, [selectedMood]);

    const createJournal = async () => {
        console.log(selectedMood);
        console.log(firstQuestion);
        console.log(sleepRating);
        console.log(dreamText);
        console.log(text);

        if (!canGoNext()) return;

        const result = await createJournalEntry({
            title,
            mood: selectedMood!,
            isFavorite: false,
            text,
            answers: [
                {
                    answer: firstQuestion,
                },
                {
                    answer: sleepRating!.toString(),
                },
                {
                    answer: haveDreams!.toString(),
                },
                {
                    answer: dreamText,
                },
            ],
        });

        result?.data && router.push('/app/journal/edit/' + result.data.id);
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
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="w-full h-full p-3 flex flex-col gap-3">
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full h-2 flex-1 bg-darker-violet-800 overflow-hidden"
                            >
                                {i <= currStep && (
                                    <div className="w-full animate-fill h-full bg-accent" />
                                )}
                            </div>
                        ))}
                    </div>
                    {currStep == 0 && (
                        <div className="flex flex-1 shrink-0 h-0 flex-col gap-3">
                            <div className="text-2xl font-bold px-2">
                                {t('journal.question.1')}
                            </div>
                            {selectedMood !== null && (
                                <div className="px-3 mt-1 flex gap-6 gap-y-4 items-center pl-3 min-h-36 flex-wrap">
                                    {Object.entries(moods).map(
                                        ([mood, label]: [any, string]) =>
                                            mood == selectedMood && (
                                                <motion.div
                                                    key={mood}
                                                    className="flex flex-col gap-1 items-center w-fit text-2xl font-semibold text-white/40 z-10"
                                                    layoutId={
                                                        mood + '-journal-create'
                                                    }
                                                >
                                                    <Mood
                                                        mood={mood}
                                                        className={'text-6xl'}
                                                    />
                                                    {/* <div>{moods[selectedMood]}</div> */}
                                                </motion.div>
                                            ),
                                    )}
                                    {showMotivation ? (
                                        <div className="rounded-xl bg-darker-violet-850 min-h-28 flex-1 p-2 px-3 pr-14 relative font-semibold overflow-hidden animate-fadeIn">
                                            <div>
                                                {t(
                                                    'journal.motivation.' +
                                                        debouncedSelectedMood,
                                                )}
                                            </div>
                                            <img
                                                src={LongSeal}
                                                alt=""
                                                className="absolute h-18 -rotate-45 -right-1 -bottom-2"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-28"></div>
                                    )}
                                    <div className="w-full h-0.5 bg-darker-violet-850"></div>
                                </div>
                            )}
                            {
                                <div className="flex w-full h-full gap-4 justify-evenly text-base text-white/40 mt-6 circle self-center ">
                                    <div className="spin ">
                                        {Object.entries(moods).map(
                                            (
                                                [mood, label]: [any, string],
                                                index,
                                            ) =>
                                                mood !== selectedMood && (
                                                    <motion.div
                                                        className={`flex flex-col gap-1 items-center font-semibold z-10 circle-child`}
                                                        key={mood}
                                                        onClick={() =>
                                                            setSelectedMood(
                                                                mood,
                                                            )
                                                        }
                                                        layoutId={
                                                            mood +
                                                            '-journal-create'
                                                        }
                                                        style={
                                                            {
                                                                '--i':
                                                                    index + 1,
                                                                '--m': Object.keys(
                                                                    moods,
                                                                ).length,
                                                            } as React.CSSProperties
                                                        }
                                                    >
                                                        <Mood
                                                            mood={mood}
                                                            className="text-8xl"
                                                        />
                                                        <div>
                                                            {t(
                                                                'journal.mood.' +
                                                                    mood,
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ),
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                    {currStep == 1 && (
                        <div className="flex flex-1 shrink-0 h-0 overflow-auto flex-col gap-3">
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.2')}
                            </div>
                            <textarea
                                className="rounded-xl bg-darker-violet-950 w-full min-h-36 p-2 px-3 font-semibold resize-none outline-none scroll-mt-12"
                                value={firstQuestion}
                                onChange={(event) =>
                                    setFirstQuestion(event.target.value)
                                }
                            />
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.3')}
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-center w-fulls">
                                {Object.entries(moods).map(
                                    ([mood, label]: [any, string]) => (
                                        <div
                                            key={mood}
                                            className={`flex flex-col items-center justify-center ${sleepRating == mood ? 'opacity-100' : 'opacity-40'} `}
                                            onClick={() => setSleepRating(mood)}
                                        >
                                            <Mood
                                                mood={mood}
                                                className="text-5xl"
                                            />
                                            <div>
                                                {t('journal.mood.' + mood)}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                            {/* <textarea className="rounded-xl bg-darker-violet-950 w-full min-h-36 p-2 px-3 font-semibold resize-none outline-none scroll-mt-12" /> */}
                            <div className="text-2xl font-bold px-2 mt-2">
                                {t('journal.question.4')}
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2 h-10">
                                <div
                                    className={`rounded-full flex-1 h-full flex justify-center items-center transition-colors text-lg font-bold uppercase ${haveDreams == true ? 'bg-accent' : 'bg-darker-violet-800'}`}
                                    onClick={() => setHaveDreams(true)}
                                >
                                    YES
                                </div>
                                <div
                                    className={`rounded-full flex-1 h-full flex justify-center items-center transition-colors text-lg font-bold uppercase ${haveDreams == false ? 'bg-accent' : 'bg-darker-violet-800'}`}
                                    onClick={() => setHaveDreams(false)}
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
                        </div>
                    )}
                    {currStep == 2 && (
                        <div className="flex flex-1 shrink-0 h-0 flex-col gap-3">
                            <div className="text-2xl font-bold px-2">
                                {t('journal.question.5')}
                            </div>
                            <textarea
                                className="rounded-xl bg-darker-violet-950 w-full h-0 p-2 px-3 font-semibold resize-none outline-none flex-1"
                                value={text}
                                onChange={(event) =>
                                    setText(event.target.value)
                                }
                            />
                        </div>
                    )}
                    {!keyboardVisible && (
                        <div className="flex gap-2 h-12 mb-safe">
                            <div
                                className="bg-darker-violet-800 rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase"
                                onClick={goBack}
                            >
                                back
                            </div>
                            <div
                                className={
                                    'bg-accent rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase' +
                                    (canGoNext() ? '' : ' bg-accent/50')
                                }
                                onClick={currStep == 2 ? createJournal : goNext}
                            >
                                {currStep == 2 ? 'save' : 'next'}
                            </div>
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default JournalCreate;
