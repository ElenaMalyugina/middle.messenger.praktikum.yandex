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
import Router from "./framework/router/Router";

const router = Router.getInstance("#app");

router
    .use("/", Chat, {})
    .use("/chat", Chat, {})
    .use("/login", Login, {})
    .use("/registration", Registration, {})
    .use("/profile", Profile, {})
    .use("/edit-profile", EditProfile, {})
    .use("/change-password", ChangePassword, {})
    .use("/server-error", Errors, getError(500))
    .use("/not-found", Errors, getError(404))
    .use("*", Errors, getError(404))
    .start();



