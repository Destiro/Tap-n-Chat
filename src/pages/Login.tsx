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
            <IonContent fullscreen>

                {/*Login functionality*/}
                <IonList className="loginContainer">
                    <IonTitle className="loginTitle">
                        <h1> Tap'n'Chat </h1>
                    </IonTitle>

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
            {/*Signup Functionality*/}
            <IonList className="signupContainer">
                <IonTitle className="signupText">
                    <h4> Don't have an account? </h4>
                </IonTitle>
                <IonButton className="signupButton" routerLink="/signup">Signup</IonButton>
            </IonList>
        </IonPage>
    );
};

export default Login;
