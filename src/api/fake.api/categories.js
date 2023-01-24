export const categoriesObject = {
    piala: { _id: "67rdca3eeb7f6fgeed471818", name: "piala" },
    bowl: { _id: "67rdca3eeb7f6fgeed471820", name: "bowl" },
    plate: { _id: "67rdca3eeb7f6fgeed471814", name: "plate" },
    smth: { _id: "67rdca3eeb7f6fgeed471822", name: "smth" },
    cup: { _id: "67rdca3eeb7f6fgeed471824", name: "cup" }
};
export const categories = [
    { _id: "67rdca3eeb7f6fgeed471818", name: "piala" },
    { _id: "67rdca3eeb7f6fgeed471820", name: "bowl" },
    { _id: "67rdca3eeb7f6fgeed471814", name: "plate" },
    { _id: "67rdca3eeb7f6fgeed471822", name: "smth" },
    { _id: "67rdca3eeb7f6fgeed471824", name: "cup" }
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 2000);
    });

export default {
    fetchAll
};
