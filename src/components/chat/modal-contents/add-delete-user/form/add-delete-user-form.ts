import ChatUsersController from "../../../../../controllers/chatUsersController";
import Store from "../../../../../framework/store/Store";
import type { ChatData } from "../../../../../types/chatData";
import type { UserInfo } from "../../../../../types/userInfo";
import DataList from "../../../../../ui-units/datalist/datalist";
import Form, { type FormProps } from "../../../../../ui-units/form/form";
import { debounce } from "../../../../../utils/debounce";
import AddDeleteUserFormTemplate from "./add-delete-user-form.hbs?raw";

export interface AddDeleteUserDataProps{
    name:string;
    id: number;
    chatId: number;
}

interface AddDeleteUserFormProps extends FormProps{
    data: AddDeleteUserDataProps;
    buttonText: string;
    formSettings: Partial<FormProps>;
    searchedUsers: UserInfo[];
    onInputEmit: (el:HTMLInputElement)=>void;
    dataListClickEmit: (el:HTMLInputElement)=>void;
}

export default class AddDeleteUserForm extends Form<AddDeleteUserFormProps>{
    static componentName = 'AddDeleteUserForm';
    protected template = AddDeleteUserFormTemplate;
    private chatUsersController = new ChatUsersController();
    private debouncedSearch: ((el: HTMLInputElement) => void) | null = null;

    constructor(props: AddDeleteUserFormProps){
        super(props)

        this.debouncedSearch = debounce(this.searchUsers.bind(this), 500);

        const currentChat = Store.getState().activeChat as ChatData;
        if(!currentChat) return;

        this.setProps({
            data: {
                name: "",
                id: -1,
                chatId: currentChat.id
            },
            action: this.props.formSettings?.action || "",
            buttonText: this.props.buttonText,
            onInputEmit: this.searchHandler,
            dataListClickEmit: this.selectUser
        })

        Store.subscribe(()=>{
            const searchedUser = Store.getState().searchedUser as UserInfo[];
            if(!searchedUser || !Array.isArray(searchedUser)) return;

            const dataList = this.children.find(el=>el instanceof DataList);
            if(! dataList) return;

            const adaptedSearchedUser = searchedUser.map(el=> {
                return {
                    value: el.id,
                    text: el.login
                }
            })

            dataList.setProps({
                dataList: [...adaptedSearchedUser]
            })
        })
    }

    searchHandler=(el: HTMLInputElement)=>{
        if (this.debouncedSearch) {
            this.debouncedSearch(el);
        }
    }

    searchUsers=(el: HTMLInputElement)=>{
        if(el.value.length> 3){
            this.chatUsersController.searchUsers(el.value)
        }
    }

    selectUser=(el: HTMLInputElement)=>{
        const userId = el.getAttribute("data-value");
        const userName = el.getAttribute("data-text");
        this.setProps({
            data:{
                chatId: this.props.data.chatId,
                id: userId? parseInt(userId) : -1,
                name: userName || ""
            }
        });

        Store.setState("searchedUser", [])
    }

    protected submitForm=(form: Form)=>{
        this.chatUsersController.submitFormHandler(form);
    };

}
