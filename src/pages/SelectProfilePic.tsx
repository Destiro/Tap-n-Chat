import {IonButton, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import '../styles/SelectProfilePic.css';
import React, {useState} from "react";

const SelectProfilePic: React.FC<{selectHandler:any, backHandler:any}> = ({selectHandler, backHandler}) => {
    const[image, setImage] = useState<string>("3");

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton className="backButton2" slot="start" onClick={backHandler()}>
                        Back
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <div className="profilePicBox">
                <IonButton className="saveButton2" onClick={selectHandler(image)}>
                    Save
                </IonButton>
            </div>
        </IonPage>
    );
};

export default SelectProfilePic;
