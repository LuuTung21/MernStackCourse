import { apiSlice } from "./apiSlice.js";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // This is used to connect to the user authenticate route in the backend side.
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST"
            })
        })
    })
});

// The useLoginMutation will point directly to the mutation within the login endpoint.
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;