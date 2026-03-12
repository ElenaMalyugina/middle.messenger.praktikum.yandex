import Block from "./../../../framework/Block";
import NoMessageTemplate from "./no-messages.hbs?raw";

export default class NoMessages extends Block{
    static componentName = 'NoMessages';

    protected template = NoMessageTemplate;

}
