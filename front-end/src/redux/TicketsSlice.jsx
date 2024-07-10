import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5050/api/"
export const ticketAPI = createApi({
    reducerPath: "ticketAPI",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => `tickets`,
        }),
        getTicketById: builder.query({
            query: (id) => `tickets/${id}`,
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({ 
                url: `tickets/${id}`,
                method: "DELETE"
            }),
        }), 
        postTicket: builder.mutation({
            query: (newTicket) => ({
                url: `tickets`, 
                body: newTicket,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
        patchTicket: builder.mutation({
            query: ({ id, changes }) => ({ 
                url: `tickets/${id}`,
                body: changes,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
    }),
})

export const { useGetTicketByIdQuery, useDeleteTicketMutation, usePostTicketMutation, useGetTicketsQuery, usePatchTicketMutation } = ticketAPI