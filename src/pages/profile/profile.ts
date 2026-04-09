import "./profile.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import profileTemplate from "/src/pages/profile/profile.hbs?raw";
import ProfileInfoBlock from "../../components/profile/profile-info/profile-info";
import ProfileMenu from "../../components/profile/profile-menu/profile-menu";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";
import ProfileController from "../../controllers/profileController";

ProfilePageLayout.register();

registerComponent(ProfileInfoBlock);
registerComponent(ProfileMenu);

export default class Profile extends Block<BlockOwnProps>{
    static componentName = 'Profile';
    protected template = profileTemplate;
    private profileController = new ProfileController();

    constructor(props:BlockOwnProps ){
        super(props)
        this.profileController.getUserInfo();
    }

}
