import Block from "../../../framework/Block";
import { registerComponent } from "../../../framework/RegisterComponent";
import ProfileChangePasswordForm from "./partials/profile-change-password-form";
import ProfileChangePasswordBlockTemplate from "./profile-change-password-block.hbs?raw";

registerComponent(ProfileChangePasswordForm);

export default class ProfileChangePasswordBlock extends Block {
    static componentName = "ProfileChangePasswordBlock";
    protected template = ProfileChangePasswordBlockTemplate;
}
