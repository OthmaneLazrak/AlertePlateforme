import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { UserToken } from "../models/UserToken";
import { setToken, removeToken, getToken } from "../services/token.service";
import { fetchProfile } from "../api/user.api";

interface AuthContextType {
    user: UserToken | null;
    profile: any | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserToken | null>(null);
    const [profile, setProfile] = useState<any | null>(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            initSession(token);
        }
    }, []);

    const initSession = async (token: string) => {
        setToken(token);

        const decoded = jwtDecode<UserToken>(token);
        setUser(decoded);

        const profile = await fetchProfile();
        setProfile(profile);
    };

    const login = async (token: string) => {
        await initSession(token);
    };

    const logout = () => {
        removeToken();

        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user, profile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
