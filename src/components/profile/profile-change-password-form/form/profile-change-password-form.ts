import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileChangePasswordFormTemplate from "./profile-change-password-form.hbs?raw";

const mockData: ChangePassword ={
    old_password: "",
    new_password: "",
    repeat_new_password: ""
}

interface ChangePassword{
    old_password: string;
    new_password: string;
    repeat_new_password: string;
}

interface ProfileChangePasswordFormProps extends FormProps{
    data: ChangePassword;
}

export default class ProfileChangePasswordForm extends Form<ProfileChangePasswordFormProps> {
    static componentName = 'ProfileChangePasswordForm';
    protected template = ProfileChangePasswordFormTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data: {...mockData}
        })
    }
}
