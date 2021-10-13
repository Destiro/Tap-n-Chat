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

const Messaging: React.FC<RouteComponentProps> = ({ match }) => {
    const [text, setText] = useState<string>("")
    const [contact, setContact] = useState<string>();
    const [conversation, setConversation] = useState<Conversation>();

    useEffect(() => {
        const id = match.url.split("/").reverse()[0];
        setContact(id);

        if (id !== undefined) {
            OpenConversation(["Michaiah", id], setConversation)
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
                            {new Date(message.time).toLocaleTimeString()}
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
                    <IonTitle>{contact}</IonTitle>
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
