import type { SocketResponse } from "../framework/Http/WebSocketApi";
import Store from "../framework/store/Store";
import { UserService } from "../services/userService";

export interface Message{
    block: string;
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    is_read: boolean;
    file?:{
        path: string;
    }
    type: string;
    isAuthor: boolean;
    isChangedDate: boolean;
    isCheckIcon: boolean;
}

export interface MessageForSend{
    message: string;
    type?: string;
}

export class MessageModel implements Message{
    block: string = "chat";
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    file?:{
        path: string;
    }
    type: string;
    is_read: boolean;
    isAuthor: boolean;
    isChangedDate: boolean;
    isCheckIcon: boolean;

    //так как из сокета может прийти что угодно
    constructor(data: SocketResponse){
        const currentUserId = UserService.getCurrentUser();

        this.id = typeof data.id === 'number' ? data.id : 0;
        this.chat_id = typeof data.chat_id === 'number' ? data.chat_id : 0;
        this.user_id = typeof data.user_id === 'number' ? data.user_id : 0;

        // Строковые поля с проверкой
        this.time = typeof data.time === 'string' ? data.time : '';
        this.content = typeof data.content === 'string' ? data.content : '';
        this.type = typeof data.type === 'string' ? data.type : '';
        this.is_read = !!data.is_read;
        this.isAuthor = this.user_id === currentUserId;
        this.isChangedDate = false;
        this.isCheckIcon = this.isAuthor && this.is_read;

        this.content = typeof data.content === 'string'? data.content.replace(/(?:\r\n|\r|\n)/g, "<br>"): "";

        // Опциональное поле file с глубокой проверкой
        if (data.file && typeof data.file === 'object' && data.file !== null) {
            const fileData = data.file as Record<string, unknown>;
            this.file = {
                path: typeof fileData.path === 'string' ? fileData.path : ''
            };
        }
    }
}


