import Handlebars from "handlebars";
import uploadFileTemplate from "./upload-file.hbs?raw";

export default class UploadFile{
    public static register=()=>(
        Handlebars.registerPartial("upload-file", uploadFileTemplate)
    )
}
