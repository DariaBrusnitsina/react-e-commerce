import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import categoriesService from "../services/categories.service";
import itemsService from "../services/items.service";

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
        },
        categoryUpdateRequest: (state) => {},
        categoryUpdateReceived: (state, action) => {
            const index = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            state.entities[index] = { ...state.entities[index], ...action.payload };
        },
        categoryUpdateRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        categoryDeleteRequested: (state) => {},
        categoryDeleted: (state, action) => {
            state.entities = state.entities.filter((i) => i._id !== action.payload);
        },
        categoryDeleteRequestFailed: (state, action) => {
            state.error = action.payload;
        },
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested,
    categoriesReceived,
    categoriesRequestFiled,
    categoryUpdateRequest,
    categoryUpdateReceived,
    categoryUpdateRequestFailed,
    categoryDeleteRequested,
    categoryDeleted,
    categoryDeleteRequestFailed
    } = actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().items;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoriesService.get();
            dispatch(categoriesReceived(content));
        } catch (error) {
            dispatch(categoriesRequestFiled(error.message));
        }
    }
};

export const updateCategory = (newData) => async (dispatch) => {
    dispatch(categoryUpdateRequest());
    try {
        const { content } = await categoriesService.patch(newData);
        dispatch(categoryUpdateReceived(content));
    } catch (error) {
        dispatch(categoryUpdateRequestFailed(error.message));
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(categoryDeleteRequested());
    try {
        await categoriesService.delete(id);
        dispatch(categoryDeleted(id));
    } catch (error) {
        dispatch(categoryDeleteRequestFailed(error.message));
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
