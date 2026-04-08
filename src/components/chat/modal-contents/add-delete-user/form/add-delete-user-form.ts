import ChatUsersController from "../../../../../controllers/chatUsersController";
import Store from "../../../../../framework/store/Store";
import type { UserInfo } from "../../../../../types/userInfo";
import Form, { type FormProps } from "../../../../../ui-units/form/form";
import { debounce } from "../../../../../utils/debounce";
import AddDeleteUserFormTemplate from "./add-delete-user-form.hbs?raw";

interface AddDeleteUserDataProps{
    name:string;
}

interface AddDeleteUserFormProps extends FormProps{
    data: AddDeleteUserDataProps;
    buttonText: string;
    formSettings: Partial<FormProps>;
    searchedUsers: UserInfo[];
    onInputEmit: (el:HTMLInputElement)=>void;
}

export default class AddDeleteUserForm extends Form<AddDeleteUserFormProps>{
    static componentName = 'AddDeleteUserForm';
    protected template = AddDeleteUserFormTemplate;
    private chatUsersController = new ChatUsersController();
    private debouncedSearch: ((el: HTMLInputElement) => void) | null = null;

    constructor(props: AddDeleteUserFormProps){
        super(props)

        Store.subscribe(()=>{
            const searchedUser = Store.getState().searchedUser as UserInfo[];
            if(!searchedUser) return;

            this.setProps({searchedUsers: [...searchedUser]})
        })
    }

    protected componentDidMount(): void {
        this.debouncedSearch = debounce(this.searchUsers.bind(this), 1000);

        this.setProps({
            data: {
                name: ""
            },
            action: this.props.formSettings?.action || "",
            buttonText: this.props.buttonText,
            onInputEmit: this.searchHandler
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

    protected submitForm=(form: Form)=>{
        this.chatUsersController.submitFormHandler(form);
    };

}
