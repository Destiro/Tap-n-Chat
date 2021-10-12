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

/**
 * Adding a new user to the user database
 *
 * @param username
 * @param password
 * @constructor
 */
export function AddNewUser(username:string, password:string, fName:string, lName:string, dateJoined:string) {
    db.firestore().collection("Users").doc(username).set({
        username: username,
        password: password,
        name: fName,
        surname: lName,
        joined: dateJoined,
        gender: "Not-Specified",
        bio: "No Bio provided",
        picture: "1",
        contacts: [],
    }).then(function () {
        alert("Account created successfully!");
    }).catch(function (error) {
        alert("Error Creating User: "+error);
        console.error("Error adding user: ", error)
    });
}
