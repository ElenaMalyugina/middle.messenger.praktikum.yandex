import Popup from "../../../../ui-units/popup/popup";
import PopupFilesTemplate from "./popup-files.hbs?raw";

export default class PopupFiles extends Popup{
    static componentName = 'PopupFiles';
    protected template = PopupFilesTemplate;
}
