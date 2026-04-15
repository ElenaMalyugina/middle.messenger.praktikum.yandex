import "./messages-box.css";
import MessagesBoxTemplate from "./messages-box.hbs?raw";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesController from "../../../controllers/messagesController";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import type Form from "../../../ui-units/form/form";

interface MessagesBoxProps extends BlockOwnProps{
    currentChatId: number;
    submitFormHandler: (form: Form)=>void;
}

export default class MessagesBox extends Block<MessagesBoxProps>{
    static componentName = 'MessagesBox';
    protected template = MessagesBoxTemplate;
    private messagesController = new MessagesController();

    constructor(props: MessagesBoxProps){
        super(props);
        this.props.submitFormHandler = this.submitForm;

        Store.subscribe(()=>{
            const activeChat= Store.getState().activeChat as ChatData;
            if(!activeChat) return;

            if(this.props.currentChatId !== activeChat.id){
                this.messagesController.closeConnection();
                this.messagesController.startConnecton(activeChat.id)
                this.setProps({currentChatId: activeChat.id});
            }
        })
    }

    submitForm=(form: Form)=>{
        this.messagesController.submitFormHandler(form)
    }
}

