// must use /query/react instead of /query only if want to use hooks for mutation & queries
import { getLocalStorageData } from "@/utils/localStorageUtility";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../slice/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken || getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY);
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    }
});

const baseQueryWithReAuth = async (args, api, options) => {
    let result = await baseQuery(args, api, options);

    if (result?.error && (result?.error?.status === 401 || result?.error?.status === 403)) {

        const refreshToken = api.getState().auth.refreshToken;

        if (refreshToken) {
            try {
                const refreshResult = await baseQuery({
                    url: '/auth/refresh',
                    method: 'POST',
                    body: { refreshToken }
                }, api, options);

                if (refreshResult?.data) {
                    const authData = refreshResult.data?.data ?? refreshResult.data;
                    api.dispatch(setCredentials(authData));
                    result = await baseQuery(args, api, options);
                } else {
                    api.dispatch(logout());
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Auth','Image'],
    endpoints: () => ({})
})