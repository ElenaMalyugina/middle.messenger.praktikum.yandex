import Form, { type FormProps } from "../../../../ui-units/form/form";
import MessagesSendFormTemplate from "./message-send-form.hbs?raw";

interface Message{
    message: string;
}

interface MessagesSendFormProps extends FormProps{
    data: Message
}

export default class MessagesSendForm extends Form<MessagesSendFormProps>{
    static componentName = 'MessagesSendForm';
    protected template = MessagesSendFormTemplate;

    constructor(props:MessagesSendFormProps){
        super(props)
    }

    protected componentDidMount(): void {
        this.setProps({
                data:{
                    message: ""
                }
            }
        )
    }

}
