import {db} from "../config/FirebaseConfig";
import {Conversation, User} from "../utility/Interfaces";

/**
 * Getting all users from firestore
 *
 * @param callback
 */
export function getUsers(callback: (arg0: User[]) => void) {
    db.firestore().collection("Users").onSnapshot((querySnapshot: any) => {
        const users: User[] = [];
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
 * @param users
 */
export function checkLogin(user: string, pass: string, users: User[]) : boolean {
    let isValidName = false;

    //Iterate through users to see if a username & password match
    if (user !== '' && pass !== '') {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === user && users[i].password === pass) {
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
 * @param fName
 * @param lName
 * @param dateJoined
 * @constructor
 */
export function addNewUser(username:string, password:string, fName:string, lName:string, dateJoined:string) {
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
        alert("Error Creating User: " + error);
        console.error("Error adding user: ", error)
    });
}

/**
 * Get a user object from firestore to display info for their profile page
 *
 * @param username
 * @param callback
 */
export function getUser(username: string, callback: (arg0: User) => void) {
    db.firestore().collection("Users").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().username === username){
                // Without json calls it won't believe that doc.data() is a valid user object
                callback(JSON.parse(JSON.stringify(doc.data())));
            }
        });
    })
}


/**
 * Finds and returns a new or existing conversation
 *
 * @constructor
 */
export function openConversation(users:string[], callback: (arg0: Conversation) => void) {
    const id = users.sort().join("");

    db.database().ref("Conversations").on('value', (snapshot) => {
        const conversations = snapshot.val();

        if (conversations && conversations[id]) {
            callback(conversations[id]);
        } else {
            db.database().ref("Conversations/"+id).set({
                users: users,
                messages: []
            }).then(()=>
                callback({users: users, messages: []})
            );
        }
    })
}

/**
 * Uploads the provided conversation to Firebase Realtime Database
 *
 * @param conversation
 * @constructor
 */
export function updateConversation(conversation:Conversation) {
    const id = conversation.users.sort().join("");

    db.database().ref("Conversations/" + id).set(conversation).then();
}

/**
 * Finds all conversations that the provided user is a part of
 *
 * @param user
 * @param callback
 * @constructor
 */
export function getConversations(user:string, callback: (arg0: Conversation[]) => void) {
    db.database().ref("Conversations").on('value', (snapshot) => {
        const conversations : Conversation[] = [];

        snapshot.forEach(conversation => {
            if (conversation.val().users.includes(user)) {
                conversations.push(conversation.val());
            }
        })

        callback(conversations);
    })
}
