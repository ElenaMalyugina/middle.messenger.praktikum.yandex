import "./style.css";
import "./svg-icons/svg-icons";
import "./ui-units/ui-units";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import errors from "./pages/errors/errors";
import { getError } from "./pages/errors/errorsHelper";
import EditProfile from "./pages/edit-profile/edit-profile";
import ChangePassword from "./pages/change-password/change-password";

const entryNode = document.getElementById("app")!;
let compiledTemplate = "";

const baseUrl = process.env.NODE_ENV === 'production' ? '/middle.messenger.praktikum.yandex' : '';

console.log('Режим работы:', process.env.NODE_ENV);

//для демо роутинг
switch (window.location.pathname){
    case `${baseUrl}/chat`: compiledTemplate = Chat;
        break;
    case `${baseUrl}/`: compiledTemplate = Chat;
        break;
    case `${baseUrl}/login`: compiledTemplate = Login;
        break;
    case `${baseUrl}/registration`: compiledTemplate = Registration;
        break;
    case `${baseUrl}/profile`: compiledTemplate = Profile;
        break;
    case `${baseUrl}/edit-profile`: compiledTemplate = EditProfile;
        break;
    case `${baseUrl}/change-password`: compiledTemplate = ChangePassword;
        break;
    case `${baseUrl}/not-found`: {
        const customError = getError(404);
        compiledTemplate = errors(customError);
        break;
    }
    case `/server-error`: {
        const customError = getError(500);
        compiledTemplate = errors(customError);
        break;
    }

    default: {
        window.location.href = `${baseUrl}/not-found`;
    }
}

entryNode.innerHTML = compiledTemplate;

//для демо
document.addEventListener("submit", (e)=>{
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    window.location.href = target.getAttribute("action") || "/";
})

