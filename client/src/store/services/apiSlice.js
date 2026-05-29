// must use /query/react instead of /query only if want to use hooks for mutation & queries
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers) => {

            return headers;
        }
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({})
})