import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/Conversations.css';
import React, {ReactElement, useEffect, useState} from "react";
import {GetConversations, OpenConversation} from "../persistence/FirebaseFunctions";
import {Conversation} from "../utility/Interfaces";
import {FormatMessageTime} from "../utility/DateFormatters";

const Conversations: React.FC = () => {
    const currentUser : string = "Michaiah";
    const [conversations, setConversations] = useState<Conversation[]>();

    useEffect(()=>{
        GetConversations(currentUser, setConversations)
    }, [])

    function createList() : ReactElement[] {
        const list : ReactElement[] = []

        if (conversations !== undefined) {
            for (let conversation of conversations) {
                const lastMessage = conversation.messages[conversation.messages.length-1];
                list.push(
                    <IonItem key={conversation.users.join("")}>
                        <IonLabel>
                            <b>{conversation.users.join(", ")}</b>
                            <br/>
                            {lastMessage.message}
                            <IonNote className="timestamp">
                                {FormatMessageTime(new Date(lastMessage.time))}
                            </IonNote>
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
                    <IonTitle>Conversations</IonTitle>
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

export default Conversations;
