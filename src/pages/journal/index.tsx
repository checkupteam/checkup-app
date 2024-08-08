import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import JournalList from "./JournalList";
import JournalEntry from "./JournalEntry";

const Journal: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/journal" component={JournalList} />
                <Route exact path="/journal/add" component={JournalEntry} />
                <Route path="/journal/edit/:id" component={JournalEntry} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Journal;
