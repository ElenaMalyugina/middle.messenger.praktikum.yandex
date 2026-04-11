import Store from "../../../../../framework/store/Store";
import type { AddDeleteUserFormProps } from "../../../../../types/addDeleteUser";
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
}
