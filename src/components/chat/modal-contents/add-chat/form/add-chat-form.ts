import ChatsController from "../../../../../controllers/chatsController";
import Store from "../../../../../framework/store/Store";
import Form, { type FormProps } from "../../../../../ui-units/form/form";
import AddChatFormTemplate from "./add-chat-form.hbs?raw";

interface AddChatProps{
    title:string;
}

interface AddChatFormProps extends FormProps{
    data: AddChatFormProps;
}

export default class AddChatForm extends Form<AddChatFormProps>{
    static componentName = 'AddChatForm';
    protected template = AddChatFormTemplate;
    private chatsController = new ChatsController();

    constructor(props: AddChatFormProps){
        super(props);
        Store.subscribe(()=>{
            this.errorFormHandler();
        })
    }

    protected submitForm=(form: Form)=>{
        this.chatsController.submitFormHandler(form);
    };

}
