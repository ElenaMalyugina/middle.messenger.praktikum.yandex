import changePasswordTemplate from "/src/pages/change-password/change-password.hbs?raw";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfileChangePasswordBlock from "../../components/profile/profile-change-password-form/profile-change-password-block";

registerComponent(ProfileChangePasswordBlock);

export default class ChangePassword extends Block{
    static componentName = 'ChangePassword';
    protected template = changePasswordTemplate;
}
