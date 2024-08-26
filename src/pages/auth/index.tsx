import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <IonPage>
            <IonRouterOutlet className="flex flex-col overflow-hidden">
                <Route exact path={`${match.url}/login`} component={Login} />
                <Route exact path={`${match.url}/signup`} component={SignUp} />
                <Redirect exact from="" to={`${match.url}/signup`} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default AuthPage;
