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
    .use("/", Login, {})
    .use("/messenger", Chat, {}, {guards: ["AuthGuard"]})
    .use("/sign-up", Registration, {})
    .use("/settings", Profile, {}, {guards: ["AuthGuard"]})
    .use("/edit-profile", EditProfile, {}, {guards: ["AuthGuard"]})
    .use("/change-password", ChangePassword, {}, {guards: ["AuthGuard"]})
    .use("/500", Errors, getError(500))
    .use("/404", Errors, getError(404))
    .start();



