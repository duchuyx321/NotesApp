import * as request from "~/util/httpsRequest";

export const LoginGG = async (id) => {
    try {
        const res = await request.post("api/auth/login-Success", {
            id,
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
