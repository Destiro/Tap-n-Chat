import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/AddContactNFC.css';
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const AddContact: React.FC = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        storage.getUser(setUser)
    }, [])

    // const start = async () => {
    //
    //     const platforms = getPlatforms();
    //     const isWeb = (platforms.includes("desktop") || platforms.includes("mobileweb") || platforms.includes("pwa"));
    //
    //     if (!isWeb) {
    //     // alert("testing")
    //
    //         const data = await BarcodeScanner.scan();
    //
    //         if (data) {
    //             // handleSuccess(data);
    //             alert(data);
    //         }
    //         alert("done")
    //     } else {
    //
    //         // presentWebModal({
    //         //
    //         //     presentingElement: pageRef.current
    //         // });
    //         alert("web")
    //     }
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Contact</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                { user ?
                    <QRCode value={user.username}/> : "Loading QR Code..."
                }
                {/*<IonButton onClick={()=>start()}>Scan</IonButton>*/}
            </IonContent>
        </IonPage>
    );
};

export default AddContact;
