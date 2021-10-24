import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar,
    useIonRouter,
    useIonToast
} from '@ionic/react';
import '../styles/AddContact.css';
import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {
    localGetContacts,
    localGetUser,
    localGetUserPromise,
    localStoreContacts,
    localStoreUser
} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {getSpecificUsers, storeUser} from "../persistence/FirebaseFunctions";

const AddContact: React.FC = () => {
    const [contacts, setContacts] = useState<Map<string,User>>()
    const [user, setUser] = useState<User>();
    const [scanning, setScanning] = useState<boolean>(false);
    const [savedSuccess, setSavedSuccess] = useState<boolean>(true);
    const [present, dismiss] = useIonToast();
    const router = useIonRouter();

    useEffect(()=>{
        localGetUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

        localGetUser(setUser);
        localGetContacts(setContacts);
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
                present("No Perms to open camera, Please change in settings.", 3000);
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
        if (user && contacts) {
            if (contact === user.username) {
                present("Cannot add yourself as a contact!", 3000);
            } else {
                if (user.contacts.includes(contact)) {
                    present("Contact Already Added!", 3000);
                } else {
                    user.contacts.push(contact);
                    storeUser(user, function(didSave: boolean) {
                        setSavedSuccess(didSave);
                    });

                    if(savedSuccess){
                        present("User Saved Successfully!", 3000)
                    }else{
                        present("Error Saving User.", 3000);
                    }

                    localStoreUser(user).then();
                    getSpecificUsers(user.contacts, localStoreContacts);
                    present("Successfully added as a contact!", 3000);
                }
            }
        }
    }

    return (
        !scanning ?
            <div className="addContactContent">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Add Contact</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonTitle className="code">Your QR Code</IonTitle>
                {user ?
                    <QRCode value={user.username} className="code2"/>
                    : "Loading QR Code..."
                }
                <IonButton color="light" onClick={() => start()} className="scanButton">
                    Scan a Code
                </IonButton>
            </div>
            :
            <div>
                <IonButton className="scanBackButton" onClick={() => stopScan()}>
                    Back
                </IonButton>
                <div className="square"/>
            </div>
    );
};

export default AddContact;
