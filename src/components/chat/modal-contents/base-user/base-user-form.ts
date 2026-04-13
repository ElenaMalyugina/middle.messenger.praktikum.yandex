import ChatUsersController from "../../../../controllers/chatUsersController";
import Store from "../../../../framework/store/Store";
import type { AddDeleteUserFormProps } from "../../../../types/addDeleteUser";
import type { ChatData } from "../../../../types/chatData";
import type { UserInfo } from "../../../../types/userInfo";
import DataList, { notFoundText } from "../../../../ui-units/datalist/datalist";
import Form from "../../../../ui-units/form/form";
import { debounce } from "../../../../utils/debounce";

export type actionType = "add" | "delete";

export default abstract class BaseUserForm <T extends AddDeleteUserFormProps = AddDeleteUserFormProps> extends Form<AddDeleteUserFormProps>{
    protected chatUsersController = new ChatUsersController();
    protected debouncedSearch: ((el: HTMLInputElement) => void) | null = null;
    protected abstract actionType: actionType;
    protected abstract searchUsers: (el: HTMLInputElement)=>void;
    protected abstract searchSubscribe: ()=>void;

    protected get datalist(){
        //дропдаун куда вывести предлагемых пользователей
        //!!!! Если свойства даталиста менять не как его собственные,
        //а прокидыванием сверху - будет размонтирование формы из дом и проблемы с валидацией и отправкой
        return this.children.find(el=>el instanceof DataList) || null;
    }

    constructor(props: T){
        super(props);
        //чтобы при закрытии окна, а потом новом открытии не показывался предыдущий дроп с результатами поиска
        Store.setState("searchedUser", []);
        Store.setState("addUserError", "");
    }

    notFoundHandler = (typesStr: string)=>{
        const dataList = this.datalist;
        if(! dataList) return;

        if(!typesStr || typesStr.length == 0){
            dataList.setProps({notFoundText: notFoundText.start})
        }
        else{
            dataList.setProps({notFoundText: notFoundText.search})
        }
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
            onFocusEmit: this.focusEmitHandler,
            dataListClickEmit: this.selectUser,
            actionType: this.props.actionType
        })
    }

    focusEmitHandler = (el: HTMLInputElement) =>{
        this.openDataList();
        const id = el.getAttribute("id");

        if(!id){
            console.warn("Рекомендуется назначить id");
            return;
        }

        document.getElementById(id)?.focus()
    }

    openDataList = ()=>{
        //дропдаун куда вывести предлагемых пользователей
        const dataList = this.datalist;
        if(! dataList) return;
        dataList.setProps({dataListActive: true})
    }

    hideDataList = ()=>{
        //дропдаун куда вывести предлагемых пользователей
        const dataList = this.datalist;
        if(! dataList) return;

        dataList.setProps({dataListActive: false})
    }


    searchHandler=(el: HTMLInputElement)=>{
        if (this.debouncedSearch) {
            this.debouncedSearch(el);
        }
    }

    selectUser=(el: HTMLInputElement)=>{
        const userId = el.getAttribute("data-value");
        const userName = el.getAttribute("data-text");

        //чистим, чтобы не было ситуации, что набирали - выбрали - частично стерли - вернули - выбрали - а в инпуте не поменялось
        this.setProps({
            data: {
                chatId: this.props.data.chatId,
                id: -1,
                name: ""
            }
        });

        let id = -1;
        if (userId !== null) {
            const parsedId = parseInt(userId, 10);
            if (!isNaN(parsedId)) {
                id = parsedId;
            }
        }

        const finalUserName = userName || "";

        this.setProps({
            data: {
                chatId: this.props.data.chatId,
                id: id,
                name: finalUserName
            }
        });

        this.hideDataList();
    }

    protected submitForm=(form: Form)=>{
        this.chatUsersController.submitFormHandler(form);
    };
}
