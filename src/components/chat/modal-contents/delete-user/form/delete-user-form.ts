import ChatUsersController from "../../../../../controllers/chatUsersController";
import Store from "../../../../../framework/store/Store";
import type { AddDeleteUserFormProps } from "../../../../../types/addDeleteUser";
import type { ChatData } from "../../../../../types/chatData";
import type { UserInfo } from "../../../../../types/userInfo";
import DataList from "../../../../../ui-units/datalist/datalist";
import Form from "../../../../../ui-units/form/form";
import { debounce } from "../../../../../utils/debounce";
import DeleteUserFormTemplate from "./delete-user-form.hbs?raw";

export default class DeleteUserForm extends Form<AddDeleteUserFormProps>{
    static componentName = 'DeleteUserForm';
    protected template = DeleteUserFormTemplate;
    private chatUsersController = new ChatUsersController();
    private debouncedSearch: ((el: HTMLInputElement) => void) | null = null;

    constructor(props: AddDeleteUserFormProps){
        super(props);
        this.setInitialProps();

        Store.subscribe(()=>{
            this.searchSubscribe();

            this.errorFormHandler();
        })

        //чтобы при закрытии окна, а потом новом открытии не показывался предыдущий дроп с результатами поиска
        Store.setState("searchedUser", []);
    }

    setInitialProps = ()=>{
        this.debouncedSearch = debounce(this.searchUsers.bind(this), 500);

        const currentChat = Store.getState().activeChat as ChatData;
        if(!currentChat) return;

        this.setProps({
            data: {
                name: "",
                id: -1,
                chatId: currentChat.id
            },
            onInputEmit: this.searchHandler,
            dataListClickEmit: this.selectUser
        })
    }

    searchSubscribe = ()=>{
        //список пользователей с сервера
        const searchedUser = Store.getState().searchedUser as UserInfo[];
        if(!searchedUser || !Array.isArray(searchedUser)) return;

        //уже существующие пользователи в чате - всегда есть хотя бы сам Юзер? - нужно проверить
        const existedUser = Store.getState().ActiveChatsUsers as UserInfo[];
        if(!existedUser || !Array.isArray(existedUser)) return;

        //дропдаун куда вывести предлагемых пользователей
        const dataList = this.children.find(el=>el instanceof DataList);
        if(! dataList) return;

        //не предлагаем еще раз добавить уже существующих
        const idsToExclude = new Set(existedUser.map(item => item.id));
        const adaptedSearchedUser = searchedUser
            .filter(item => idsToExclude.has(item.id))
            .map(el=> {
                return {
                    value: el.id,
                    text: el.login
                }
        })

        //размещаем пользователей в дропе
        dataList.setProps({
            dataList: [...adaptedSearchedUser]
        })
    }

    searchHandler=(el: HTMLInputElement)=>{
        if (this.debouncedSearch) {
            this.debouncedSearch(el);
        }
    }

    searchUsers=(el: HTMLInputElement)=>{
        if(el.value.length > 0){
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
