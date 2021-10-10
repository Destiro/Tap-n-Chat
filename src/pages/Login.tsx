import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../styles/Login.css';
import React, {useState} from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tap'n'chat Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList className="loginContainer">
                    <IonItem className="input">
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput value={username} required onIonChange={e => setUsername(e.detail.value!)}/>
                    </IonItem>

                    <IonItem className="input">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput value={password} type="password" required onIonChange={e => setPassword(e.detail.value!)}/>
                    </IonItem>

                    <IonButton className="loginButton" routerLink="/tabs">Login</IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Login;
