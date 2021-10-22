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
    IonTitle, IonToolbar
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
            <IonHeader>
                <IonToolbar className="topButtons">
                    <IonButton className="editProfileButton" slot="start" routerLink="/tabs/profile/editprofile">
                        Edit
                    </IonButton>
                    <IonButton className="logoutButton" slot="end" routerLink="/login">
                        Logout
                    </IonButton>
                </IonToolbar>
            </IonHeader>
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
                                <div className="upperBlock" />
                                <IonImg className="img" src={"assets/profile_pics/pfp" + user.picture + ".png"} alt="Pic"/>
                                <div className="lowerBlock">
                                    <IonTitle className="profileNames">
                                        <h2>{user.name} {user.surname}</h2>
                                    </IonTitle>
                                    <h3>Joined: {user.joined}</h3>
                                    <h3>Gender: {user.gender}</h3>
                                    <h3>Bio:</h3>
                                    <div className="bioBox">
                                        <h4>{user.bio}</h4>
                                    </div>
                                    <div className="space" />
                                </div>
                            </>
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
