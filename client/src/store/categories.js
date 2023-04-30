import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import categoriesService from "../services/categories.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoriesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFiled } = actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().items;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoriesService.fetchAll();
            dispatch(categoriesReceived(content));
        } catch (error) {
            dispatch(categoriesRequestFiled(error.message));
        }
    }
};

export const getCategories= () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoriesByIds = (categoriesIds) => (state) => {
    if (state.categories.entities) {
        const categoriesArray = [];
        for (const categoryId of categoriesIds) {
            for (const category of state.categories.entities) {
                if (category._id === categoryId) {
                    categoriesArray.push(category);
                    break;
                }
            }
        }
        return categoriesArray;
    }
    return [];
};

export default categoriesReducer;
