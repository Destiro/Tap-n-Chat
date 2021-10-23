import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    useIonRouter
} from '@ionic/react';
import '../styles/Login.css';
import React, {useEffect, useState} from "react";
import {checkLogin, getUsers} from "../persistence/FirebaseFunctions";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [users, setUsers] = useState<User[]>();
    const router = useIonRouter();

    function ValidateLogin() {
        if (username === undefined || password === undefined) {
            alert("Please enter in your username and password!")
        } else {
            if (users === undefined) {
                alert("Connection error, please try again");
            } else if (checkLogin(username, password, users)) {
                for (let user of users) {
                    if (user.username === username) {
                        storage.storeUser(user);
                    }
                }

                router.push("/tabs");
            } else {
                alert("Incorrect username or password!")
            }
        }
    }

    useEffect(() => {
        getUsers(setUsers)
    }, []);

    return (
        <div className="content">
                {/*Login functionality*/}
                <IonList className="loginContainer">
                    <IonTitle className="loginTitle">
                        <h1>Tap n Chat</h1>
                    </IonTitle>

                    <IonItem className="input">
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                            value={username}
                            onIonChange={e => setUsername(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem className="input">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            value={password}
                            type="password"
                            onIonChange={e => setPassword(e.detail.value!)}
                        />
                    </IonItem>

                    <IonButton className="loginButton" onClick={() => ValidateLogin()}>Login</IonButton>
                </IonList>


                    {/*Signup Functionality*/}
                    <div className="signupContainer">
                        <IonTitle className="signupText">
                            <h4> Don't have an account? </h4>
                        </IonTitle>
                        <IonButton className="signupButton" routerLink="/signup">Signup</IonButton>
                    </div>
        </div>
    );
};

export default Login;
