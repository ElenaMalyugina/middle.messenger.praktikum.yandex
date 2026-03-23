import "/src/components/profile/profile-sidebar/profile-sidebar.css";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";
import ProfileInfoFormBlock from "../../components/profile/profile-info-form/profile-info-form-block";
import editProfileTemplate from "/src/pages/edit-profile/edit-profile.hbs?raw";

ProfilePageLayout.register();
registerComponent(ProfileInfoFormBlock);

export default class EditProfile extends Block{
    static componentName = 'EditProfile';
    protected template = editProfileTemplate;
}
