import Block from "../../../framework/Block";
import ProfileInfoBlockTemplate from "./profile-info.hbs?raw";

export default class ProfileInfoBlock extends Block {
    static componentName = 'ProfileInfoBlock';
    protected template = ProfileInfoBlockTemplate;


}
