import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Journal</IonTitle>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
            </IonContent> */}
        </div>
    );
};

export default Home;
