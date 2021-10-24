import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter
} from '@ionic/react';
import '../styles/Conversations.css';
import React, {ReactElement, useEffect, useState} from "react";
import {getConversations} from "../persistence/FirebaseFunctions";
import {Conversation, User} from "../utility/Interfaces";
import {FormatMessageTime} from "../utility/DateFormatters";
import {localGetContacts, localGetUser, localGetUserPromise} from "../persistence/LocalStorage";

const Conversations: React.FC = () => {
    const [contacts, setContacts] = useState<Map<string,User>>()
    const [currentUser, setCurrentUser] = useState<User>();
    const [conversations, setConversations] = useState<Conversation[]>();
    const router = useIonRouter();

    useEffect(() => {
        localGetUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        }).catch();

        localGetUser(setCurrentUser);
        localGetContacts(setContacts);
    }, [])

    useEffect(() => {
        if (currentUser) getConversations(currentUser.username, setConversations)
    }, [currentUser])


    function createList(): ReactElement[] {
        const list: ReactElement[] = []

        if (conversations && contacts && currentUser) {
            for (let conversation of conversations) {
                if (conversation.messages) {
                    const users : string[] = [];
                    for (let user of conversation.users) {
                        // @ts-ignore
                        users.push(contacts.has(user) ? contacts.get(user).name
                            : (user === currentUser.username ? currentUser.name : user));
                    }
                    users.sort();

                    const lastMessage = conversation.messages[conversation.messages.length - 1];
                    list.push(
                        <IonItem key={conversation.users.join("")} button lines="full"
                                 routerLink={"/tabs/conversations/messaging/" + conversation.users.join("-")}>
                            <IonLabel>
                                <b>{users.join(", ")}</b>
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
