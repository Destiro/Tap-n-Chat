import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/Conversations.css';
import React, {ReactElement, useEffect, useState} from "react";
import {getConversations} from "../persistence/FirebaseFunctions";
import {Conversation, User} from "../utility/Interfaces";
import {FormatMessageTime} from "../utility/DateFormatters";
import {storage} from "../persistence/LocalStorage";

const Conversations: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [conversations, setConversations] = useState<Conversation[]>();

    useEffect(()=>{
        storage.getUser(setCurrentUser)
    }, [])

    useEffect(()=>{
        if (currentUser) getConversations(currentUser.username, setConversations)
    }, [currentUser])

    function createList() : ReactElement[] {
        const list : ReactElement[] = []

        if (conversations !== undefined) {
            for (let conversation of conversations) {
                if (conversation.messages !== undefined) {
                    const lastMessage = conversation.messages[conversation.messages.length - 1];
                    list.push(
                        <IonItem key={conversation.users.join("")} button
                                 routerLink={"/tabs/conversations/messaging/" + conversation.users.join("-")}>
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
