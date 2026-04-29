import Store from "../../../../../framework/store/Store";
import { UserService } from "../../../../../services/userService";
import type { AddDeleteUserFormProps } from "../../../../../types/addDeleteUser";
import type { UserInfo } from "../../../../../types/userInfo";
import BaseUserForm, { type actionType } from "../../base-user/base-user-form";
import DeleteUserFormTemplate from "./delete-user-form.hbs?raw";

export default class DeleteUserForm extends BaseUserForm<AddDeleteUserFormProps>{
    static componentName = 'DeleteUserForm';
    protected template = DeleteUserFormTemplate;
    protected actionType: actionType = "delete";

    constructor(props: AddDeleteUserFormProps){
        super(props);

        this.setInitialProps();

        Store.subscribe(()=>{
            this.searchSubscribe();

            this.errorFormHandler();
        })
    }

    searchUsers=(el: HTMLInputElement)=>{
        const dataList = this.datalist;
        if(dataList){
            this.notFoundHandler(el.value)
        }
    }

    searchSubscribe = ()=>{
        //уже существующие пользователи в чате
        const existedUser = Store.getState().ActiveChatsUsers as UserInfo[];
        if(!existedUser || !Array.isArray(existedUser)) return;

        const currentUserId = UserService.getCurrentUser();

        //дропдаун куда вывести предлагемых пользователей
        const dataList = this.datalist;
        if(! dataList) return;

        const adaptedSearchedUser = existedUser
            .filter(el=> el.id !== currentUserId )
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
