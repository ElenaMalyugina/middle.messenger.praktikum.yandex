import "./profile.css";
import profileTemplate from "/src/pages/profile/profile.hbs?raw";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfileInfoBlock from "../../components/profile/profile-info/profile-info";
import ProfileMenu from "../../components/profile/profile-menu/profile-menu";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";

ProfilePageLayout.register();

registerComponent(ProfileInfoBlock);
registerComponent(ProfileMenu);

export default class Profile extends Block{
    static componentName = 'Profile';
    protected template = profileTemplate;
}
