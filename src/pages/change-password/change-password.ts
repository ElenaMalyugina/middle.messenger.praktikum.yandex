import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";
import changePasswordTemplate from "/src/pages/change-password/change-password.hbs?raw";
import ProfileChangePasswordBlock from "../../components/profile/profile-change-password-form/profile-change-password-block";

ProfilePageLayout.register();
registerComponent(ProfileChangePasswordBlock);

export default class ChangePassword extends Block{
    static componentName = 'ChangePassword';
    protected template = changePasswordTemplate;
}
