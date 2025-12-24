export interface UserToken {
    sub: string;
    roles: string[];
    team: "DEV" | "SYSTEME" | "RESEAU"; // ✅ plus optionnel
    iat: number;
    exp: number;
}
