import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import adminService from "../services/admin.service";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        adminRequested: (state) => {
            state.isLoading = true;
        },
        adminReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        adminRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: adminReducer, actions } = adminSlice;
const { adminRequested, adminReceived, adminRequestFiled } = actions;

export const loadAdminList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().items;
    if (isOutdated(lastFetch)) {
        dispatch(adminRequested());
        try {
            const { content } = await adminService.fetchAll();
            dispatch(adminReceived(content));
        } catch (error) {
            dispatch(adminRequestFiled(error.message));
        }
    }
};

export const getAdmins = () => (state) => state.admin.entities;

export const getAdminById = (email) => (state) => {
    if (state.admin.entities) {
        return state.admin.entities.find((a) => a._id === email);
    }
};

export default adminReducer;
