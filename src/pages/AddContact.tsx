import {getPlatforms, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/AddContactNFC.css';
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";

const AddContact: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [scanning, setScanning] = useState<boolean>(false);

    useEffect(() => {
        storage.getUser(setUser)
        BarcodeScanner.prepare();
    }, [])

    const start = async () => {
        alert("scan pressed");
        await checkPermission();
        setScanning(true);
        BarcodeScanner.hideBackground();

        const data = await BarcodeScanner.startScan();

        //Scanned something
        if (data.hasContent) {
            handleSuccess(data);
        }
        alert("done")
    }

    async function checkPermission () {
        return new Promise(async (resolve, reject) => {
            const status = await BarcodeScanner.checkPermission({force: true })
            if(status.granted){
                resolve(true);
            }else if(status.denied){
                alert("No permissions to open camera. Please change in settings.")
            }else{
                resolve(false);
            }
        });
    }

    const handleSuccess = (data: any) => {
        alert(data.content);
        stopScan();
    }

    const stopScan = () => {
        setScanning(false);
        BarcodeScanner.stopScan();
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
                    {user ?
                        <QRCode value={user.username}/> : "Loading QR Code..."
                    }
                    <IonButton onClick={() => start()}>Scan</IonButton>
                </IonContent>

        </IonPage> :
            <div>
                <IonButton onClick={() => stopScan()}>Back</IonButton>
                <div className="square" />
            </div>
    );
};

export default AddContact;
