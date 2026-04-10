import Store from "../../../../../framework/store/Store";
import type { AddDeleteUserFormProps } from "../../../../../types/addDeleteUser";
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
}
