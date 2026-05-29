import { apiSlice } from "./apiSlice";

// generaic [individual & list] : ['Blog']
// fetch list : [{ type: 'Blog', id: 'LIST' }]

// fetch all individual & list if specified : (result) => result ?
//                 [...result.blogs.map(({ id }) => ({ type: 'Blog', id })), { type: 'Blog', id: 'LIST' }]
//                 : [{ type: 'Blog', id: 'LIST' }]

// fetch only with specific id : (result, error, id) => [{ type: 'Blog', id }]


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ url: '/auth/login', method: 'POST', body: data })
            // invalidatesTags: ['Auth']
        }),
        register: builder.mutation({
            query: (data) => ({ url: '/auth/register', method: 'POST', body: data })
            // invalidatesTags: ['Auth']
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;