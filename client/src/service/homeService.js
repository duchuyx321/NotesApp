import * as request from "~/util/httpsRequest";
export const home = async () => {
    try {
        const res = await request.get();
        return res.data;
    } catch (e) {
        console.log(e.message);
    }
};
