import api from "./axiosClient";
import type { RegisterRequest } from "../models/RegisterRequest";

export const login = async (username: string, password: string) => {
    const res = await api.post(
        "/auth/login",
        new URLSearchParams({ username, password })
    );
    return res.data;
};

export const register = async (data: RegisterRequest) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};
