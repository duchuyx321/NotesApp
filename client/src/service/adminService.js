import * as Request from "~/util/httpsRequest";

export const getUserData = async () => {
    try {
        const res = await Request.get("admin/ListUsers");
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const ExportExcel = async () => {
    try {
        const res = await Request.get("/admin/export/excel", {
            responseType: "blob",
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
