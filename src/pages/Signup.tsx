import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonList,
    IonPage,
    IonTitle,
    IonToolbar, useIonRouter
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Signup.css';
import React, {useEffect, useState} from "react";
import GenerateDate from "../utility/GenerateDate";
import {AddNewUser, getUsers} from "../persistence/FirebaseFunctions";
import LoginExists from "../utility/LoginExists";

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [fName, setfName] = useState<string>();
    const [lName, setlName] = useState<string>();
    const [users, setUsers] = useState<any>();
    const router = useIonRouter();

    function createSignup() {
        let date:string = GenerateDate();
        if(username === undefined || password === undefined ||
            fName === undefined || lName === undefined){
            alert("Please fill in all fields!")
        }else{
            if(!LoginExists(username, users)){
                AddNewUser(username,password,fName,lName,date);
                router.push("/login");
            } else {
                alert("Username already exists!")
            }
        }
    }

    useEffect(() => {
        getUsers(function (fetched: any[]){
            setUsers(fetched);
        })
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <ExploreContainer name="Signup" />

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
                        <IonInput value={password} type="password" required onIonChange={e => setPassword(e.detail.value!)}/>
                    </IonItem>

                    <IonButton className="signupButton" onClick={() => createSignup()}>Sign up</IonButton>
                </IonList>

            </IonContent>

            {/*Return to login functionality*/}
            <IonList className="loginBox">
                <IonButton className="loginButton" routerLink="/login">I have an Account</IonButton>
            </IonList>

        </IonPage>
    );
};

export default Signup;
