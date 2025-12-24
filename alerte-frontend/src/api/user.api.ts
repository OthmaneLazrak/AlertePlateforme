import { api } from "../services/token.service";

export const fetchProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data;
};
