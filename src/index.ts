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
    case "/chat": compiledElement = new Chat({}).element();
        break;
    case "/": compiledElement = new Chat({}).element();
        break;
    case "/login": compiledElement = new Login({}).element();
        break;
    case "/registration": compiledElement = new Registration({}).element();
        break;
    case "/profile": compiledElement = new Profile({}).element();
        break;
    case "/edit-profile": compiledElement = new EditProfile({}).element();
        break;
     case "/change-password": compiledElement = new ChangePassword({}).element();
        break;
    case "/not-found": {
        const customError = getError(404);
        compiledElement = new Errors(customError).element();
        break;
    }
    case "/server-error": {
        const customError = getError(500);
        compiledElement = new Errors(customError).element();
        break;
    }

    default: {
        window.location.href = "/not-found";
    }
}


entryNode.innerHTML = compiledTemplate;

if(compiledElement){
    entryNode.appendChild(compiledElement);
}


//для демо
document.addEventListener("submit", (e)=>{
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    window.location.href = target.getAttribute("action") || "/";
})

