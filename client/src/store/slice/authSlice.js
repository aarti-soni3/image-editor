import { getLocalStorageData, removeLocalStorageData, setLocalStorageData } from "@/utils/localStorageUtility";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApiSlice";

const initialState = {
    user: null,
    accessToken: getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY) || null,
    refreshToken: getLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY) || null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.accessToken = payload?.accessToken
            state.refreshToken = payload?.refreshToken
            state.user = payload?.user
            setLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY, payload?.accessToken)
            setLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY, payload?.refreshToken)
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            removeLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY)
            removeLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.access.matchFulfilled,
            (state, action) => {
                const returnedUser = action.payload?.data?.user;
                state.user = returnedUser?.data ?? returnedUser ?? null;
            }
        )
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer