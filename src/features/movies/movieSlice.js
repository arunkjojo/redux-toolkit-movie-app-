import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
        const movieText = "Harry";
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`);
        // console.log('fetchAsyncMovies',response.data);
        return response.data;
    }
);
export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async () => {
        const seriesText = "Friends";
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`);
        // console.log('fetchAsyncShows',response.data);
        return response.data;
    }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        // console.log('fetchAsyncMovieOrShowDetail',response.data);
        return response.data;
    }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            // console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            // console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },
    }
});
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;