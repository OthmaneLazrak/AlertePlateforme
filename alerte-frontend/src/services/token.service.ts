import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8084",
});

export function setToken(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
}

export function removeToken() {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}
