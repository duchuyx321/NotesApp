import Home from "~/pages/Home";
import Upload from "~/pages/Upload";
import Restore from "~/pages/Restore";
import Note from "~/pages/Note";

const PublicRouters = [
    { path: "/", component: Home },
    { path: "/upload", component: Upload },
    { path: "/restore", component: Restore },
    { path: "/:slug", component: Note },
];

const PrivateRouters = [];

export { PrivateRouters, PublicRouters };
