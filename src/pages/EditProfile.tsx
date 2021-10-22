import {
    IonButton,
    IonContent,
    IonHeader, IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/EditProfile.css';
import React, {useEffect, useState} from "react";
import {storage} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";

const EditProfile: React.FC = () => {
    //Wall of states
    const [fName, setfName] = useState<string>();
    const [lName, setlName] = useState<string>();
    const [bio, setBio] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [image, setImage] = useState<string>();
    const [user, setUser] = useState<User>();

    //Load pre-existing user details
    useEffect(() => {
        storage.getUser(setUser)
        setfName(user?.name);
        setlName(user?.surname);
        setBio(user?.bio);
        setImage(user?.picture);
        setGender(user?.gender);
    }, []);

    function saveProfile(){
        alert("user pressed save"); //todo call firebase function to set user with these vars
        //todo update local user also
    }

    function changeImage(){
        alert("user pressed change profile image button"); //todo open the selectprofilepic page, parse setImage as callback
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonButton className="profileButton" routerLink="/tabs/profile">Back</IonButton>

                {/*Edit Profile Functionality*/}
                <IonList className="editProfileBox">
                    <IonTitle className="signupTitle">
                        <h3> Edit Profile </h3>
                    </IonTitle>

                    <IonImg className="imgPFP" src={"assets/profile_pics/pfp" + image + ".png"} alt="Pic"/>
                    <IonButton className="signupButton" onClick={() => changeImage()}>Select PFP</IonButton>

                    <IonItem className="input">
                        <IonLabel position="floating">First Name</IonLabel>
                        <IonInput value={fName} required onIonChange={e => setfName(e.detail.value!)}/>
                    </IonItem>

                    <IonItem className="input">
                        <IonLabel position="floating">Last Name</IonLabel>
                        <IonInput value={lName} required onIonChange={e => setlName(e.detail.value!)}/>
                    </IonItem>

                    <IonItem className="input">
                        <IonLabel position="floating">Gender</IonLabel>
                        <IonInput value={gender} required onIonChange={e => setGender(e.detail.value!)}/>
                    </IonItem>

                    <IonItem className="input">
                        <IonLabel position="floating">Bio</IonLabel>
                        <IonInput value={bio} required onIonChange={e => setBio(e.detail.value!)}/>
                    </IonItem>

                    <IonButton className="saveButton" onClick={() => saveProfile()}>Save Changes</IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;
