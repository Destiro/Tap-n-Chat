import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/AddContactNFC.css';
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";

const AddContact: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [scanning, setScanning] = useState<boolean>(false);
    const [result, setResult] = useState<string>("Not Scanned Yet")

    useEffect(() => {
        storage.getUser(setUser)
    }, [])

    const startScan = async () => {
        await BarcodeScanner.checkPermission({force: true});

        // Hide page in order to display camera
        setScanning(true);

        const result = await BarcodeScanner.startScan();

        // Show page again
        setScanning(false);

        setResult(result.content? result.content : "Scan Failed")
    };

    return (
        !scanning ?
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Contact</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                { user ?
                    <QRCode value={user.username}/>
                    : "Loading QR Code..."
                }
                <IonButton onClick={startScan}>Scan</IonButton>
                Scanned Result: {result}
            </IonContent>
        </IonPage> : null
    );
};

export default AddContact;
