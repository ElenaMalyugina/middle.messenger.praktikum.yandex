import Form from "../../../../ui-units/form/form";
import MessagesSendFormTemplate from "./message-send-form.hbs?raw";

export default class MessagesSendForm extends Form{
    static componentName = 'MessagesSendForm';
    protected template = MessagesSendFormTemplate;


}
