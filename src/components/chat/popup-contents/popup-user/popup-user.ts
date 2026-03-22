import Popup from "../../../../ui-units/popup/popup";
import PopupUserTemplate from "./popup-user.hbs?raw";

export default class PopupUser extends Popup{
    static componentName = 'PopupUser';
    protected template = PopupUserTemplate;

    protected componentDidMount(): void {
        this.dialogShow("#user-button", "#user-popup", "dots-button--active");
    }
}
