import "/src/layouts/form-page/form-page-layout.css";
import Handlebars from "handlebars";
import Block from "./../../framework/Block";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import loginTemplate from "./login.hbs?raw";
import { tempSubmitHandler } from "../../framework/FormHandler";
import Form from "../../ui-units/form/form";
import InputBlock from "../../ui-units/row-blocks/input-block/input-block";
import Button from "../../ui-units/button/button";
import { replacePlaceholderToElement } from "../../framework/ReplacePlaceholder";

Handlebars.registerPartial("form-page-layout", formPageLayout);

export default class Login extends Block {
    static componentName = 'Login';
    protected template = loginTemplate;

    //Элементы формы
    private loginHTML = new InputBlock({ block:"login", type:"text", label:"Логин", name:"login" });
    private passwordHtml = new InputBlock({ block:"login", type:"password", label:"Пароль", name:"password"})
    private buttonHTML = new Button({ className:"button form-block__button", type:"submit", text:"Войти" });

    private form = new Form({
        className: 'form',
        action: '/',
        method: "POST",
        ref: "loginForm",
        blockChildren: [
            this.loginHTML,
            this.passwordHtml,
            this.buttonHTML
        ]
    });

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            tempSubmitHandler(this.form.publicRefs);
        },
    };

    constructor() {
        super()
        // Получаем корневой элемент компонента
        const componentElement = this.element();
        const formElement = this.form.element();
        if(!componentElement || !formElement){
            throw new Error("Нет корневого элемента Login или форма не создана")
        }

        // Заменяем плейсхолдер на DOM-элемент формы
        replacePlaceholderToElement(componentElement, '[[[form]]]', formElement);
    }
}
