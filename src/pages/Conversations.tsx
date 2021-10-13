import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../styles/Conversations.css';
import React, {useEffect, useState} from "react";
import {OpenConversation} from "../persistence/FirebaseFunctions";
import {Conversation} from "../utility/Interfaces";

const Conversations: React.FC = () => {
    // const [temp, setTemp] = useState<Conversation>();
    //
    // useEffect(()=>{
    //     OpenConversation(["Michaiah", "Justin"], setTemp);
    //     console.log(temp)
    // }, [])
    //
    // useEffect(() => {
    //     console.log(temp)
    // }, [temp])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Conversations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    );
};

export default Conversations;
