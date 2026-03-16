import "./profile-sidebar.css";
import Handlebars from "handlebars";
import ProfileSidebarTemplate from "./profile-sidebar.hbs?raw";

export default class ProfileSidebar{
    public static register=()=>(
        Handlebars.registerPartial("profile-sidebar", ProfileSidebarTemplate)
    )
}
