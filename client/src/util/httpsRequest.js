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
        return Promise.reject(new Error(error.message));
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
