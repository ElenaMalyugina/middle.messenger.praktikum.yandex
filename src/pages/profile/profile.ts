import "./profile.css";
import "/src/components/profile/profile-sidebar/profile-sidebar.css";
import "/src/components/profile/profile-avatar/profile-avatar.css";

import Handlebars from "handlebars";
import sidebarTemplate from "/src/components/sidebar/sidebar.hbs?raw";
import profileSidebarTemplate from "/src/components/profile/profile-sidebar/profile-sidebar.hbs?raw";
import profileAvatarTemplate from "/src/components/profile/profile-avatar/profile-avatar.hbs?raw";
import profileTemplate from "/src/pages/profile/profile.hbs?raw";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfileInfoBlock from "../../components/profile/profile-info/profile-info";
import ProfileMenu from "../../components/profile/profile-menu/profile-menu";
import ProfilePageLayout from "../../layouts/profile-page/profile-page-layout";

Handlebars.registerPartial("sidebar", sidebarTemplate);
Handlebars.registerPartial("profile-sidebar", profileSidebarTemplate);
Handlebars.registerPartial("profile-avatar", profileAvatarTemplate);

ProfilePageLayout.register();

registerComponent(ProfileInfoBlock);
registerComponent(ProfileMenu);

export default class Profile extends Block{
    static componentName = 'Profile';
    protected template = profileTemplate;
}
