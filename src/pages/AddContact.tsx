import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/AddContact.css';
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {storeUser} from "../persistence/FirebaseFunctions";

const AddContact: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [scanning, setScanning] = useState<boolean>(false);

    useEffect(() => {
        storage.getUser(setUser)
        // BarcodeScanner.prepare().then();
    }, [])

    const start = async () => {
        await checkPermission();
        setScanning(true);
        await BarcodeScanner.hideBackground();

        const data = await BarcodeScanner.startScan();

        //Scanned something
        if (data.hasContent) {
            handleSuccess(data);
        }
    }

    async function checkPermission() {
        return new Promise(async (resolve) => {
            const status = await BarcodeScanner.checkPermission({force: true})
            if (status.granted) {
                resolve(true);
            } else if (status.denied) {
                alert("No permissions to open camera. Please change in settings.")
            } else {
                resolve(false);
            }
        });
    }

    const handleSuccess = (data: any) => {
        addContact(data.content);
        stopScan();
    }

    const stopScan = () => {
        setScanning(false);
        BarcodeScanner.stopScan().then();
    }

    function addContact(contact:string) {
        if (user) {
            if (contact === user.username) {
                alert("Cannot add yourself as a contact");
            } else {
                if (user.contacts.includes(contact)) {
                    alert("Contact already added");
                } else {
                    user.contacts.push(contact);
                    storeUser(user);
                    alert(contact + " successfully added as a contact");
                }
            }
        }
    }

    return (
        !scanning ?
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Add Contact</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonTitle className="code">Your QR Code</IonTitle>
                    {user ?
                        <QRCode value={user.username} className="code"/>
                        : "Loading QR Code..."
                    }
                    <IonButton onClick={() => start()} className="scanButton">
                        Scan a Code
                    </IonButton>
                </IonContent>

            </IonPage>
            :
            <div>
                <IonButton onClick={() => stopScan()}>
                    Back
                </IonButton>
                <div className="square"/>
            </div>
    );
};

export default AddContact;
