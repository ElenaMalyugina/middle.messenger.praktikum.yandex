import Handlebars from "handlebars";
import profileChangePasswordForm from "/src/components/profile/profile-change-password-form/profile-change-password-form.hbs?raw";
import changePasswordTemplate from "/src/pages/change-password/change-password.hbs?raw";
import Block from "../../framework/Block";

Handlebars.registerPartial("profile-change-password-form", profileChangePasswordForm);

//export default Handlebars.compile(changePasswordTemplate)({})

class ChangePassword extends Block{
    static componentName = 'ChangePassword';
    protected template = changePasswordTemplate;
}

export default ChangePassword;
