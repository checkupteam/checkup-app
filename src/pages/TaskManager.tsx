import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const TaskManager: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Task Manager</IonTitle>
                </IonToolbar>
            </IonHeader>
        </div>
    );
};

export default TaskManager;
