import httpService from "./http.service";
const itemsEndpoint = "admin";

const adminService = {
    fetchAll: async () => {
        const { content } = await httpService.get(itemsEndpoint);
        return {content};
    }
};
export default adminService;
