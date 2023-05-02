import httpService from "./http.service";
const categoriesEndpoint = "/categories/";

const categoriesService = {
    get: async () => {
        const { content } = await httpService.get(categoriesEndpoint);
        return {content};
    },
    patch: async (newData) => {
        const { item } = await httpService.patch(
            categoriesEndpoint + newData._id,
            newData
        );
        return item;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(categoriesEndpoint + id);
        return data;
    },
    post: async (newData) => {
        const { data } = await httpService.post(categoriesEndpoint, newData);
        return data;
    }
};
export default categoriesService;
