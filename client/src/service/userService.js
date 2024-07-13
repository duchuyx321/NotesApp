import * as request from "~/util/httpsRequest";

export const user = async () => {
    try {
        const res = await request.get("user");
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
