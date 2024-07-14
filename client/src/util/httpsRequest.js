import axios from "axios";

const httpsRequest = axios.create({
    baseURL: "http://localhost:5000/",
});

httpsRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authorization");
        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        const { response } = error;
        if (
            response &&
            response.status === 402 &&
            response.data.message === "jwt expired"
        ) {
            // Xử lý khi JWT đã hết hạn
            console.log("JWT đã hết hạn. Yêu cầu đăng nhập lại.");
            // Thực hiện các hành động cần thiết, ví dụ như đưa người dùng đến trang đăng nhập lại
            // Ví dụ: window.location.href = '/login';
        }
        return Promise.reject(error); // Ném lại lỗi để cho phép xử lý tiếp theo
    }
);

export const get = async (path, config = {}) => {
    const response = await httpsRequest.get(path, config);
    return response;
};

export const post = async (path, config = {}) => {
    const response = await httpsRequest.post(path, config);
    return response;
};

export default httpsRequest;
