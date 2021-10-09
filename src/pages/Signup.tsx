import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Signup.css';

const Signup: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Signup to Tap'n'chat...</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ExploreContainer name="Signup" />
            </IonContent>
        </IonPage>
    );
};

export default Signup;
