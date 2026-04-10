import type { FormProps } from "../ui-units/form/form";
import type { UserInfo } from "./userInfo";

export type typeContent = "add" | "delete";

export interface AddDeleteUserDataProps{
    name:string;
    id: number;
    chatId: number;
}

export interface AddDeleteUserFormProps extends FormProps{
    data: AddDeleteUserDataProps;
    searchedUsers: UserInfo[];
    actionType: typeContent;
    onInputEmit: (el:HTMLInputElement)=>void;
    onFocusEmit: (el:HTMLInputElement)=>void;
    onBlurEmit: (el:HTMLInputElement)=>void;
    dataListClickEmit: (el:HTMLInputElement)=>void;
}
