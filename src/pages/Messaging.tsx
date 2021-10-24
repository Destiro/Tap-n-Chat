import {
    IonAvatar,
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar, useIonRouter, useIonViewDidEnter
} from '@ionic/react';
import '../styles/Messaging.css';
import React, {ReactElement, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {Conversation, User} from "../utility/Interfaces";
import {openConversation, updateConversation} from "../persistence/FirebaseFunctions";
import {FormatMessageTime} from "../utility/DateFormatters";
import {storage} from "../persistence/LocalStorage";

const Messaging: React.FC<RouteComponentProps> = ({match}) => {
    const [text, setText] = useState<string>("")
    const [users, setUsers] = useState<string[]>([]);
    const [conversation, setConversation] = useState<Conversation>();
    const [currentUser, setCurrentUser] = useState<User>();
    const [contacts, setContacts] = useState<Map<string,User>>();
    const router = useIonRouter();
    let scrollDown = false;

    useIonViewDidEnter(()=>scrollDown = true);

    useEffect(()=>{
        storage.getUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

        storage.getUser(setCurrentUser);
        storage.getContacts(setContacts);

        setInterval( () => {
            if(scrollDown){
                document.querySelector("ion-content")?.scrollToBottom();
                scrollDown = false;
            }
        }, 500);
    }, [])

    useEffect(() => {
        const ids = match.url.split("/").reverse()[0].split("-");
        setUsers(ids);

        if (ids.length > 0) {
            openConversation(ids, setConversation);
        }
    }, [match]);

    // Scroll to bottom whenever conversation is updated
    useEffect(() => {
        document.querySelector("ion-content")?.scrollToBottom();
    }, [conversation])

    function createTitle() : string {
        const title : string[] = [];

        if (currentUser && contacts && users) {
            for (let user of users) {
                // @ts-ignore
                title.push(contacts.has(user) ? contacts.get(user).name
                    : (user === currentUser.username ? currentUser.name : user));
            }
        } else {
            title.push("Loading...")
        }

        return title.sort().join(", ");
    }

    // Create the list of messages
    function createList(): ReactElement[] {
        const list: ReactElement[] = [];

        if (conversation && conversation.messages && currentUser) {
            for (let i = 0; i < conversation.messages.length; i++) {
                const message = conversation.messages[i];
                // Name & Timestamp
                list.push(
                    <IonItem lines="none">
                        <IonLabel slot={currentUser.name === message.sender ? "end" : ""}><b>{message.sender}</b></IonLabel>

                        <IonAvatar slot={currentUser.name === message.sender ? "end" : "start"}>
                            <IonImg src={"assets/profile_pics/pfp" + message.picture + ".png"} alt="Pic"/>
                        </IonAvatar>

                        <IonNote slot={currentUser.name === message.sender ? "start" : "end"}>
                            {FormatMessageTime(new Date(message.time))}
                        </IonNote>
                    </IonItem>
                )
                // Message
                list.push(
                    <IonItem key={message.time} lines="full" style={{textAlign: currentUser.name === message.sender ? "right" : "left"}}>
                        <span style={{width: '100%'}}>{message.message}</span>
                    </IonItem>
                )
            }
        }

        return list;
    }

    function sendMessage() {
        if (currentUser) {
            if (text.trim().length > 0 && conversation !== undefined) {
                if (conversation.messages === undefined) {
                    conversation.messages = [];
                }
                conversation.messages.push({
                    sender: currentUser.name,
                    picture: currentUser.picture,
                    message: text,
                    time: Date()
                });
                setText("");
                updateConversation(conversation);
            }
        } else {
            alert("Error sending message, please try again");
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{createTitle()}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {createList()}
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
