// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     movies: [],
//     oneData: {},
//     error: null,
//     loading: false
// };
// export const getAllData = createAsyncThunk('getAllData', async () => {
//     const response = await axios.get('http://localhost:5050/api/movies')
//     return response.data.data
// })
// export const getOneData = createAsyncThunk('getOneData', async (id) => {
//     const response = await axios.get(`http://localhost:5050/api/movies/${id}`)
//     return response.data.data
// })

// export const deleteData = createAsyncThunk('deleteData', async (id) => {
//     const response = await axios.delete(`http://localhost:5050/api/movies/${id}`)
//     return response.data.data
// })

// export const postData = createAsyncThunk('postData', async (newData) => {
//     const response = await axios.post('http://localhost:5050/api/movies', newData)
//     return response.data.data
// })
// const movieSlice = createSlice({
//     name: 'movies',
//     initialState,
//     reducers: {
//         // search ve sort yazilacaq

//     },
//     extraReducers: (builder) => {
//         builder.addCase(getAllData.pending, (state, action) => {
//             state.loading = true
//         }).addCase(getAllData.fulfilled, (state, action) => {
//             state.loading = false
//             state.movies = action.payload
//         }).addCase(getAllData.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message
//         })


//         builder.addCase(getOneData.pending, (state, action) => {
//             state.loading = true
//         }).addCase(getOneData.fulfilled, (state, action) => {
//             state.loading = false
//             state.oneData = action.payload
//         }).addCase(getOneData.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message

//         })


//         builder.addCase(postData.pending, (state, action) => {
//             state.loading = true
//         }).addCase(postData.fulfilled, (state, action) => {
//             state.loading = false
//             state.movies.push(action.payload)
//         }).addCase(postData.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message

//         })

//         builder.addCase(deleteData.pending, (state, action) => {
//             state.loading = true
//         }).addCase(deleteData.fulfilled, (state, action) => {
//             state.loading = false
//             state.movies = [...state.movies.filter(x => x._id != action.payload._id)]
//         }).addCase(deleteData.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message

//         })
//     }
// });


// export const {
// } = movieSlice.actions;

// export default movieSlice.reducer;



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:5050/api/"
export const movieAPI = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => `movies`,
        }),
        getMovieById: builder.query({
            query: (id) => `movies/${id}`,
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `movies/${id}`,
                method: "DELETE"
            }),
        }),
        postMovie: builder.mutation({
            query: (newMovie) => ({
                url: `movies`,
                body: newMovie,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
        }),
        patchMovie: builder.mutation({
            query: ({ id, changes }) => ({
                url: `movies/${id}`,
                body: changes,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, 
            }),
        }),
    }),
})

export const { useGetMovieByIdQuery, useDeleteMovieMutation, usePostMovieMutation, useGetMoviesQuery,usePatchMovieMutation } = movieAPI