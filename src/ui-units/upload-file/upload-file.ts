import UploadFileTemplate from "./upload-file.hbs?raw";
import Block, { type BlockOwnProps } from "../../framework/Block";

interface UploadFileProps extends BlockOwnProps{
    className: string;
    name: string;
    icon: string;
    title: string;
    text: string;
    currentForm: string;
}

export default class UploadFile extends Block<UploadFileProps>{
    static componentName="UploadFile";
    protected template= UploadFileTemplate;


}
