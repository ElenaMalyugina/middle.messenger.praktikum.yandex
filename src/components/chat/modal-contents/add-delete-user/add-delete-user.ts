import Block, { type BlockOwnProps } from "../../../../framework/Block";
import type { FormProps } from "../../../../ui-units/form/form";
import AddDeleteUserTemplate from "./add-delete-user.hbs?raw";

//настройки для модалок
const modalAddUser = {
    title: "Добавить пользователя",
    action: "/chat",
    buttonText: "Добавить",
    formSettings:{
        action: "/add"
    }
}
const modalDeleteUser = {
    title: "Удалить пользователя",
    buttonText: "Удалить",
    formSettings:{
        action: "/delete"
    }
}

export interface AddDeleteUserProps extends BlockOwnProps{
    title: string,
    buttonText: string;
    formSettings: Partial<FormProps>;
}

export default class AddDeleteUser extends Block<AddDeleteUserProps>{
    static componentName = 'AddDeleteUser';
    protected template = AddDeleteUserTemplate;
}
