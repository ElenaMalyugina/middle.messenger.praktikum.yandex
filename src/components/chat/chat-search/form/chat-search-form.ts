import Form from "../../../../ui-units/form/form";
import ChatSearchFormTemplate from "./chat-search-form.hbs?raw";

export default class ChatSearchForm extends Form{
    static componentName = 'ChatSearchForm';
    protected template = ChatSearchFormTemplate;

    //Пока в ТЗ нет описания, как это должно работать
}
