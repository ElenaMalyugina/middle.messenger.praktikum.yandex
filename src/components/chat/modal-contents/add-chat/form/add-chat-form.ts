import ChatsController from "../../../../../controllers/chatsController";
import Form, { type FormProps } from "../../../../../ui-units/form/form";
import AddChatFormTemplate from "./add-chat-form.hbs?raw";

interface AddChatFormProps{
    name:string
}

interface AddDeleteUserFormProps extends FormProps{
    data: AddChatFormProps;
}

export default class AddChatForm extends Form<AddDeleteUserFormProps>{
    static componentName = 'AddChatForm';
    protected template = AddChatFormTemplate;
    private chatsController = new ChatsController();

    protected submitForm=(form: Form)=>{
        this.chatsController.submitFormHandler(form);
    };

}
