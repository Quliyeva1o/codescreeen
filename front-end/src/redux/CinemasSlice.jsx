import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5050/api/"
export const cinemaAPI = createApi({
    reducerPath: "cinemaApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getCinemas: builder.query({
            query: () => `halls`,
        }),
        getCinemaById: builder.query({
            query: (id) => `halls/${id}`,
        }),
        deleteCinema: builder.mutation({
            query: (id) => ({
                url: `halls/${id}`,
                method: "DELETE"
            }),
        }),
        postCinema: builder.mutation({
            query: (newCinema) => ({
                url: `halls`,
                body: newCinema,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
        patchCinema: builder.mutation({
            query: ({ id, changes }) => ({
                url: `halls/${id}`,
                body: changes,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
    }),
})

export const { useGetCinemaByIdQuery, useDeleteCinemaMutation, usePostCinemaMutation, useGetCinemasQuery, usePatchCinemaMutation } = cinemaAPI