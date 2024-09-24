import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import { FaPlus } from 'react-icons/fa';
import GoalElement from '../../components/goals/Goal';
import { useCreateGoalMutation, useGetGoalsQuery } from '../../api/goals';
import Loading from '../../components/Loading';

const GoalList: React.FC = () => {
    const router = useIonRouter();
    const { data: goals } = useGetGoalsQuery();
    const [createGoal] = useCreateGoalMutation();

    const handleCreateGoal = async () => {
        const newGoal = await createGoal({
            title: 'New Goal',
            isDone: false,
        });

        if (!newGoal.data) return;
        router.push('/app/goals/' + newGoal.data.id);
    };

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-2xl font-bold h-10 text-white">
                        <div>Goals</div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="flex flex-col">
                <div className="p-3 pb-24 overflow-auto flex flex-col gap-2 h-full">
                    {goals ? (
                        goals.map((goal) => (
                            <GoalElement key={goal.id} goal={goal} />
                        ))
                    ) : (
                        <Loading />
                    )}
                </div>
                <div
                    className="fixed bottom-3 right-3 rounded-full bg-accent w-16 aspect-square flex justify-center items-center text-xl text-white"
                    onClick={() => handleCreateGoal()}
                >
                    <FaPlus />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GoalList;
