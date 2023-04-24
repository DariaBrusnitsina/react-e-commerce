import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "/user/";

const userService = {
    get: async () => {
        const { content } = await httpService.get(userEndpoint);
        return {content};
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        console.log(data)
        return {data};
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};
export default userService;
