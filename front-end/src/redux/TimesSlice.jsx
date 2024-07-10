import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5050/api/"
export const timeAPI = createApi({
    reducerPath: "timeAPI",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getTimes: builder.query({
            query: () => `times`,
        }),
        getTimeById: builder.query({
            query: (id) => `times/${id}`,
        }),
        deleteTime: builder.mutation({
            query: (id) => ({ 
                url: `times/${id}`,
                method: "DELETE"
            }),
        }),
        postTime: builder.mutation({
            query: (newTime) => ({
                url: `times`,
                body: newTime,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
        patchTime: builder.mutation({
            query: ({ id, changes }) => ({ 
                url: `times/${id}`,
                body: changes,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
    }),
})

export const { useGetTimeByIdQuery, useDeleteTimeMutation, usePostTimeMutation, useGetTimesQuery, usePatchTimeMutation } = timeAPI