import { urls } from "../constants/urls";

export interface ChatData{
    id: number;
    title: string;
    avatar: string;
    unread_count:number;
    created_by: number;
    last_message:{
        time:string;
        text: string;
    };
}

export class ChatDataModel implements ChatData{
    id: number;
    title: string;
    avatar: string;
    unread_count:number;
    created_by: number;
    last_message:{
        time:string;
        text: string;
    };

    constructor(data: ChatData){
        this.id = data.id;
        this.title = data.title;
        this.avatar = this.avatar = data.avatar ? `${urls.resourceUrl}${data.avatar}` : urls.defaultProfileImg;
        this.unread_count = data.unread_count;
        this.created_by = data.created_by;
        this.last_message = data.last_message;
        if(this.last_message){
            this.last_message.time = data.last_message.time,
            this.last_message.text = data.last_message.text
        }
    }
}
