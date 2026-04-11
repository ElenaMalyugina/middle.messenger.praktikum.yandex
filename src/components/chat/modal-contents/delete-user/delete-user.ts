import "/src/components/chat/modal-contents/modal-contents.css";
import DeleteUserTemplate from "./delete-user.hbs?raw";
import BaseUserForm from "../base-user/base-user-form";
import BaseUser from "../base-user/base-user";

export default class DeleteUser extends BaseUser{
    static componentName = 'DeleteUser';
    protected template = DeleteUserTemplate;

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
