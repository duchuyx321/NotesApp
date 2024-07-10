import Home from "~/pages/Home";
import Upload from "~/pages/Upload";

const PublicRouters = [
    { path: "/", component: Home },
    { path: "/upload", component: Upload },
];

const PrivateRouters = [];

export { PrivateRouters, PublicRouters };
