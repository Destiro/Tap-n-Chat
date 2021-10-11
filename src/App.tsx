import React from "react";
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, person, chatboxEllipses } from 'ionicons/icons';
import Contacts from './pages/Contacts';
import Conversations from './pages/Conversations';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

/* Theme variables */
import './theme/variables.css';
import {log} from "util";
import Messaging from "./pages/Messaging";

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/tabs" render={() => (
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/tabs/contacts" component={Contacts}/>
                            <Route path="/tabs/conversations" exact component={Conversations}/>
                            <Route path="/tabs/conversations/messaging/:id" component={Messaging}/>
                            <Route path="/tabs/profile" component={Profile}/>

                            {/* Default Path */}
                            <Route render={() => <Redirect to="/tabs/conversations"/>} />
                        </IonRouterOutlet>

                        <IonTabBar slot="bottom">
                            <IonTabButton tab="tab1" href="/tabs/contacts">
                                <IonIcon icon={list}/>
                                <IonLabel>Contacts</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="tab2" href="/tabs/conversations">
                                <IonIcon icon={chatboxEllipses}/>
                                <IonLabel>Conversations</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="tab3" href="/tabs/profile">
                                <IonIcon icon={person}/>
                                <IonLabel>Profile</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                )}/>

                {/* Default Path */}
                <Route render={() => <Redirect to="/login"/>} />
            </IonRouterOutlet>


        </IonReactRouter>
    </IonApp>
);

export default App;
