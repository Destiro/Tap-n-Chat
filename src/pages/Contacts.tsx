import {
    IonAvatar,
    IonContent,
    IonHeader, IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../styles/Contacts.css';
import React, {ReactElement, useEffect, useState} from "react";
import {User} from "../utility/Interfaces";
import {getUsers} from "../persistence/FirebaseFunctions";
import {storage} from "../persistence/LocalStorage";

const Contacts: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>()
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(()=>{
        getUsers(setAllUsers);
        storage.getUser(setCurrentUser);
    }, [])

    // Create the list of contact elements
    function createList() : ReactElement[] {
        const list: ReactElement[] = [];

        if (allUsers && currentUser) {
            for (let user of allUsers) {
                if (currentUser.contacts.includes(user.username))
                    list.push(
                        <IonItem key={user.username} button
                                 routerLink={"/tabs/conversations/messaging/" + currentUser.username + "-" + user.username}>
                            <IonAvatar slot="start">
                                <IonImg src={"assets/profile_pics/pfp" + user.picture + ".png"} alt="Pic"/>
                            </IonAvatar>
                            <IonLabel>
                                {user.name}
                            </IonLabel>
                        </IonItem>
                    )
            }
        }

        return list;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonList>
                    {createList()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Contacts;
