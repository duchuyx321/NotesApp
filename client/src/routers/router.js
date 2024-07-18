import Home from "~/pages/Home";
import Upload from "~/pages/Upload";
import Note from "~/pages/Note";

const PublicRouters = [
    { path: "/", component: Home },
    { path: "/upload", component: Upload },
    { path: "/:slug", component: Note },
];

const PrivateRouters = [];

export { PrivateRouters, PublicRouters };
