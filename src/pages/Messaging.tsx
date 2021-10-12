import {
    IonAvatar, IonButton,
    IonContent, IonFooter,
    IonHeader, IonImg,
    IonInput,
    IonItem, IonLabel,
    IonList, IonNote,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../styles/Messaging.css';
import React, {ReactElement, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";

interface MessagingProps extends RouteComponentProps<{ id: string; }> {}

interface Message {
    sender: string;
    text: string;
    time: string;
}

const Messaging: React.FC<MessagingProps> = ({ match }) => {
    const [text, setText] = useState<string>("")
    const [messages] = useState<Message[]>([{sender: "Michaiah", text: "Yo", time: Date()}])
    const [contact, setContact] = useState<string>(match?.params?.id);

    useEffect(() => {
        setContact(match?.params?.id);
    }, [match?.params?.id]);

    // Create the list of contact elements
    function createList() : ReactElement[] {
        const list: ReactElement[] = [];
        for (let message of messages) {
            list.push(
                <IonItem key={message.time}>
                    <IonLabel text-wrap>
                        <b>{message.sender}:</b> {message.text}
                    </IonLabel>
                    <IonNote slot="end">
                        {new Date(message.time).toLocaleTimeString()}
                    </IonNote>
                </IonItem>
            )
        }
        return list;
    }

    function sendMessage() {
        if (text.trim().length > 0)
        messages.push({
            sender: "Michaiah",
            text: text,
            time: Date()
        });
        setText("");
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
