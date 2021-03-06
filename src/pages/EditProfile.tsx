import {
    IonButton,
    IonContent,
    IonHeader, IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage, IonTextarea,
    IonTitle,
    IonToolbar, useIonRouter,
    useIonToast,
    IonToast
} from '@ionic/react';
import '../styles/EditProfile.css';
import React, {ReactElement, useEffect, useState} from "react";
import {localGetUser, localGetUserPromise, localStoreUser} from "../persistence/LocalStorage";
import {User} from "../utility/Interfaces";
import {storeUser} from "../persistence/FirebaseFunctions";

const EditProfile: React.FC = () => {
    //Wall of states
    const [user, setUser] = useState<User>();
    const [fName, setfName] = useState<string>();
    const [lName, setlName] = useState<string>();
    const [bio, setBio] = useState<string>();
    const [gender, setGender] = useState<string>();
    const [image, setImage] = useState<string>("1");
    const [selectingImage, setSelectingImage] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("1");
    const [savedSuccess, setSavedSuccess] = useState<boolean>(true);
    const [present, dismiss] = useIonToast();

    const router = useIonRouter();

    //Load pre-existing user details
    useEffect(()=>{
        localGetUserPromise().then(user => {
            if (!user || user.length === 0) {
                router.push("")
            }
        })

        localGetUser(setUser)
    }, []);

    useEffect(() => {
        if (user) {
            setfName(user.name);
            setlName(user.surname);
            setBio(user.bio);
            setImage(user.picture);
            setGender(user.gender);
        }
    }, [user])

    function saveProfile() {
        if (user && fName && lName && bio && gender && image) {
            user.name = fName;
            user.surname = lName;
            user.bio = bio;
            user.gender = gender;
            user.picture = image;

            localStoreUser(user).then();
            storeUser(user, function(didSave: boolean) {
                setSavedSuccess(didSave);
            });

            if(savedSuccess){
                present("User Saved Successfully!", 3000)
            }else{
                present("Error Saving User.", 3000);
            }
        }

        router.goBack();
    }

    function changeImage() {
        setSelectingImage(true);
    }

    function selectHandler(imageNum: string) {
        setSelectingImage(false);
        if (imageNum.toString() !== undefined) {
            setImage(imageNum.toString());
        }
    }

    // Create the list of profile picture boxes
    function createList(): ReactElement[] {
        const list: ReactElement[] = [];

        for (let i = 1; i < 13; i++) {
            if(i.toString() === selectedImage){
                list.push(
                    <div key={i.toString()} className="selectBox2" onClick={() => setSelectedImage(i.toString())}>
                        <IonImg className="selectPic" src={"assets/profile_pics/pfp" + i + ".png"} alt="Pic"/>
                    </div>
                )
            }else{
                list.push(
                    <div key={i.toString()} className="selectBox" onClick={() => setSelectedImage(i.toString())}>
                        <IonImg className="selectPic" src={"assets/profile_pics/pfp" + i + ".png"} alt="Pic"/>
                    </div>
                )
            }

        }

        return list;
    }

    return (
        selectingImage ?
            // Selecting profile picture page
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Selecting Profile Picture</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="pictureContainer">
                    <div className="grid">
                        {createList()}
                    </div>
                    <IonButton className="saveButton2" onClick={() => selectHandler(selectedImage)}>
                        Save
                    </IonButton>
                </div>
            </IonPage>
            :
            // Edit profile page
            <div className="editProfileContent">
                <IonHeader>
                    <IonToolbar className="topButtons">
                        <IonButton className="backButton" slot="start" routerLink="/tabs/profile">
                            Back
                        </IonButton>
                        <IonButton className="saveButton" slot="end" onClick={saveProfile}>
                            Save Changes
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                    {/*Edit Profile Functionality*/}
                    <IonList className="editProfileBox">
                        <IonTitle className="signupTitle">
                            <h3 className="editText"> Edit Profile </h3>
                        </IonTitle>

                        <IonImg className="imgPFP" src={"assets/profile_pics/pfp" + image + ".png"} alt="Pic"/>
                        <IonButton className="signupButton" onClick={() => changeImage()}>Select PFP</IonButton>

                        <IonItem className="input2">
                            <IonLabel position="floating">First Name</IonLabel>
                            <IonInput value={fName} required onIonChange={e => setfName(e.detail.value!)}/>
                        </IonItem>

                        <IonItem className="input2">
                            <IonLabel position="floating">Last Name</IonLabel>
                            <IonInput value={lName} required onIonChange={e => setlName(e.detail.value!)}/>
                        </IonItem>

                        <IonItem className="input2">
                            <IonLabel position="floating">Gender</IonLabel>
                            <IonInput value={gender} required onIonChange={e => setGender(e.detail.value!)}/>
                        </IonItem>

                        <IonItem className="input2">
                            <IonLabel position="floating">Bio</IonLabel>
                            <IonTextarea value={bio} required onIonChange={e => setBio(e.detail.value!)}/>
                        </IonItem>
                    </IonList>
            </div>
    );
};

export default EditProfile;
