import { categoriesObject as categories } from "./categories";

const items = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    },
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    },
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    },
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    },
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    },
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 900,
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(items);
        }, 2000);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(items.find((user) => user._id === id));
        }, 1000);
    });

export default {
    fetchAll,
    getById
};
