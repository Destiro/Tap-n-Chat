import {
    IonButton,
    IonContent, IonFooter,
    IonHeader, IonInput,
    IonItem, IonLabel,
    IonList, IonNote,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../styles/Messaging.css';
import React, {ReactElement, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Conversation} from "../utility/Interfaces";
import {OpenConversation, UpdateConversation} from "../persistence/FirebaseFunctions";
import {FormatMessageTime} from "../utility/DateFormatters";

const Messaging: React.FC<RouteComponentProps> = ({ match }) => {
    const [text, setText] = useState<string>("")
    const [contacts, setContacts] = useState<string[]>([]);
    const [conversation, setConversation] = useState<Conversation>();

    useEffect(() => {
        const ids = match.url.split("/").reverse()[0].split("-");
        setContacts(ids);

        if (ids.length > 0) {
            OpenConversation(ids, setConversation);
        }
    }, [match]);

    // Create the list of messages
    function createList() : ReactElement[] {
        const list: ReactElement[] = [];

        if (conversation !== undefined && conversation.messages !== undefined) {
            for (let message of conversation.messages) {
                list.push(
                    <IonItem key={message.time}>
                        <IonLabel text-wrap>
                            <b>{message.sender}:</b> {message.message}
                        </IonLabel>
                        <IonNote slot="end">
                            {FormatMessageTime(new Date(message.time))}
                        </IonNote>
                    </IonItem>
                )
            }
        }

        return list;
    }


    function sendMessage() {
        if (text.trim().length > 0 && conversation !== undefined) {
            if (conversation.messages === undefined) {
                conversation.messages = [];
            }
            conversation.messages.push({
                sender: "Michaiah",
                message: text,
                time: Date()
            });
            setText("");
            UpdateConversation(conversation);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{contacts.sort().join(", ")}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonList>
                    {createList()}
                </IonList>
            </IonContent>

            <IonFooter>
                <IonItem>
                    <IonInput
                        value={text}
                        onIonChange={e => setText(e.detail.value!)}
                        placeholder="Message"
                    />
                    <IonButton onClick={sendMessage}>Send</IonButton>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};

export default Messaging;
