import "./messages-box.css";
import MessagesBoxTemplate from "./messages-box.hbs?raw";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesController from "../../../controllers/messagesController";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import type Form from "../../../ui-units/form/form";
import { ChatsService } from "../../../services/chatsService";

interface MessagesBoxProps extends BlockOwnProps{
    currentChatId: number | null;
    submitFormHandler: (form: Form)=>void;
    sendFileHandler: (file: File)=>void;
    addOldMessages: (count: number)=>void;
}

export default class MessagesBox extends Block<MessagesBoxProps>{
    static componentName = 'MessagesBox';
    protected template = MessagesBoxTemplate;


}

