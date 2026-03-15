import "/src/layouts/profile-page/profile-page-layout.css";
import Handlebars from "handlebars";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfilePageLayoutTemplate from "./profile-page-layout.hbs?raw";
import ProfileAvatar from "../../components/profile/profile-avatar/profile-avatar";

registerComponent(ProfileAvatar);

export default class ProfilePageLayout{
    public static register=()=>(
        Handlebars.registerPartial("profile-page-layout", ProfilePageLayoutTemplate)
    )
}
