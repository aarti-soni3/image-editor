import { apiSlice } from "./apiSlice";

export const imageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        crop: builder.mutation({
            query: (data) => ({ url: '/image/crop', method: 'POST', body: data }),
            invalidatesTags: ['Image']
        })
    })
})

export const { useCropMutation } = imageApiSlice