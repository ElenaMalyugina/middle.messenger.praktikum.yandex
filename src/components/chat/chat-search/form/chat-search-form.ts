import ChatsController from "../../../../controllers/chatsController";
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
    private chatsContorller = new ChatsController();

    //Пока в ТЗ нет описания, как это должно работать
    constructor(props: ChatSearchFormProps){
        super(props);

        this.setProps({
            data: {
                searchString: ""
            }
        })
    }

    protected submitForm = ()=>{
        const input = this.refs["searchInput"] as HTMLInputElement;
        if(!input) return;
        const searchString = input.value;
        this.chatsContorller.searchChats(searchString);
    }
}
