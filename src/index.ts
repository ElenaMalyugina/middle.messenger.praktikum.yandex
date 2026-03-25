import "./style.css";
import "./svg-icons/svg-icons";
import "./ui-units/ui-units";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import Errors from "./pages/errors/errors";
import { getError } from "./pages/errors/errorsHelper";
import EditProfile from "./pages/edit-profile/edit-profile";
import ChangePassword from "./pages/change-password/change-password";

const entryNode = document.getElementById("app")!;
let compiledTemplate: string = "";
let compiledElement: Element | null = null;

//для демо роутинг
switch (window.location.pathname){
    case "/middle.messenger.praktikum.yandex/chat": compiledElement = new Chat({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/": compiledElement = new Chat({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/login": compiledElement = new Login({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/registration": compiledElement = new Registration({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/profile": compiledElement = new Profile({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/edit-profile": compiledElement = new EditProfile({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/change-password": compiledElement = new ChangePassword({}).element();
        break;
    case "/middle.messenger.praktikum.yandex/not-found": {
        const customError = getError(404);
        compiledElement = new Errors(customError).element();
        break;
    }
    case "/middle.messenger.praktikum.yandex/server-error": {
        const customError = getError(500);
        compiledElement = new Errors(customError).element();
        break;
    }

    default: {
        window.location.href = "/middle.messenger.praktikum.yandex/not-found";
    }
}


entryNode.innerHTML = compiledTemplate;

if(compiledElement){
    entryNode.appendChild(compiledElement);
}



