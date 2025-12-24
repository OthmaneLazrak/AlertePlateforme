export interface RegisterRequest {
    username: string;
    password: string;
    team: "DEV" | "SYSTEME" | "RESEAU";
}
