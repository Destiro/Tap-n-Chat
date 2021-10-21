import {
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle
} from '@ionic/react';
import '../styles/Profile.css';
import React, {useEffect, useState} from "react";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        storage.getUser(setUser)
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonList className="profileContainer">
                    {
                        // Display loading message if user hasn't loaded
                        !user ?
                        <IonTitle className="profileNames">
                            <h1> Loading User...</h1>
                        </IonTitle>
                        :
                            <>
                                <IonHeader className="topButtons">
                                    <IonButton className="editProfileButton" routerLink="/tabs/editprofile">Edit</IonButton>
                                    <IonButton className="logoutButton" routerLink="/login">Logout</IonButton>
                                </IonHeader>
                                <div className="upperBlock" />
                                <IonImg className="img" src={"assets/profile_pics/pfp" + user.picture + ".png"} alt="Pic"/>
                                <div className="lowerBlock">
                                    <IonTitle className="profileNames">
                                        <h2>FirstName: {user.name}</h2>
                                        <h2>LastName: {user.surname}</h2>
                                    </IonTitle>
                                    <IonList className="profileContent">
                                        <IonItem className="baseInfo">
                                            <h3>Joined: {user.joined}, Gender: {user.gender}</h3>
                                        </IonItem>
                                        <IonItem className="bioInfo">
                                            <h3>Bio:</h3>
                                            <div className="bioBox">
                                                <h4>{user.bio}</h4>
                                            </div>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </>
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
