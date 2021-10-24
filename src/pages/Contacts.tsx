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
    IonToolbar,
    useIonRouter
} from '@ionic/react';
import '../styles/Contacts.css';
import React, {ReactElement, useEffect, useState} from "react";
import {User} from "../utility/Interfaces";
import {localGetContacts, localGetUser, localGetUserPromise} from "../persistence/LocalStorage";
import {add} from "ionicons/icons";

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Map<string,User>>()
    const [currentUser, setCurrentUser] = useState<User>();
    const router = useIonRouter();

    useEffect(() => {
        localGetUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

        localGetContacts(setContacts);
        localGetUser(setCurrentUser);
    }, [])


    // Create the list of contact elements
    function createList(): ReactElement[] {
        const list: ReactElement[] = [];

        if (contacts && currentUser) {
            for (let contactUName of currentUser.contacts) {
                const contact = contacts.get(contactUName);
                if (contact) {
                    list.push(
                        <IonItem key={contact.username} button lines="full"
                                 routerLink={"/tabs/conversations/messaging/" + currentUser.username + "-" + contact.username}>
                            <IonAvatar slot="start">
                                <IonImg src={"assets/profile_pics/pfp" + contact.picture + ".png"} alt="Pic"/>
                            </IonAvatar>
                            <IonLabel>
                                {contact.name}
                            </IonLabel>
                        </IonItem>
                    )
                }
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
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Contacts;
