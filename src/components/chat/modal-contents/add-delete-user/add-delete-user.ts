import Block from "../../../../framework/Block";
import AddDeleteUserTemplate from "./add-delete-user.hbs?raw";

export default class AddDeleteUser extends Block{
    static componentName = 'AddDeleteUser';
    protected template = AddDeleteUserTemplate;
}
