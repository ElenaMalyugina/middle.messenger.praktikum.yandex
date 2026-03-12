import Handlebars from "handlebars";
import input from "./input/input.hbs?raw";
import label from "./label/label.hbs?raw";
import textarea from "./textarea/textarea.hbs?raw";
import link from "./link/link.hbs?raw";
import button from "./button/button.hbs?raw";
import "./extended-button/extended-button.css";
import extendedButton from "./extended-button/extended-button.hbs?raw";
import img from "./img/img.hbs?raw";
import "./popup/popup.css";
import popup from "./popup/popup.hbs?raw";
import uploadFile from "./upload-file/upload-file.hbs?raw";
import form from "./form/form.hbs?raw";

import { registerComponent } from '../framework/RegisterComponent';
import Input from "./input/input";
import Label from "./label/label";



export const customInput = Handlebars.registerPartial("custom-input", input);
export const customLabel = Handlebars.registerPartial("custom-label", label);
export const customUploadFile = Handlebars.registerPartial("upload-file", uploadFile);
export const customTextarea = Handlebars.registerPartial("custom-textarea", textarea);
export const customLink = Handlebars.registerPartial("custom-link", link);
export const customButton = Handlebars.registerPartial("custom-button", button);
export const customExtendedButton = Handlebars.registerPartial("extended-button", extendedButton);
export const customImg = Handlebars.registerPartial("custom-img", img);
export const customPopup = Handlebars.registerPartial("custom-popup", popup);
export const customForm = Handlebars.registerPartial("custom-form", form);

registerComponent(Input);
registerComponent(Label);




