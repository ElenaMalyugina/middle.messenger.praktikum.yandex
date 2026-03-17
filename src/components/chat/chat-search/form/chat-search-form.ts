import Form from "../../../../ui-units/form/form";
import ChatSearchFormTemplate from "./chat-search-form.hbs?raw";

export class ChatSearchForm extends Form{
    static componentName = 'ChatSearchForm';
    protected template = ChatSearchFormTemplate;

}
