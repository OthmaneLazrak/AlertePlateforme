import axios from "./axiosClient";

export function fetchTeamMembers() {
    return axios.get("/api/team/members");
}
