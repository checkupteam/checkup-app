import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import JournalList from "./JournalList";
import JournalEntry from "./JournalEntry";

const Journal: React.FC = () => {
    return (
        <div>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/journal" component={JournalList} />
                <Route exact path="/journal/add" component={JournalEntry} />
            </IonRouterOutlet>
        </div>
    );
};

export default Journal;
