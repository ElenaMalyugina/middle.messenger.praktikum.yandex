import "/src/components/chat/modal-contents/modal-contents.css";
import Block from "../../../../framework/Block";
import BaseUserForm from "../base-user/base-user-form";

export default abstract class BaseUser extends Block{

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
