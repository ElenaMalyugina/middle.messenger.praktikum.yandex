import "/src/ui-units/row-blocks/text-row-editable/text-row-editable.css";
import "/src/layouts/profile-page/profile-page-layout.css";
import "/src/components/profile/profile-sidebar/profile-sidebar.css";
import "/src/components/profile/profile-avatar/profile-avatar.css";
import "/src/components/profile/profile-menu/profile-menu.css";
import Handlebars from "handlebars";
import textRowEditableTemplate from "/src/ui-units/row-blocks/text-row-editable/text-row-editable.hbs?raw";
import profilePageLayout from "/src/layouts/profile-page/profile-page-layout.hbs?raw";
import sidebarTemplate from "/src/components/sidebar/sidebar.hbs?raw";
import profileSidebarTemplate from "/src/components/profile/profile-sidebar/profile-sidebar.hbs?raw";
import profileAvatarTemplate from "/src/components/profile/profile-avatar/profile-avatar.hbs?raw";
import profileInfoFormTemplate from "/src/components/profile/profile-info-form/partials/profile-info-form.hbs?raw";
import editProfileTemplate from "/src/pages/edit-profile/edit-profile.hbs?raw";
import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import ProfileInfoFormBlock from "../../components/profile/profile-info-form/profile-info-form-block";
import ProfileInfoForm from "../../components/profile/profile-info-form/partials/profile-info-form";

Handlebars.registerPartial("sidebar", sidebarTemplate);
Handlebars.registerPartial("profile-sidebar", profileSidebarTemplate);
Handlebars.registerPartial("profile-avatar", profileAvatarTemplate);
Handlebars.registerPartial("profile-info-form", profileInfoFormTemplate);
Handlebars.registerPartial("text-row-editable", textRowEditableTemplate);
Handlebars.registerPartial("profile-page-layout", profilePageLayout);

//const currentForm = "editProfileForm";
//export default Handlebars.compile(editProfileTemplate)({currentForm});

registerComponent(ProfileInfoFormBlock);

export default class EditProfile extends Block{
    static componentName = 'EditProfile';
    protected template = editProfileTemplate;
}
