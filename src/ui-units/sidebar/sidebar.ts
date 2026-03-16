import "./sidebar.css";
import Handlebars from "handlebars";
import SidebarTemplate from "./sidebar.hbs?raw";

export default class Sidebar{
    public static register=()=>(
        Handlebars.registerPartial("sidebar", SidebarTemplate)
    )
}
