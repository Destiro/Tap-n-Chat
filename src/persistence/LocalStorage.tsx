import {Storage} from '@ionic/storage';
import {User} from "../utility/Interfaces";

class LocalStorage {
    private readonly store: Storage;
    private readonly userKey: string = 'user';
    private readonly contactsKey: string = 'contacts';

    constructor() {
        this.store = new Storage();
        this.store.create().then();
    }

    storeUser(user: User) {
        return this.store.set(this.userKey, JSON.stringify(user));
    }

    storeContacts(contacts: Map<string, User>) {
        return this.store.set(this.contactsKey, JSON.stringify(Array.from(contacts.entries())));
    }

    getUserPromise(): Promise<string> {
        return this.store.get(this.userKey);
    }

    getUser(callback: (arg0: User) => void) {
        this.store.get(this.userKey).then(user =>
            callback(JSON.parse(user))
        );
    }

    getContacts(callback: (arg0: Map<string, User>) => void) {
        this.store.get(this.contactsKey).then(users => {
            callback(new Map(JSON.parse(users)))
        });
    }

    clear() {
        this.store.clear().then();
    }
}

export const storage = new LocalStorage();