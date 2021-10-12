/**
 * Iterate through the users to see if a user exists.
 * Used to determine if a login currently exists to avoid overwriting logins on signup.
 *
 * @param username
 * @param users
 * @constructor
 */
export default function LoginExists(username: string, users: any[]) : boolean {
    for(let i=0; i<users.length; i++){
        if(users[i].username === username){
            return true;
        }
    }

    return false;
}
