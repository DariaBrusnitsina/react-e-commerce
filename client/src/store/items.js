import {createSlice} from "@reduxjs/toolkit";
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
        },
        itemsUpdateRequest: (state) => {},
        itemsUpdateReceived: (state, action) => {
            const index = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            state.entities[index] = { ...state.entities[index], ...action.payload }
        },
        itemsUpdateRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        itemDeleteRequested: (state) => {},
        itemDeleted: (state, action) => {
            state.entities = state.entities.filter((i) => i._id !== action.payload)
        },
        itemDeleteRequestFailed: (state, action) => {
            state.error = action.payload
        },
        itemCreateRequested: (state) => {},
        itemCreateReceived: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload)
        },
        itemCreateRequestFailed: (state, action) => {
            state.error = action.payload
        }
    }
});

const { reducer: itemsReducer, actions } = itemsSlice;
const { itemsRequested,
    itemsReceived,
    itemsRequestFiled,
    itemsUpdateRequest,
    itemsUpdateReceived,
    itemsUpdateRequestFailed,
    itemDeleteRequested,
    itemDeleted,
    itemDeleteRequestFailed,
    itemCreateRequested,
    itemCreateReceived,
    itemCreateRequestFailed
} = actions;

export const loadItemsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().items;
    if (isOutdated(lastFetch)) {
        dispatch(itemsRequested());
        try {
            const { content } = await itemsService.get();
            dispatch(itemsReceived(content));
        } catch (error) {
            dispatch(itemsRequestFiled(error.message));
        }
    }
};

export const addItem = (newData) => async (dispatch) => {
    dispatch(itemCreateRequested());
    try {
        const { content } = await itemsService.post(newData);
        dispatch(itemCreateReceived(content));
    } catch (error) {
        dispatch(itemCreateRequestFailed(error.message));
    }
};

export const updateItem = (newData) => async (dispatch) => {
    dispatch(itemsUpdateRequest());
    try {
        const { content } = await itemsService.patch(newData);
        dispatch(itemsUpdateReceived(content));
    } catch (error) {
        dispatch(itemsUpdateRequestFailed(error.message));
    }
};

export const deleteItem = (id) => async (dispatch) => {
    dispatch(itemDeleteRequested());
    try {
        await itemsService.delete(id);
        dispatch(itemDeleted(id));
    } catch (error) {
        dispatch(itemDeleteRequestFailed(error.message));
    }
};

export const getItems = () => (state) => state.items.entities;
export const getItemsLoadingStatus = () => (state) =>
    state.items.isLoading;

export const getItemById = (itemId) => (state) => {
    if (state.items.entities) {
        return state.items.entities.find((u) => u._id === itemId);
    }
};

export default itemsReducer;
