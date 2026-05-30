import { getLocalStorageData } from "@/utils/localStorageUtility";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApiSlice";

const initialState = {
    user: null,
    accessToken: getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY) | null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, payload) => {
            console.log(state, payload)
        },
        logout: (state) => {
            console.log(state)

        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.access.matchFulfilled,
            (state, action) => {
                console.log('add matcher :', action.payload)
                state.user = action?.payload?.data?.user?.data
            }
        )
    }
})

export const { setCredentials, logout } = authSlice.reducer;