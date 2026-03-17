import Block from "../../../../framework/Block";
import PopupUserTemplate from "./popup-user.hbs?raw";

export default class PopupUser extends Block{
    static componentName = 'PopupUser';
    protected template = PopupUserTemplate;
}
