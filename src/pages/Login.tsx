import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Login.css';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tap'n'chat Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ExploreContainer name="Login" />
            </IonContent>
        </IonPage>
    );
};

export default Login;
