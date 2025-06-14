import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import GoalPhase from '../../components/goals/Phase';
import { RouteComponentProps } from 'react-router';
import {
    useCreatePhaseMutation,
    useGetGoalQuery,
    useUpdateGoalMutation,
} from '../../api/goals';
import { useDebounce } from '@reactuses/core';
import Loading from '../../components/Loading';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

interface GoalEditProps
    extends RouteComponentProps<{
        id?: string;
    }> {}

const GoalEdit: React.FC<GoalEditProps> = ({ match }) => {
    const id = match.params.id && parseInt(match.params.id);
    if (!id) return null;

    const router = useIonRouter();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const { data } = useGetGoalQuery(id);
    const [updateGoal] = useUpdateGoalMutation();
    const [createPhase] = useCreatePhaseMutation();
    const titleInput = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState('');
    const debouncedTitle = useDebounce(title, 500);

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
        if (!data) return;
        console.log(data);
        setTitle(data.title);
    }, [data]);

    useEffect(() => {
        if (debouncedTitle.length == 0) return;
        updateGoal({
            id,
            changes: {
                title: debouncedTitle,
            },
        });
    }, [debouncedTitle]);

    const handleCreatePhase = () => {
        createPhase({
            goalId: id,
            title: 'Phase ' + (data && data.Phase.length + 1),
            isDone: false,
        });
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
                            ref={titleInput}
                        />
                        <FaPen
                            className="text-white/50 text-sm mr-1"
                            onClick={() => titleInput.current?.focus()}
                        />
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="h-full flex flex-col gap-3 p-3">
                    {data ? (
                        <div className="flex flex-col gap-6 flex-1 h-0 overflow-auto pb-36">
                            {data.Phase.map((phase) => (
                                <GoalPhase key={phase.id} phase={phase} />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                    {!keyboardVisible && (
                        <div
                            className="h-12 z-10 absolute left-3 right-3 bottom-3 bg-accent rounded-full flex-[2] flex justify-center items-center text-lg font-bold uppercase"
                            onClick={() => handleCreatePhase()}
                        >
                            Add Phase
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GoalEdit;
