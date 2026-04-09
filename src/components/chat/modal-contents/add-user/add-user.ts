import "/src/components/chat/modal-contents/modal-contents.css";
import Block from "../../../../framework/Block";
import AddUserTemplate from "./add-user.hbs?raw";

export default class AddUser extends Block{
    static componentName = 'AddUser';
    protected template = AddUserTemplate;

}
