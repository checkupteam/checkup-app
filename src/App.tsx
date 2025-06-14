import { KonstaProvider } from 'konsta/react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Journal from './pages/journal';
import Calendar from './pages/Calendar';
import AuthPage from './pages/auth';
import Goals from './pages/goals';
import PrivateRoute from './components/PrivateRoute';
import { FaBook, FaCalendarAlt, FaClipboardList, FaUser } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

import 'tailwindcss/tailwind.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import './theme/cricle_layout.css';
import AccountPage from './pages/Account';
import Analytics from './components/Analytics';
import TabBarHidder from './components/TabBarHidder';

setupIonicReact();

const App: React.FC = () => (
    <KonstaProvider theme="parent">
        <IonApp className="safe-areas">
            <IonReactRouter>
                <Analytics>
                    <TabBarHidder>
                        <IonRouterOutlet>
                            <PrivateRoute path="/app">
                                <IonTabs>
                                    <IonRouterOutlet>
                                        <Route
                                            path="/app/home"
                                            render={() => <Home />}
                                        />
                                        <Route
                                            path="/app/journal"
                                            component={Journal}
                                        />
                                        <Route
                                            path="/app/calendar"
                                            component={Calendar}
                                        />
                                        <Route
                                            path="/app/goals"
                                            component={Goals}
                                        />
                                        <Route
                                            path="/app/account"
                                            render={() => <AccountPage />}
                                        />
                                        <Redirect
                                            exact
                                            from="/app"
                                            to="/app/home"
                                        />
                                    </IonRouterOutlet>
                                    <IonTabBar
                                        slot="bottom"
                                        className="bg-darker-violet-850 h-18 w-full"
                                        id="app-tab-bar"
                                    >
                                        <IonTabButton
                                            tab="calendar"
                                            href="/app/calendar"
                                            className="bg-transparent text-2xl text-darker-violet-700"
                                        >
                                            <FaCalendarAlt />
                                        </IonTabButton>
                                        <IonTabButton
                                            tab="journal"
                                            href="/app/journal"
                                            className="bg-transparent text-2xl text-darker-violet-700"
                                        >
                                            <FaBook />
                                        </IonTabButton>
                                        <IonTabButton
                                            tab="home"
                                            href="/app/home"
                                            className="bg-transparent text-2xl text-darker-violet-700"
                                        >
                                            <FaHouse />
                                        </IonTabButton>
                                        <IonTabButton
                                            tab="goals"
                                            href="/app/goals"
                                            className="bg-transparent text-2xl text-darker-violet-700"
                                        >
                                            <FaClipboardList />
                                        </IonTabButton>
                                        <IonTabButton
                                            tab="account"
                                            href="/app/account"
                                            className="bg-transparent text-2xl text-darker-violet-700"
                                        >
                                            <FaUser />
                                        </IonTabButton>
                                    </IonTabBar>
                                </IonTabs>
                            </PrivateRoute>
                            <Route path="/auth" component={AuthPage} />
                            <Redirect exact from="/" to="/app/home" />
                        </IonRouterOutlet>
                    </TabBarHidder>
                </Analytics>
            </IonReactRouter>
        </IonApp>
    </KonstaProvider>
);

export default App;
