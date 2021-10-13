import {
    IonAvatar,
    IonContent,
    IonHeader, IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../styles/Contacts.css';
import React, {ReactElement, useState} from "react";
import {Contact} from "../utility/Interfaces";

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        {name: "Connor",   pic: "pfp2"},
        {name: "Michaiah", pic: "pfp1"},
        {name: "Justin",   pic: "pfp3"},
        {name: "Luke",     pic: "pfp4"}
    ]);

    // Create the list of contact elements
    function createList() : ReactElement[] {
        const list: ReactElement[] = [];
        for (let contact of contacts) {
            list.push(
                <IonItem key={contact.name} button routerLink={"/tabs/conversations/messaging/" + contact.name}>
                    <IonAvatar slot="start">
                        <IonImg src={"assets/profile_pics/" + contact.pic + ".png"} alt="Pic" />
                    </IonAvatar>
                    <IonLabel>
                        {contact.name}
                    </IonLabel>
                </IonItem>
            )
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
