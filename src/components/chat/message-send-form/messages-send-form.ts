import "./message-send-form.css";
import Form, { type FormProps } from "../../../ui-units/form/form";
import PopupFiles from "../popup-contents/popup-files/popup-files";
import MessagesSendFormTemplate from "./message-send-form.hbs?raw";
import type { Message } from "../../../types/message";

interface MessagesSendFormProps extends FormProps{
    data: Message,
    submitFormHandler: (form: Form)=>void;
    modalFileShow: (event: Event, el:HTMLButtonElement)=>void;
}

export default class MessageSendForm extends Form<MessagesSendFormProps>{
    static componentName = 'MessageSendForm';
    protected template = MessagesSendFormTemplate;

    constructor(props:MessagesSendFormProps){
        super(props);
        this.props.modalFileShow = this.modalFileShow;
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

    protected submitForm = (form: Form)=>{
        //через пропс, так как контроллер должен быть один.
        //с синглтоном было бы слишком жесткое решение
        this.props.submitFormHandler(form);
        form.reset()
    };
}
