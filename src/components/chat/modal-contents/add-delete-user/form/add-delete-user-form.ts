import Form, { type FormProps } from "../../../../../ui-units/form/form";
import AddDeleteUserFormTemplate from "./add-delete-user-form.hbs?raw";

interface AddDeleteUser{
    name: string;
}

interface AddDeleteUserProps extends FormProps{
    title: string,
    action: string,
    buttonText: string;
    data: AddDeleteUser;
}

export default class AddDeleteUserForm extends Form<AddDeleteUserProps>{
    static componentName = 'AddDeleteUserForm';
    protected template = AddDeleteUserFormTemplate;

    constructor(props:AddDeleteUserProps){
        super(props)
    }

    protected componentDidMount(): void {
        this.setProps({
            data:{
                name: ""
            }
        })
    }

}
