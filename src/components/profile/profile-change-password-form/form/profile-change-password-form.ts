import ChangePasswordController from "../../../../controllers/changePasswordController";
import Store from "../../../../framework/store/Store";
import type { ChangePassword } from "../../../../types/changePassword";
import ErrorMessage from "../../../../ui-units/error-message/error-message";
import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileChangePasswordFormTemplate from "./profile-change-password-form.hbs?raw";

const initialData: ChangePassword ={
    oldPassword: "",
    newPassword: "",
    repeat_new_password: ""
}

interface ProfileChangePasswordFormProps extends FormProps{
    data: ChangePassword;
}

export default class ProfileChangePasswordForm extends Form<ProfileChangePasswordFormProps> {
    static componentName = 'ProfileChangePasswordForm';
    protected template = ProfileChangePasswordFormTemplate;
    private changePasswordController = new ChangePasswordController();

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialData}
        })

        Store.subscribe(()=>{
            //если ошибка на бэке
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            const serverError = Store.getState();
            errorMessageBlock.setProps({ message: serverError.changePasswordError as string })
        })

    }

    protected submitForm = ()=>{
        this.changePasswordController.submitFormHandler(this)
    };
}
