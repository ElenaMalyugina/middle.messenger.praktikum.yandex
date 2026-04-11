import "/src/components/chat/modal-contents/modal-contents.css";
import AddUserTemplate from "./add-user.hbs?raw";
import BaseUserForm from "../base-user/base-user-form";
import BaseUser from "../base-user/base-user";

export default class AddUser extends BaseUser{
    static componentName = 'AddUser';
    protected template = AddUserTemplate;

    protected events = {
        click: (e: Event)=>{
            const target = e.target as HTMLElement;
            if(!target) return;

            if(!(target instanceof HTMLInputElement)){
                const form = this.publicChildren.find((el=> el instanceof BaseUserForm))
                if(!form) return;
                form.hideDataList();
            }
        },
    }
}
