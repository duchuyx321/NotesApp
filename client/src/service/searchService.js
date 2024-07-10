import * as request from "~/util/httpsRequest";

export const search = async (text) => {
    try {
        const res = await request.get("note/search", {
            params: {
                text,
            },
        });
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
