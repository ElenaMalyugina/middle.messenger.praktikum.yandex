import { initialError, validateRequired, type formError } from "../../../../services/validationService";
import Form, { type FormProps } from "../../../../ui-units/form/form";
import MessagesSendFormTemplate from "./message-send-form.hbs?raw";

export default class MessagesSendForm extends Form{
    static componentName = 'MessagesSendForm';
    protected template = MessagesSendFormTemplate;

    constructor(props:FormProps){
        super(props)
    }

    onValidate=(val:unknown)=>{
        //потом доделать валидацию
        const error:formError = validateRequired(val);
        this.setProps({errorMessage: error.text});
    }

    cleanValidate=()=>{
        const error:formError = initialError;
        this.setProps({errorMessage: error.text});
    }
}
