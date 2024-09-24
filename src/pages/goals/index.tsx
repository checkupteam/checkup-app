import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import GoalList from './GoalList';
import GoalEdit from './GoalEdit';

const Goals: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/app/goals" component={GoalList} />
                <Route path="/app/goals/:id" component={GoalEdit} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Goals;
