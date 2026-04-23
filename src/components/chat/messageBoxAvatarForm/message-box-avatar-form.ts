import "./message-box-avatar-form.css";
import MessageBoxAvatarFormTemplate from "./message-box-avatar-form.hbs?raw";
import Store from "../../../framework/store/Store";
import ErrorMessage from "../../../ui-units/error-message/error-message";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import { validate } from "../../../services/validationService";
import ChatsController from "../../../controllers/chatsController";
import type { ChatData } from "../../../types/chatData";
import { ChatsService } from "../../../services/chatsService";

interface MessageBoxAvatarProps extends BlockOwnProps{
    onChange: (file: File)=> void
}

export default class MessageBoxAvatarForm extends Block<MessageBoxAvatarProps>{
    static componentName = 'MessageBoxAvatarForm';
    protected template = MessageBoxAvatarFormTemplate ;
    private chatsController = new ChatsController();

    constructor(props: MessageBoxAvatarProps){
        super(props);
        this.props.onChange = this.submitForm;
    }

    protected componentDidMount(): void {
        Store.subscribe(
            this.serverErrorHandler
        )
    }

    protected submitForm = (file: File)=>{
        const validatorResult = validate(file, ["validatorFileImage","validatorFileMaxSize"]);

        if(!validatorResult.isValid){
            if(validatorResult.text){
                this.errorFormHandler(validatorResult.text);
            }
            return;
        }

        const activeChat = ChatsService.getActiveChat();
        if(activeChat){
            this.chatsController.updateAvatar(file, activeChat.id);
        }
    }

    protected serverErrorHandler = ()=>{
        const serverError = Store.getState().chatAvatarError as string;
        this.errorFormHandler(serverError);
    }

    protected errorFormHandler = (errorText: string)=>{
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
        if(!errorMessageBlock) return;
        errorMessageBlock.setProps({message: errorText});
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners()
    }

}
