import {
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter
} from '@ionic/react';
import '../styles/Profile.css';
import React, {useEffect, useState} from "react";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();
    const router = useIonRouter();

    useEffect(() => {
        storage.getUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

        storage.getUser(setUser)
    }, []);

    return (
        // Display loading message if user hasn't loaded
        !user ?
            <IonTitle className="profileNames">
                <h1> Loading User...</h1>
            </IonTitle>
            :
            <div className="contentProfile">
                <IonHeader>
                    <IonToolbar className="topButtons">
                        <IonButton className="editProfileButton" slot="start" routerLink="/tabs/profile/editprofile">
                            Edit
                        </IonButton>
                        <IonButton className="logoutButton" slot="end" routerLink=""
                                   onClick={() => storage.clear()}>
                            Logout
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                <div className="lowerBlock">
                    <IonImg className="img" src={"assets/profile_pics/pfp" + user.picture + ".png"} alt="Pic"/>
                    <IonTitle className="profileNames">
                        <h2>{user.name} {user.surname}</h2>
                    </IonTitle>
                    <div className="infoBox">
                        <h3>Joined: {user.joined}</h3>
                        <h3>Gender: {user.gender}</h3>
                    </div>
                    <div className="bioBox">
                        <h5>{user.bio}</h5>
                    </div>
                </div>
            </div>
    );
};

export default Profile;
