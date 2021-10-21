import {IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonRouter} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Profile.css';
import React, {useEffect, useState} from "react";
import {getUser, getUsers} from "../persistence/FirebaseFunctions";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>();
    const router = useIonRouter();


    useEffect(() => {
        getUser("a", function(tempUser: any):void {
            setUser(tempUser);
        })
    }, []);

    console.log(user);
    return (
        user===undefined?(
                // User hasnt loaded, display loading message
    <IonPage>
        <IonContent fullscreen>
        <IonList className="profileContainer">
            <IonTitle className="profileNames">
                <h1> Loading User...</h1>
            </IonTitle>
        </IonList>
        </IonContent>
    </IonPage>
        ) : (
        //User has loaded, display profile
            <IonPage>
                <IonContent fullscreen>
                    <IonList className="profileContainer">
                        <IonTitle className="profileNames">
                            <h2>FirstName: {user.name}</h2>
                            <h2>LastName: {user.surname}</h2>
                        </IonTitle>
                    </IonList>
                </IonContent>
            </IonPage>
        )
  );
};

export default Profile;
