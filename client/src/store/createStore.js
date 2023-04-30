import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import itemsReducer from "./items";
import categoriesReducer from "./categories";
import adminReducer from "./admin";

const rootReducer = combineReducers({
    users: usersReducer,
    items: itemsReducer,
    categories: categoriesReducer,
    admin: adminReducer

})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
