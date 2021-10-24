import {Storage} from '@ionic/storage';
import {User} from "../utility/Interfaces";

const userKey: string = 'user';
const contactsKey: string = 'contacts';

async function createStore(): Promise<Storage> {
    return await new Storage().create();
}

export function localStoreUser(user: User): Promise<any> {
    return createStore().then(store => {
            return store.set(userKey, JSON.stringify(user));
        }
    )
}

export function localStoreContacts(contacts: Map<string, User>) {
    return createStore().then(store => {
            return store.set(contactsKey, JSON.stringify(Array.from(contacts.entries())));
        }
    )
}

export function localGetUserPromise(): Promise<string> {
    return createStore().then(store => {
            return store.get(userKey);
        }
    )
}

export function localGetUser(callback: (arg0: User) => void) {
    createStore().then(store => store.get(userKey).then(user => callback(JSON.parse(user))));
}

export function localGetContacts(callback: (arg0: Map<string, User>) => void) {
    createStore().then(store => store.get(contactsKey).then(users => callback(new Map(JSON.parse(users)))));
}

export function localClear() {
    createStore().then(store => store.clear().then());
}