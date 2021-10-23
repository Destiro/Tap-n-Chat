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
import Messaging from "./pages/Messaging";
import EditProfile from "./pages/EditProfile";
import AddContact from "./pages/AddContact";

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

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/tabs" render={() => (
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/tabs/contacts" exact component={Contacts}/>
                            <Route path="/tabs/contacts/addcontact" component={AddContact}/>
                            <Route path="/tabs/conversations" exact component={Conversations}/>
                            <Route path="/tabs/conversations/messaging" component={Messaging}/>
                            <Route path="/tabs/profile" exact component={Profile}/>
                            <Route path="/tabs/profile/editprofile" component={EditProfile}/>

                            {/* Default Path */}
                            <Route render={() => <Redirect to="/tabs/conversations"/>} />
                        </IonRouterOutlet>

                        <IonTabBar slot="bottom">
                            <IonTabButton tab="contacts" href="/tabs/contacts">
                                <IonIcon icon={list}/>
                                <IonLabel>Contacts</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="conversations" href="/tabs/conversations">
                                <IonIcon icon={chatboxEllipses}/>
                                <IonLabel>Conversations</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="profile" href="/tabs/profile">
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
