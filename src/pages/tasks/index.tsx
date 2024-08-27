import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import TaskList from "./TaskList";
import TaskEntry from "./TaskEntry";

const Journal: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/tasks" component={TaskList} />
                <Route exact path="/tasks/add" component={TaskEntry} />
                <Route path="/tasks/edit/:id" component={TaskEntry} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Journal;
