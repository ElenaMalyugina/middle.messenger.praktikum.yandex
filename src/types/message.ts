export interface Message{
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    file?:{
        path: string;
    }
    type: string;
}

export interface MessageForSend{
    message: string;
    type?: string;
}

export class MessageModel implements Message{
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    file?:{
        path: string;
    }
    type: string;

    //так как из сокета может прийти что угодно
    constructor(data: Record<string, unknown>){
        this.id = typeof data.id === 'number' ? data.id : 0;
        this.chat_id = typeof data.chat_id === 'number' ? data.chat_id : 0;
        this.user_id = typeof data.user_id === 'number' ? data.user_id : 0;

        // Строковые поля с проверкой
        this.time = typeof data.time === 'string' ? data.time : '';
        this.content = typeof data.content === 'string' ? data.content : '';
        this.type = typeof data.type === 'string' ? data.type : '';

        // Опциональное поле file с глубокой проверкой
        if (data.file && typeof data.file === 'object' && data.file !== null) {
            const fileData = data.file as Record<string, unknown>;
            this.file = {
                path: typeof fileData.path === 'string' ? fileData.path : ''
            };
        }
    }
}


