import { categoriesObject as categories } from "./categories";

const items = [
    {
        _id: "1",
        name: "Piala Constellation",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 1000,
    },
    {
        _id: "2",
        name: "Piala Lune",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 300,
    },
    {
        _id: "3",
        name: "Piala Start",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 400,
    },
    {
        _id: "4",
        name: "Piala Ait",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 500,
    },
    {
        _id: "5",
        name: "Piala Water",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 700,
    },
    {
        _id: "6",
        name: "Piala Fire",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 600,
    },
    {
        _id: "7",
        name: "Piala Magma",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 600,
    },
    {
        _id: "8",
        name: "Piala Lava",
        url: "https://sun9-58.userapi.com/WaYkFqh3hprSmUo5WLWYEgy4Ka9-Jhge_p9ttA/cCQiBh6835Y.jpg",
        category: categories.piala,
        price: 600,
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
