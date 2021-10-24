import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel, IonList,
    IonPage,
    IonTitle,
    useIonRouter, useIonToast
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Signup.css';
import React, {useEffect, useState} from "react";
import {FormatDate} from "../utility/DateFormatters";
import {storeUser, getUsers} from "../persistence/FirebaseFunctions";
import LoginExists from "../utility/LoginExists";
import {localGetUserPromise} from "../persistence/LocalStorage";

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [fName, setfName] = useState<string>();
    const [lName, setlName] = useState<string>();
    const [users, setUsers] = useState<any>();
    const [savedSuccess, setSavedSuccess] = useState<boolean>(true);
    const [present, dismiss] = useIonToast();
    const router = useIonRouter();

    useEffect(() => {
        localGetUserPromise().then(user => {
            if (user && user.length > 0) {
                router.push("/tabs")
            }
        })

        getUsers(setUsers)
    }, []);

    function createSignup() {
        let date: string = FormatDate(new Date());
        if (username === undefined || password === undefined ||
            fName === undefined || lName === undefined) {
            present("Please fill in all fields!", 3000)
        } else {
            if (!LoginExists(username, users)) {
                storeUser({
                    username: username,
                    password: password,
                    name: fName,
                    surname: lName,
                    joined: date,
                    gender: "Not-Specified",
                    bio: "No Bio Provided",
                    picture: "1",
                    contacts: []
                }, function(didSave: boolean) {
                    setSavedSuccess(didSave);
                });

                if(savedSuccess){
                    present("User Saved Successfully!", 3000)
                }else{
                    present("Error Saving User.", 3000);
                }
                router.push("/login");
            } else {
                present("Username already exists!", 3000)
            }
        }
    }

    return (
        <div className="contentSignup">
            {/*Sign up functionality*/}
            <IonList className="signupBox">
                <IonTitle className="signupTitle">
                    <h3> Sign up to Tap'n'Chat </h3>
                </IonTitle>

                <IonItem className="input">
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput value={fName} required onIonChange={e => setfName(e.detail.value!)}/>
                </IonItem>

                <IonItem className="input">
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput value={lName} required onIonChange={e => setlName(e.detail.value!)}/>
                </IonItem>

                <IonItem className="input">
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput value={username} required onIonChange={e => setUsername(e.detail.value!)}/>
                </IonItem>

                <IonItem className="input">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput value={password} type="password" required
                              onIonChange={e => setPassword(e.detail.value!)}/>
                </IonItem>

                <IonButton className="signupButton" onClick={() => createSignup()}>Sign up</IonButton>
            </IonList>

            {/*Return to login functionality*/}
            <div className="loginBox">
                <IonTitle className="loginText">
                    <h4> I have an Account </h4>
                </IonTitle>
                <IonButton className="loginButton" routerLink="/login">Login</IonButton>
            </div>
        </div>
    );
};

export default Signup;
