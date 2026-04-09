import "/src/components/chat/modal-contents/modal-contents.css";
import Block from "../../../../framework/Block";
import DeleteUserTemplate from "./delete-user.hbs?raw";

export default class DeleteUser extends Block{
    static componentName = 'DeleteUser';
    protected template = DeleteUserTemplate;

}
