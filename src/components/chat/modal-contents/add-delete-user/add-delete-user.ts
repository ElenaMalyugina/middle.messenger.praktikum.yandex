import "/src/components/chat/modal-contents/modal-contents.css";
import Block, { type BlockOwnProps } from "../../../../framework/Block";
import type { FormProps } from "../../../../ui-units/form/form";
import AddDeleteUserTemplate from "./add-delete-user.hbs?raw";

export type typeContent = "add" | "delete";

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
    type?: typeContent;
}

export default class AddDeleteUser extends Block<AddDeleteUserProps>{
    static componentName = 'AddDeleteUser';
    protected template = AddDeleteUserTemplate;

    constructor(props: Partial<AddDeleteUserProps>) {
        super(props as AddDeleteUserProps);

        const { type } = props;
        let defaultSettings: Partial<AddDeleteUserProps> = {};

        if (type === "add") {
            defaultSettings = modalAddUser;
        }
        else if (type === "delete") {
            defaultSettings = modalDeleteUser;
        }

        this.props = {
            ...defaultSettings,
            ...props
        } as AddDeleteUserProps;
    }

}
