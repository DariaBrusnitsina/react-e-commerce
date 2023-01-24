import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";

const itemPage = ({ itemId }) => {
    const history = useHistory();
    const [item, setItem] = useState();

    useEffect(() => {
        api.items.getById(itemId).then((data) => setItem(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    if (item) {
        return (
            <div>
                <h1> {item.name}</h1>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default itemPage;
