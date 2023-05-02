import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const itemsEndpoint = "/items/";

const itemsService = {
    get: async () => {
        const { content } = await httpService.get(itemsEndpoint);
        return {content};
    },
    patch: async (newData) => {
        const { item } = await httpService.patch(
            itemsEndpoint + newData._id,
            newData
        );
        return item;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(itemsEndpoint + id);
        return data;
    },
    post: async (newData) => {
    const { data } = await httpService.post(itemsEndpoint, newData);
    return data;
    }
};
export default itemsService;
