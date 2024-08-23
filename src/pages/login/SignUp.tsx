import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";


const SignUp: React.FC = () => {
    

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar></IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="h-full flex flex-col items-center gap-20 mt-10">
                    <div className="text-7xl">LOGO</div>
                    <div className="flex flex-col gap-3 text-2xl">
                        <form action="post" className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Username"
                                className="p-2 rounded-lg"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-2 rounded-lg"
                            />
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                className="p-2 rounded-lg"
                            />
                            
                            <button className="bg-accent text-white p-2 rounded-lg">
                                Sign Up
                            </button>

                        </form>
                    </div>
                    <div className="absolute bottom-10 bg-black opacity-25 w-full h-56"> cool grafika </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
