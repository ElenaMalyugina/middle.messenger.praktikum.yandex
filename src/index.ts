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

//для демо роутинг
switch (window.location.pathname){
    case "/chat": compiledTemplate = Chat;
        break;
    case "/": compiledTemplate = Chat;
        break;
    case "/login": compiledTemplate = Login;
        break;
    case "/registration": compiledTemplate = Registration;
        break;
    case "/profile": compiledTemplate = Profile;
        break;
    case "/edit-profile": compiledTemplate = EditProfile;
        break;
     case "/change-password": compiledTemplate = ChangePassword;
        break;
    case "/not-found": {
        const customError = getError(404);
        compiledTemplate = errors(customError);
        break;
    }
    case "/server-error": {
        const customError = getError(500);
        compiledTemplate = errors(customError);
        break;
    }


    default: {
        window.location.href = "/not-found";
    }
}

entryNode.innerHTML = compiledTemplate;

//для демо
document.addEventListener("submit", (e)=>{
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    window.location.href = target.getAttribute("action") || "/";
})

