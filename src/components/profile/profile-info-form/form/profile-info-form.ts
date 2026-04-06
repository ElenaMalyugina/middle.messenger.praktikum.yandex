import ProfileController from "../../../../controllers/profileController";
import Store from "../../../../framework/store/Store";
import type { UserInfo } from "../../../../types/userInfo";
import ErrorMessage from "../../../../ui-units/error-message/error-message";
import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileInfoFormTemplate from "./profile-info-form.hbs?raw";

interface ProfileInfoFormProps extends FormProps{
    data: UserInfo;
}

export default class ProfileInfoForm extends Form<ProfileInfoFormProps> {
    static componentName = 'ProfileInfoForm';
    protected template = ProfileInfoFormTemplate;
    private profileController = new ProfileController();

    protected componentDidMount(): void {
        Store.subscribe(()=>{
            this.updateForm();
            this.errorFormHandler();
        })
    }

    protected updateForm = ()=>{
        const userData = Store.getState().userData;
        if(!userData) return;
        this.setProps({data: userData as UserInfo})
    }

    protected submitForm = ()=>{
        this.profileController.submitFormHandler(this);
    };
}
