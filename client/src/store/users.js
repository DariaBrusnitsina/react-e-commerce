import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateRequest: (state) => {},
        userUpdateReceived: (state, action) => {
            const index = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            state.entities[index] = { ...state.entities[index], ...action.payload };
        },
        userUpdateRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdateRequest,
    userUpdateReceived,
    userUpdateRequestFailed
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const removeUserRequested = createAction("comments/removeUserRequested");

export const login =
    ({ payload }) =>
        async (dispatch) => {
            const { email, password } = payload;
            dispatch(authRequested());
            try {
                const data = await authService.login({ email, password });
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({ userId: data.userId }));
            } catch (error) {
                const { code, message } = error.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(error.message));
                }
            }
        };

export const signUp = (payload) =>
        async (dispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.register(payload);
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({ userId: data.userId }));

            } catch (error) {
                const { code, message } = error.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(error.message));
                }
            }
        };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequest());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateReceived(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const removeUser = (userId) => async (dispatch) => {
    dispatch(removeUserRequested());
    try {
        const { content } = await userService.removeUser(userId);
        if (content === null) {
            dispatch(usersReceived(userId));
        }
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
