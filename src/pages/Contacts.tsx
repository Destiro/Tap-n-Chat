import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar, useIonRouter
} from '@ionic/react';
import '../styles/Contacts.css';
import React, {ReactElement, useEffect, useState} from "react";
import {User} from "../utility/Interfaces";
import {getUsers} from "../persistence/FirebaseFunctions";
import {storage} from "../persistence/LocalStorage";
import {add} from "ionicons/icons";

const Contacts: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>()
    const [currentUser, setCurrentUser] = useState<User>();
    const router = useIonRouter();

    useEffect(()=>{
        storage.getUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

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
                        <IonItem key={user.username} button lines="full"
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

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/tabs/contacts/addcontact">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Contacts;
