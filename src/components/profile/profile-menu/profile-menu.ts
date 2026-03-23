import "./profile-menu.css";
import Block from "../../../framework/Block";
import ProfileMenuTemplate from "./profile-menu.hbs?raw";

export default class ProfileMenu extends Block {
    static componentName = 'ProfileMenu';
    protected template = ProfileMenuTemplate;
}
