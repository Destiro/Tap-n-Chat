import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel, IonList,
    IonPage,
    IonTitle,
    useIonRouter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Signup.css';
import React, {useEffect, useState} from "react";
import {FormatDate} from "../utility/DateFormatters";
import {storeUser, getUsers} from "../persistence/FirebaseFunctions";
import LoginExists from "../utility/LoginExists";
import {storage} from "../persistence/LocalStorage";

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [fName, setfName] = useState<string>();
    const [lName, setlName] = useState<string>();
    const [users, setUsers] = useState<any>();
    const router = useIonRouter();

    useEffect(() => {
        storage.getUserPromise().then(user => {
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
            alert("Please fill in all fields!")
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
                });
                router.push("/login");
            } else {
                alert("Username already exists!")
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
