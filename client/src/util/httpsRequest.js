import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { refresh } from "~/service/authService";

const httpsRequest = axios.create({
    baseURL: "http://localhost:5050/",
    withCredentials: true,
});
const token = localStorage.getItem("authorization");

// Thêm token vào header của mỗi yêu cầu
httpsRequest.interceptors.request.use(
    (config) => {
        if (token) {
            const date = new Date();
            const decodeToken = jwtDecode(token);
            if (decodeToken.exp === date.getTime() / 1000 - 60) {
                const fetchAPI = async () => {
                    const result = await refresh();

                    // thêm vào local storage
                    localStorage.setItem("authorization", `Bearer ${result}`);
                };
                fetchAPI();
            } else config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const get = async (path, config = {}) => {
    const response = await httpsRequest.get(path, config);
    return response;
};

export const post = async (path, config = {}) => {
    const response = await httpsRequest.post(path, config);
    return response;
};
export const put = async (path, config = {}) => {
    const response = await httpsRequest.put(path, config);
    return response;
};
export const del = async (path, config = {}) => {
    const response = await httpsRequest.delete(path, config);
    return response;
};

export default httpsRequest;
