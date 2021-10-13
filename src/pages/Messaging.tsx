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
import {OpenConversation} from "../persistence/FirebaseFunctions";

interface MessagingProps extends RouteComponentProps<{ id: string; }> {}

const Messaging: React.FC<MessagingProps> = ({ match }) => {
    const [text, setText] = useState<string>("")
    const [contact, setContact] = useState<string>(match?.params?.id);
    const [conversation, setConversation] = useState<Conversation>();

    useEffect(() => {
        setContact(match?.params?.id);
        if (contact !== undefined) {
            OpenConversation(["Michaiah", contact], setConversation)
        }
    }, [match?.params?.id]);

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
