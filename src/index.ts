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

//чтобы при логауте не показать случайно страницу предыдущего пользователя - mode: "clean"
//лучший вариант, конечно, при логауте перезагружать страницу, но не знаю, насколько это совместимо с целями спринта

router
    .use("/", Login, {}, {guards: ["AllowedNoLoginMiddleware"], mode: "clean"})
    .use("/messenger", Chat, {}, {guards: ["AuthGuard"], mode: "clean"})
    .use("/sign-up", Registration, {}, {mode: "clean"})
    .use("/settings", Profile, {}, {guards: ["AuthGuard"], mode: "clean"})
    .use("/settings/edit-profile", EditProfile, {}, {guards: ["AuthGuard"], mode: "clean"})
    .use("/settings/change-password", ChangePassword, {}, {guards: ["AuthGuard"], mode: "clean"})
    .use("/500", Errors, getError(500))
    .use("/404", Errors, getError(404))
    .start();



