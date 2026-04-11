import "./sidebar/sidebar.css";
import "./avatar/avatar.css";
import Handlebars from "handlebars";
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
import TextRowBlock from "./row-blocks/text-row-block/text-row-block";
import TextRowEditable from "./row-blocks/text-row-editable/text-row-editable";
import UploadFile from "./upload-file/upload-file";
import TextareaBlock from './row-blocks/textarea-block/textarea-block';
import Popup from "./popup/popup";
import Modal from "./modal/modal";
import FileInput from "./file-input/file-input";
import DataList from "./datalist/datalist";
import Loader from "./loader/loader";

//склейка строк
Handlebars.registerHelper('concat', function() {
  return Array.prototype.slice.call(arguments, 0, -1).join('');
});

Handlebars.registerHelper('renderIcon', function(partialName) {
    // Проверяем существование partial
    if (!Handlebars.partials[partialName]) {
        console.warn(`Partial "${partialName}" не найден`);
    }

    // Компилируем и рендерим partial
    const html = Handlebars.partials[partialName];
    return html;
});

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
registerComponent(TextareaBlock);
registerComponent(Popup);
registerComponent(Modal);
registerComponent(UploadFile);
registerComponent(FileInput);
registerComponent(DataList);
registerComponent(Loader);
