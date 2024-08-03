import Home from "~/pages/Home";
import Upload from "~/pages/Upload";
import Restore from "~/pages/Restore";
import Note from "~/pages/Note";
import LoginSuccess from "~/pages/LoginSuccess";

import AdminHome from "~/pages/Admin/AdminHome";
import AdminFeedback from "~/pages/Admin/Feedback";
import AdminManage from "~/pages/Admin/Manage";
import AdminSetting from "~/pages/Admin/Setting";
import AdminListUser from "~/pages/Admin/ListUser";

const PublicRouters = [
    // default layout
    { path: "/", component: Home },
    { path: "/upload", component: Upload },
    { path: "/restore", component: Restore },
    { path: "/:slug", component: Note },
    { path: "/login-success/:id", component: LoginSuccess },
];

const PrivateRouters = [
    //admin
    {
        path: "/admin",
        component: AdminHome,
    },
    {
        path: "/admin/feedback",
        component: AdminFeedback,
    },
    {
        path: "/admin/manageNotes",
        component: AdminManage,
    },
    {
        path: "/admin/settings",
        component: AdminSetting,
    },
    {
        path: "/admin/listUser",
        component: AdminListUser,
    },
];

export { PrivateRouters, PublicRouters };
