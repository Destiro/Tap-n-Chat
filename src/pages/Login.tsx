import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    useIonRouter, useIonToast
} from '@ionic/react';
import '../styles/Login.css';
import React, {useEffect, useState} from "react";
import {checkLogin, getSpecificUsers, getUsers} from "../persistence/FirebaseFunctions";
import {localGetUserPromise, localStoreContacts, localStoreUser} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [users, setUsers] = useState<User[]>();
    const [present, dismiss] = useIonToast();
    const router = useIonRouter();

    useEffect(() => {
        localGetUserPromise().then(user => {
            if (user && user.length > 0) {
                router.push("/tabs")
            }
        }).catch();

        getUsers(setUsers)
    }, []);

    function ValidateLogin() {
        if (username === undefined || password === undefined) {
            present("Please enter in a username and password!", 3000);
        } else {
            if (users === undefined) {
                present("Connection error! Please try again.", 3000);
            } else if (checkLogin(username, password, users)) {
                for (let user of users) {
                    if (user.username === username) {
                        localStoreUser(user).then(() =>
                            getSpecificUsers(user.contacts, users =>
                                localStoreContacts(users).then(() =>
                                    router.push("/tabs")
                                )
                            )
                        );
                    }
                }
            } else {
                present("Incorrect Username or Password!", 3000);
            }
        }
    }

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
