import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json"

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/"
});

const authService = {
    register: async ({ email, password, ...rest }) => {
        const { data } = await httpAuth.post(`signUp`, {
            email,
            password,
            ...rest,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
