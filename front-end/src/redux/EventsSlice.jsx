import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5050/api/"
export const eventAPI = createApi({
    reducerPath: "eventApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => `events`,
        }),
        getEventById: builder.query({
            query: (id) => `events/${id}`,
        }),
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `events/${id}`,
                method: "DELETE"
            }),
        }),
        postEvent: builder.mutation({
            query: (newEvent) => ({
                url: `events`,
                body: newEvent,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
        patchEvent: builder.mutation({
            query: ({ id, changes }) => ({
                url: `events/${id}`,
                body: changes,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
    }),
})

export const { useGetEventByIdQuery, useDeleteEventMutation, usePostEventMutation, useGetEventsQuery, usePatchEventMutation } = eventAPI