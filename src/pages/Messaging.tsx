import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../styles/Messaging.css';
import React from "react";
import {RouteComponentProps} from "react-router";

interface MessagingProps
    extends RouteComponentProps<{
        id: string;
    }> {}

const Messaging: React.FC<MessagingProps> = ({ match }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{match.params.id}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    );
};

export default Messaging;
