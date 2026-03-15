import Block, { type BlockOwnProps } from "../../../framework/Block";
import TextRowBlock from "../../../ui-units/row-blocks/text-row-block/text-row-block";
import ProfileInfoBlockTemplate from "./profile-info.hbs?raw";

interface ProfileInfoBlockProps extends Partial<BlockOwnProps>{
    tableRows: (Element | null)[];
}

const createTableRows = (): (Element | null)[]=> {
    return [
        new TextRowBlock({ label: "Почта", value: "pochta@yandex.ru"}).element(),
        new TextRowBlock({ label: "Логин", value: "ivanivanov"}).element(),
        new TextRowBlock({ label: "Имя", value: "Иван"}).element(),
        new TextRowBlock({ label: "Фамилия", value: "Иванов" }).element(),
        new TextRowBlock({ label: "Имя в чате", value: "Иван" }).element(),
        new TextRowBlock({ label: "Телефон", value: "+7 (909) 967 30 30"}).element()
    ];
}

export default class ProfileInfoBlock extends Block<Partial<ProfileInfoBlockProps>> {
    static componentName = 'ProfileInfoBlock';
    protected template = ProfileInfoBlockTemplate;

    constructor(props:ProfileInfoBlockProps){
        const completeProps = { ...props, tableRows: createTableRows()};
        super(completeProps);
    }
}
