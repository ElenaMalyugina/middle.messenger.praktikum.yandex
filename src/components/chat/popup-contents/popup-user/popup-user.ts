import Popup from "../../../../ui-units/popup/popup";
import PopupUserTemplate from "./popup-user.hbs?raw";

export default class PopupUser extends Popup{
    static componentName = 'PopupUser';
    protected template = PopupUserTemplate;

    protected componentDidMount(): void {
        this.popupShow("#user-button", "dots-button--active");
    }
}
