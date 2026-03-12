import "./profile.css";
import "/src/components/row-blocks/text-row-block/text-row-block.css";
import "/src/layouts/profile-page/profile-page-layout.css";
import "/src/components/profile/profile-sidebar/profile-sidebar.css";
import "/src/components/profile/profile-avatar/profile-avatar.css";
import "/src/components/profile/profile-menu/profile-menu.css";
import Handlebars from "handlebars";
import textRowBlockTemplate from "/src/components/row-blocks/text-row-block/text-row-block.hbs?raw";
import profilePageLayout from "/src/layouts/profile-page/profile-page-layout.hbs?raw";
import sidebarTemplate from "/src/components/sidebar/sidebar.hbs?raw";
import profileSidebarTemplate from "/src/components/profile/profile-sidebar/profile-sidebar.hbs?raw";
import profileAvatarTemplate from "/src/components/profile/profile-avatar/profile-avatar.hbs?raw";
import profileInfoTemplate from "/src/components/profile/profile-info/profile-info.hbs?raw";
import profileMenuTemplate from "/src/components/profile/profile-menu/profile-menu.hbs?raw";
import profileTemplate from "/src/pages/profile/profile.hbs?raw";
import Block from "../../framework/Block";

Handlebars.registerPartial("sidebar", sidebarTemplate);
Handlebars.registerPartial("profile-sidebar", profileSidebarTemplate);
Handlebars.registerPartial("profile-avatar", profileAvatarTemplate);
Handlebars.registerPartial("profile-info", profileInfoTemplate);
Handlebars.registerPartial("profile-menu", profileMenuTemplate);
Handlebars.registerPartial("text-row-block", textRowBlockTemplate);
Handlebars.registerPartial("profile-page-layout", profilePageLayout);

//export default Handlebars.compile(profileTemplate)({});

class Profile extends Block{
    static componentName = 'Profile';
    protected template = profileTemplate;
}

export default Profile;
