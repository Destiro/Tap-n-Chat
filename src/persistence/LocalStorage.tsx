import {Storage} from '@ionic/storage';
import {User} from "../utility/Interfaces";

class LocalStorage {
    private readonly store: Storage;

    constructor() {
        this.store = new Storage();
        this.store.create().then();
    }

    storeUser(user:User) {
        this.store.set('user', JSON.stringify(user)).then();
    }

    getUser(callback: (arg0: User) => void) {
        this.store.get('user').then(user => {
            callback(JSON.parse(user))
        });
    }
}

export const storage = new LocalStorage();