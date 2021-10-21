import {IonContent, IonHeader, IonList, IonPage, IonTitle} from '@ionic/react';
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
                        <IonTitle className="profileNames">
                            <h2>FirstName: {user.name}</h2>
                            <h2>LastName: {user.surname}</h2>
                        </IonTitle>
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
