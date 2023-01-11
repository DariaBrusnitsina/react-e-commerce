export const categoriesObject = {
    piala: { _id: "67rdca3eeb7f6fgeed471818", name: "Пиала" },
    waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
    physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
    engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
    actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
    cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" }
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
