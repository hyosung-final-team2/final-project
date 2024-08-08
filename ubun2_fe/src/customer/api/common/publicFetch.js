import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const publicFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

publicFetch.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

publicFetch.interceptors.response.use(
    response => {
        if (response.status === 404) {
            console.log("404")
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default publicFetch;