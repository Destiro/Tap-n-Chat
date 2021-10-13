export interface Contact {
    name: string;
    pic:  string;
}

export interface Message {
    sender: string;
    message: string;
    time: string;
}

export interface Conversation {
    messages: Message[],
    users: string[]
}