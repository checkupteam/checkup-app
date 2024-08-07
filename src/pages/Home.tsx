import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
    return (
        <div className="min-h-full">
            <IonHeader>
                <IonToolbar>
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
            <div className="flex min-w-full min-h-full p-4">
                <div className="flex flex-col p-2 gap-2 relative bg-black/30 min-w-1/2">
                    <div>Friday</div>
                    <div>5.01</div>
                </div>
            </div>
        
        
        
        </div>
        
    );
};

export default Home;
