import httpService from "./http.service";
const itemsEndpoint = "/items/";

const itemsService = {
    fetchAll: async () => {
        const { content } = await httpService.get(itemsEndpoint);
        return {content};
    }
};
export default itemsService;
