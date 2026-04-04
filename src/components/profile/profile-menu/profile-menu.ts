import "./profile-menu.css";
import Block from "../../../framework/Block";
import ProfileMenuTemplate from "./profile-menu.hbs?raw";
import LoginController from "../../../controllers/loginFormController";

export default class ProfileMenu extends Block {
    static componentName = 'ProfileMenu';
    protected template = ProfileMenuTemplate;
    private loginController = new LoginController();

    protected events={
        click: (event: Event) => {
            const target= event.target;
            const logout = this.refs["logout"];

            if(target === logout){
                event.preventDefault()
                this.loginController.logout()
            }
        }
    }
}
