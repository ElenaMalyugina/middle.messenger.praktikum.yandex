import Block from "../../../../framework/Block";
import PopupFilesTemplate from "./popup-files.hbs?raw";

export default class PopupFiles extends Block{
    static componentName = 'PopupFiles';
    protected template = PopupFilesTemplate;
}
