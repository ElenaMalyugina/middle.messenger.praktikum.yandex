import "/src/components/profile/profile-sidebar/profile-sidebar.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";
import ProfileInfoFormBlock from "../../components/profile/profile-info-form/profile-info-form-block";
import editProfileTemplate from "/src/pages/edit-profile/edit-profile.hbs?raw";
import ProfileController from "../../controllers/profileController";

ProfilePageLayout.register();
registerComponent(ProfileInfoFormBlock);

export default class EditProfile extends Block<BlockOwnProps>{
    static componentName = 'EditProfile';
    protected template = editProfileTemplate;
    private profileController = new ProfileController();

    constructor(props: BlockOwnProps){
        super(props)

        this.profileController.getUserInfo();
    }

}
