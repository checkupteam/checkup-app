import { KonstaProvider } from "konsta/react";
import { Redirect, Route } from "react-router-dom";
import {
    createAnimation,
    CreateAnimation,
    IonApp,
    IonRouterOutlet,
    setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Journal from "./pages/journal";
import Calendar from "./pages/Calendar";
import AuthPage from "./pages/auth";
import TaskManager from "./pages/TaskManager";

import "tailwindcss/tailwind.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";
import AuthChecker from "./components/AuthChecker";

setupIonicReact();

const App: React.FC = () => (
    <KonstaProvider theme="parent">
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <AuthChecker>
                        <Route path="/home" component={Home} />
                        <Route path="/journal" component={Journal} />
                        <Route path="/calendar" component={Calendar} />
                        <Route path="/tasks" component={TaskManager} />
                        <Redirect exact from="/" to="/home" />
                    </AuthChecker>
                    <Route path="/auth" component={AuthPage} />
                </IonRouterOutlet>
                <NavBar />
            </IonReactRouter>
        </IonApp>
    </KonstaProvider>
);

export default App;
