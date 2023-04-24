import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import itemsReducer from "./items";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
    users: usersReducer,
    items: itemsReducer,
    categories: categoriesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
