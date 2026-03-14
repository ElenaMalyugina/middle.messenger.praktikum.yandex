import Block from "../../../framework/Block";
import { registerComponent } from "../../../framework/RegisterComponent";
import ProfileInfoForm from "./partials/profile-info-form";
import ProfileInfoFormBlockTemplate from "./profile-info-form-block.hbs?raw";

registerComponent(ProfileInfoForm);

export default class ProfileInfoFormBlock extends Block {
    static componentName = 'ProfileInfoFormBlock';
    protected template = ProfileInfoFormBlockTemplate;
}
