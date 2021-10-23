export interface User {
    username: string;
    password: string;
    name: string;
    surname: string;
    joined: string;
    gender: string;
    bio: string;
    picture:  string;
    contacts: string[];
}

export interface Message {
    sender: string;
    picture: string;
    message: string;
    time: string;
}

export interface Conversation {
    messages: Message[],
    users: string[]
}