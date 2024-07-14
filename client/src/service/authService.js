import * as request from "~/util/httpsRequest";

export const login = async (username, email, password) => {
    try {
        const res = await request.post(
            "auth/login",
            {
                username,
                email,
                password,
            },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            return {
                e: error.response.data.message,
                status: error.response.status,
            }; // Trả về thông báo lỗi từ server
        } else {
            return "Unknown error occurred"; // Xử lý trường hợp lỗi không xác định
        }
    }
};

export const register = async (username, email, password) => {
    try {
        const res = await request.post(
            "auth/login",
            {
                username,
                email,
                password,
            },
            { withCredentials: true }
        );
        return res.data;
    } catch (e) {
        console.log(e.message);
    }
};

export const logout = async () => {
    try {
        const res = await request.post("auth/logout", {
            withCredentials: true,
        });
        return res;
    } catch (e) {
        console.log(e.message);
    }
};

export const refresh = async () => {
    try {
        const res = await request.post("auth/refresh", {
            withCredentials: true,
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
