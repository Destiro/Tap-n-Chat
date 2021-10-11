import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../styles/Messaging.css';
import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";

interface MessagingProps
    extends RouteComponentProps<{
        id: string;
    }> {}

const Messaging: React.FC<MessagingProps> = ({ match }) => {
    const [contact, setContact] = useState<string>(match.params.id);

    useEffect(() => {
        setContact(match.params.id);
    }, [match.params.id]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{contact}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    );
};

export default Messaging;
