import Form, { type FormProps } from "../../../../ui-units/form/form";
import ChatSearchFormTemplate from "./chat-search-form.hbs?raw";

interface SearchData{
    searchString: string;
}

interface ChatSearchFormProps extends FormProps{
    data: SearchData;
}

export default class ChatSearchForm extends Form<ChatSearchFormProps>{
    static componentName = 'ChatSearchForm';
    protected template = ChatSearchFormTemplate;

    //Пока в ТЗ нет описания, как это должно работать
    constructor(props: ChatSearchFormProps){
        super(props);

        this.props.data={
            searchString: ""
        }
    }
}
