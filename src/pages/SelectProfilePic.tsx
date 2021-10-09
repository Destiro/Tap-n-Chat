import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/SelectProfilePic.css';

const SelectProfilePic: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Select Profile Picture</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ExploreContainer name="SelectProfilePic" />
            </IonContent>
        </IonPage>
    );
};

export default SelectProfilePic;
