// must use /query/react instead of /query only if want to use hooks for mutation & queries
import { getLocalStorageData } from "@/utils/localStorageUtility";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken || getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY);
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({})
})