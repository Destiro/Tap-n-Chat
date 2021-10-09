import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/AddContactNFC.css';

const AddContactNFC: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add Contact via NFC</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <ExploreContainer name="AddContactNFC" />
        </IonContent>
        </IonPage>
);
};

export default AddContactNFC;
