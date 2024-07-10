import axios from "axios";

const Access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODc4NGYzZTJlNjIwNjA2N2Y3NGIyZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNzIwNjA2NjEwLCJleHAiOjE3MjA2MTAyMTB9.MI5mgWu6vgdUG4H-eNjHRhLY7cEcYuB1QlAfqsbZ2nI";

const httpsRequest = axios.create({
    baseURL: "http://localhost:5000/",
});

httpsRequest.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("access_token");
        config.headers.Authorization = `Bearer ${Access_token}`;
        // if (token) {
        // }
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
