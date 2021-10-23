import {Storage} from '@ionic/storage';
import {User} from "../utility/Interfaces";

class LocalStorage {
    private readonly store: Storage;
    private readonly userKey : string = 'user';

    constructor() {
        this.store = new Storage();
        this.store.create().then();
    }

    storeUser(user:User) {
        return this.store.set(this.userKey, JSON.stringify(user));
    }

    getUserPromise() : Promise<string>{
        return this.store.get(this.userKey);
    }

    getUser(callback: (arg0: User) => void) {
        this.getUserPromise().then(user =>
            callback(JSON.parse(user))
        );
    }

    clearUser() {
        this.store.clear().then();
    }
}

export const storage = new LocalStorage();