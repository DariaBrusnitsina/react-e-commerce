import { categoriesObject as categories } from "./categories";

const items = [
    {
        _id: "1",
        name: "Piala Constellation",
        url: "https://sun9-82.userapi.com/uUMFkbY6IRcZwwveaJBZ5cLB2-tc-yz0m6-bHg/LTV_--8G0T4.jpg",
        category: categories.piala,
        price: 1300,
    },
    {
        _id: "2",
        name: "Piala Lune",
        url: "https://sun9-17.userapi.com/M8iV0Dkabu3SrsTxDd0XekLlhBSkmSOwQszmdQ/9EAXo_G2N8U.jpg",
        category: categories.piala,
        price: 1800,
    },
    {
        _id: "3",
        name: "Piala Start",
        url: "https://sun9-12.userapi.com/7xcNElj9EpJHq1aOvA_XDFXUZfHJF0_nPvBcMQ/e-tBD2K4WMo.jpg",
        category: categories.piala,
        price: 1200,
    },
    {
        _id: "4",
        name: "Piala Ait",
        url: "https://sun9-2.userapi.com/aInXCWnLToCfu63neYxP-RGko1A-NJAdatiWwA/CtmmVjDz04Q.jpg",
        category: categories.piala,
        price: 700,
    },
    {
        _id: "5",
        name: "Piala Water",
        url: "https://sun9-23.userapi.com/-ajCEpG-Y9U6ohdBJmJp_ZhttT-YNnl2ZXox7A/hNAD6Zj-DhM.jpg",
        category: categories.piala,
        price: 400,
    },
    {
        _id: "6",
        name: "Piala Fire",
        url: "https://sun9-46.userapi.com/Kv_-fQR9p82ttjewz3IKhSXQE1h3FErOBm1Ocw/8QKvQ79HyLc.jpg",
        category: categories.piala,
        price: 1000,
    },
    {
        _id: "7",
        name: "Piala Magma",
        url: "https://sun9-78.userapi.com/1jmjZGK5dLo9dzC6UELOTvdNH4N2ICwKZwrpKA/cWUmJtsD7Cs.jpg",
        category: categories.piala,
        price: 5000,
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
        }, 1000);
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
