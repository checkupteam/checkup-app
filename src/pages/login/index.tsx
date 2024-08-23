import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import Login from "./Login";
import SignUp from "./SignUp";

const Journal: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/signup" component={SignUp} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Login;
