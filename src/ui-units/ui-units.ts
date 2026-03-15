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
import ErrorMessage from "./error-message/error-message";
import Table from "./table/table";
import TextRowBlock from "./row-blocks/text-row-block/text-row-block";
import TextRowEditable from "./row-blocks/text-row-editable/text-row-editable";

export const customUploadFile = Handlebars.registerPartial("upload-file", uploadFile);
export const customExtendedButton = Handlebars.registerPartial("extended-button", extendedButton);
export const customPopup = Handlebars.registerPartial("custom-popup", popup);

registerComponent(Table);
registerComponent(Form);
registerComponent(Input);
registerComponent(Textarea);
registerComponent(Label);
registerComponent(InputBlock);
registerComponent(ErrorMessage);
registerComponent(TextRowBlock);
registerComponent(TextRowEditable);
registerComponent(Button);
registerComponent(Link);
registerComponent(Img);






