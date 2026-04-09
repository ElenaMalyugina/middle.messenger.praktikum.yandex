import Form, { type FormProps } from "../../../../ui-units/form/form";
import PopupFiles from "../../popup-contents/popup-files/popup-files";
import MessagesSendFormTemplate from "./message-send-form.hbs?raw";

interface Message{
    message: string;
}

interface MessagesSendFormProps extends FormProps{
    data: Message,
    modalFileShow: (event: Event, el:HTMLButtonElement)=>void;
}

export default class MessagesSendForm extends Form<MessagesSendFormProps>{
    static componentName = 'MessagesSendForm';
    protected template = MessagesSendFormTemplate;

    constructor(props:MessagesSendFormProps){
        super(props)
    }

    modalFileShow=(event: Event, el: HTMLButtonElement)=>{
        if(!el) return;
        const activeClass = "attache-button--active";
        el.classList.add(activeClass);

        const popup = this.children.find(el=> el instanceof PopupFiles);
        if(popup){
            popup.popupShow(event, "#attache-button", activeClass);
        }
    }

    protected componentDidMount(): void {
        this.setProps({
                data:{
                    message: ""
                },
                modalFileShow: this.modalFileShow
            }
        )
    }

    protected submitForm = (_form: Form)=>{
        //реализуем в следующем спринте, но линтер требует функцию уже сейчас
    };

}
