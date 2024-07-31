import * as Request from "~/util/httpsRequest";

// sending code
export const sendCode = async (email) => {
    try {
        const res = await Request.post("code/getCode", { email });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

// check code
export const checkCode = async (email, code) => {
    try {
        const res = await Request.post("code/checkCode", { email, code });
        return res.data;
    } catch (e) {
        if (e.response.data.message === "code expired!") {
            return { message: "Mã Đã Hết Hạn!" };
        } else if (e.response.data.message === "code not found!") {
            return { message: "Mã Không Tồn Tại !" };
        }
        console.log(e.response.data.message);
    }
};
