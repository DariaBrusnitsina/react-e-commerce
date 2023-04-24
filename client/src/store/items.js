import { createSlice } from "@reduxjs/toolkit";
import itemsService from "../services/items.service";
import isOutdated from "../utils/isOutdated";

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        itemsRequested: (state) => {
            state.isLoading = true;
        },
        itemsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        itemsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: itemsReducer, actions } = itemsSlice;
const { itemsRequested, itemsReceived, itemsRequestFiled } = actions;

export const loadItemsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().items;
    if (isOutdated(lastFetch)) {
        dispatch(itemsRequested());
        try {
            const { content } = await itemsService.fetchAll();
            dispatch(itemsReceived(content));
        } catch (error) {
            dispatch(itemsRequestFiled(error.message));
        }
    }
};

export const getItems = () => (state) => state.items.entities;
export const getItemsLoadingStatus = () => (state) =>
    state.items.isLoading;

export const getItemById = (itemId) => (state) => {
    console.log(state.items)
    if (state.items.entities) {
        return state.items.entities.find((u) => u._id === itemId);
    }
};

export const getItemsByIds = (itemsIds) => (state) => {
    if (state.items.entities) {
        const itemsArray = [];
        for (const itemId of itemsIds) {
            for (const item of state.items.entities) {
                if (item._id === itemId) {
                    itemsArray.push(item);
                    break;
                }
            }
        }
        return itemsArray;
    }
    return [];
};

export default itemsReducer;
