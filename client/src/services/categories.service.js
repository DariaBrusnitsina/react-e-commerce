import httpService from "./http.service";
const itemsEndpoint = "/categories/";

const categoriesService = {
    fetchAll: async () => {
        const { content } = await httpService.get(itemsEndpoint);
        return {content};
    }
};
export default categoriesService;
