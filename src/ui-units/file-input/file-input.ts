import Block, { type BlockOwnProps } from "../../framework/Block";
import FileInputTemplate from "./file-input.hbs?raw";

interface FileInputProps extends BlockOwnProps{
    onChange: (file: File)=>void;
}

export default class FileInput extends Block<FileInputProps>{
    static componentName = 'FileInput';
    protected template = FileInputTemplate;

    protected events ={
        change: ()=>{
            const input = this.refs["inputFile"] as HTMLInputElement;

            if(input.files && input.files.length ){
                this.props.onChange(input.files[0]);
            }
        }
    }
}
