import {db} from "../config/FirebaseConfig";

/**
 * Getting all users from firestore
 *
 * @param callback
 */
export function getUsers(callback: (arg0: any[]) => void) {
    db.firestore().collection("Users").onSnapshot((querySnapshot: any) => {
        const users: any[] = [];
        querySnapshot.forEach((doc: { data: () => any; }) => {
            users.push(doc.data());
        });
        callback(users);
    })
}

/**
 * Checks if this is a valid user/pass combination, returning a bool
 *
 * @param user
 * @param pass
 */
export function checkLogin(user: string, pass: string, users: any[]) : boolean {
    let isValidName = false;
    
    //Iterate through users to see if a username & password match
    if (user !== '' && pass !== '') {
        for(let i=0; i<users.length; i++){
            if(users[i].username === user && users[i].password === pass){
                isValidName = true;
            }
        }
    }

    return isValidName;
}
