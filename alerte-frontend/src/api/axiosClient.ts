import axios from "axios";
import { getToken } from "../services/token.service";

const api = axios.create({
    baseURL: "http://localhost:8084",
});

api.interceptors.request.use((config) => {
    const token = getToken();

    // ❌ Ne pas envoyer le token sur /auth/**
    if (token && !config.url?.startsWith("/auth")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export default api;
