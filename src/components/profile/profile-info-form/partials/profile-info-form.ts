import Form from "../../../../ui-units/form/form";
import TextRowEditable from "../../../../ui-units/row-blocks/text-row-editable/text-row-editable";
import ProfileInfoFormTemplate from "./profile-info-form.hbs?raw";


export default class ProfileInfoForm extends Form {
    static componentName = 'ProfileInfoForm';
    protected template = ProfileInfoFormTemplate;

    private emailBlockHtml = new TextRowEditable({label:"Почта", value:"pochta@yandex.ru",  name:"email"}).element();
    private loginBlockHtml= new TextRowEditable({label:"Логин", value:"ivanivanov", name:"login"}).element();
    private firstNameBlockHtml = new TextRowEditable({label:"Имя", value:"Иван",  name:"first_name"}).element();
    private lastNameBlockHtml = new TextRowEditable({label:"Фамилия", value:"Иванов", name:"second_name"}).element();
    private displayNameBlockHtml = new TextRowEditable({label:"Имя в чате", value:"Иван", name:"display_name"}).element();
    private phoneBlockHtml = new TextRowEditable({label:"Телефон", value:"+7 (909) 967 30 30", name:"phone"}).element();

    constructor(){
        super()
    }

    protected componentDidMount(): void {
        const form = this.refs["table"];

        [this.emailBlockHtml, this.loginBlockHtml, this.firstNameBlockHtml,
            this.lastNameBlockHtml, this.displayNameBlockHtml, this.phoneBlockHtml ].forEach(el=>{
            form.appendChild(el);
        })





    }
}
