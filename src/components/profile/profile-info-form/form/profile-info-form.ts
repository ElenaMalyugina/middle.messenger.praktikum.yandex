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
            const userData = Store.getState();
            this.setProps({data: userData.userData as UserInfo})

            this.errorFormHandler();
        })
    }

    protected submitForm = ()=>{
        this.profileController.submitFormHandler(this);
    };
}
