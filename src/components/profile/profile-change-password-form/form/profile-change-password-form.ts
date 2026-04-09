import ChangePasswordController from "../../../../controllers/changePasswordController";
import Store from "../../../../framework/store/Store";
import type { ChangePassword } from "../../../../types/changePassword";
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

    constructor(props: ProfileChangePasswordFormProps){
        super(props);

        Store.subscribe(()=>{
            //если ошибка на бэке
            this.errorFormHandler();
        })
    }

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialData}
        })
    }

    protected submitForm = ()=>{
        this.changePasswordController.submitFormHandler(this);
    };
}
