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

interface Contact {
    name: string;
    pic: string;
}

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        {name: "Connor", pic: "pfp2"},
        {name: "Michaiah", pic: "pfp1"},
        {name: "Test", pic: "pfp3"}
    ]);

    function createList() : ReactElement[] {
        const list: ReactElement[] = [];
        for (let contact of contacts) {
            list.push(
                <IonItem>
                    <IonAvatar slot="start">
                        <IonImg src={"assets/profile_pics/"+contact.pic+".png"} alt="Pic" />
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
                    <IonItem>
                        <IonLabel>
                            {createList()}
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Contacts;
