import Handlebars from "handlebars";
import imageIcon from "./image-icon.hbs?raw";
import fileIcon from "./file-icon.hbs?raw";
import locationIcon from "./location-icon.hbs?raw";
import addUserIcon from "./add-user-icon.hbs?raw";
import deleteUserIcon from "./delete-user-icon.hbs?raw";

export const customImageIcon= Handlebars.registerPartial("image-icon", imageIcon);
export const customFileIcon= Handlebars.registerPartial("file-icon", fileIcon);
export const customLocationIcon= Handlebars.registerPartial("location-icon", locationIcon);
export const customAddUserIcon= Handlebars.registerPartial("add-user-icon", addUserIcon);
export const customDeleteUserIcon= Handlebars.registerPartial("delete-user-icon", deleteUserIcon);
