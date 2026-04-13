import Store from "../../../../../framework/store/Store";
import type { AddDeleteUserFormProps } from "../../../../../types/addDeleteUser";
import type { UserInfo } from "../../../../../types/userInfo";
import BaseUserForm, { type actionType } from "../../base-user/base-user-form";
import AddUserFormTemplate from "./add-user-form.hbs?raw";

export default class AddUserForm extends BaseUserForm<AddDeleteUserFormProps>{
    static componentName = 'AddUserForm';
    protected template = AddUserFormTemplate;
    protected actionType: actionType = "add";

    constructor(props: AddDeleteUserFormProps){
        super(props);

        this.setInitialProps();

        Store.subscribe(()=>{
            this.searchSubscribe();

            this.errorFormHandler();
        })
    }

    searchUsers=(el: HTMLInputElement)=>{
        if(el.value.length > 0){
            this.chatUsersController.searchUsers(el.value)
        }

        const dataList = this.datalist;
        if(dataList){
            this.notFoundHandler(el.value)
        }
    }

    searchSubscribe = ()=>{
        //список пользователей с сервера
        const searchedUser = Store.getState().searchedUser as UserInfo[];
        if(!searchedUser || !Array.isArray(searchedUser)) return;

        //уже существующие пользователи в чате - всегда есть хотя бы сам Юзер? - нужно проверить
        const existedUser = Store.getState().ActiveChatsUsers as UserInfo[];
        if(!existedUser || !Array.isArray(existedUser)) return;

        //дропдаун куда вывести предлагемых пользователей
        const dataList = this.datalist;
        if(! dataList) return;

        //не предлагаем еще раз добавить уже существующих
        const idsToExclude = new Set(existedUser.map(item => item.id));

        const adaptedSearchedUser = searchedUser
            .filter(item => !idsToExclude.has(item.id))
            .map(el=> {
                return {
                    value: el.id,
                    text: el.login
                }
        });

        //размещаем пользователей в дропе
        dataList.setProps({
            dataList: [...adaptedSearchedUser]
        })
    }

}
