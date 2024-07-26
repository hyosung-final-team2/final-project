import axios from 'axios';
import {sendRefreshToken} from "./Token/Token.js";

const BASE_URL = import.meta.env.VITE_API_URL;

const privateFetch = axios.create({
    baseURL: BASE_URL,
    //timeout: 3000,
});

privateFetch.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');

        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = accessToken;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

privateFetch.interceptors.response.use(
    response => {
        if (response.status === 404) {
            // 404페이지 생기면 거기로 넘기기
            console.log("404")
        }

        return response;
    },
    async error => {
        if (error.response?.status === 401) {
            const res = await sendRefreshToken();

            localStorage.setItem('accessToken', res?.headers['authorization']);
            error.config.headers['Authorization'] = res?.headers['authorization'];

            error.config.headers = {
                'Content-Type': 'application/json',
                Authorization: res?.headers['authorization']
            };

            return await axios.request(error.config);
        }
        return Promise.reject(error);
    }
);

export default privateFetch;
