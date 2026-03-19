import Form, { type FormProps } from "../../../../../ui-units/form/form";
import AddDeleteUserFormTemplate from "./add-delete-user-form.hbs?raw";

interface AddDeleteUser extends FormProps{
    title: string,
    action: string,
    buttonText: string
}

export default class AddDeleteUserForm extends Form<AddDeleteUser>{
    static componentName = 'AddDeleteUserForm';
    protected template = AddDeleteUserFormTemplate;

    constructor(props:AddDeleteUser){
        super(props)
    }

}
