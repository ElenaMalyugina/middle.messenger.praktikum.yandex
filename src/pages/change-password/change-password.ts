//import Handlebars from "handlebars";
//import profileChangePasswordForm from "/src/components/profile/profile-change-password-form/profile-change-password-form.hbs?raw";
import changePasswordTemplate from "/src/pages/change-password/change-password.hbs?raw";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfileChangePasswordBlock from "../../components/profile/profile-change-password-form/profile-change-password-block";

//Handlebars.registerPartial("profile-change-password-form", profileChangePasswordForm);

//export default Handlebars.compile(changePasswordTemplate)({})
registerComponent(ProfileChangePasswordBlock);

export default class ChangePassword extends Block{
    static componentName = 'ChangePassword';
    protected template = changePasswordTemplate;
}
