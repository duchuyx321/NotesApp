import { jwtDecode } from "jwt-decode";

import Home from "~/pages/Home";
import Upload from "~/pages/Upload";
import Restore from "~/pages/Restore";
import Note from "~/pages/Note";
import LoginSuccess from "~/pages/LoginSuccess";
import AdminPage from "~/pages/AdminPage";
import Admin from "~/layouts/Admin";

const decoded = jwtDecode(localStorage.getItem("authorization"));

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
        component: AdminPage,
        layout: Admin,
    },
    {
        path: "/admin/feedback",
        component: AdminPage,
        layout: Admin,
    },
    {
        path: "/admin/manageNotes",
        component: AdminPage,
        layout: Admin,
    },
    {
        path: "/admin/settings",
        component: AdminPage,
        layout: Admin,
    },
    {
        path: "/admin/listUser",
        component: AdminPage,
        layout: Admin,
    },
];

export { PrivateRouters, PublicRouters };
