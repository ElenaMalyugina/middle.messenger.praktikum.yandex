import Handlebars from "handlebars";
import "./extended-button/extended-button.css";
import extendedButton from "./extended-button/extended-button.hbs?raw";
import "./popup/popup.css";
import popup from "./popup/popup.hbs?raw";
import uploadFile from "./upload-file/upload-file.hbs?raw";
//import form from "./form/form.hbs?raw";


import { registerComponent } from '../framework/RegisterComponent';
import Input from "./input/input";
import Label from "./label/label";
import InputBlock from "./row-blocks/input-block/input-block";
import Button from "./button/button";
import Link from "./link/link";
import Textarea from "./textarea/textarea";
import Img from "./img/img";
import Form from "./form/form";
import TextRowEditable from "./row-blocks/text-row-editable/text-row-editable";
import ErrorMessage from "./error-message/error-message";


//export const customInput = Handlebars.registerPartial("custom-input", input);
//export const customLabel = Handlebars.registerPartial("custom-label", label);
export const customUploadFile = Handlebars.registerPartial("upload-file", uploadFile);
//export const customTextarea = Handlebars.registerPartial("custom-textarea", textarea);
//export const customLink = Handlebars.registerPartial("custom-link", link);
//export const customButton = Handlebars.registerPartial("custom-button", button);
export const customExtendedButton = Handlebars.registerPartial("extended-button", extendedButton);
//export const customImg = Handlebars.registerPartial("custom-img", img);
export const customPopup = Handlebars.registerPartial("custom-popup", popup);
//export const Form = Handlebars.registerPartial("custom-form", form);

registerComponent(Form);
registerComponent(Input);
registerComponent(Textarea);
registerComponent(Label);
registerComponent(InputBlock);
registerComponent(ErrorMessage);
registerComponent(TextRowEditable);
registerComponent(Button);
registerComponent(Link);
registerComponent(Img);





