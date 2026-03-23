import Form, { type FormProps } from "../../../../../ui-units/form/form";
import AddDeleteUserFormTemplate from "./add-delete-user-form.hbs?raw";

interface AddDeleteUserDataProps{
    name:string
}

interface AddDeleteUserFormProps extends FormProps{
    data: AddDeleteUserDataProps;
    buttonText: string;
    formSettings: Partial<FormProps>;
}

export default class AddDeleteUserForm extends Form<AddDeleteUserFormProps>{
    static componentName = 'AddDeleteUserForm';
    protected template = AddDeleteUserFormTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data: {
                name: ""
            },
            action: this.props.formSettings?.action || "",
            buttonText: this.props.buttonText
        })
    }

}
