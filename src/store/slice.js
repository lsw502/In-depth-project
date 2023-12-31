import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        results: []
    },
    genreData: [],
    page: 1,
    selectedGenre: null,
    sortBy: 'popularity.desc',
    selectedMovie: null
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data.results = [...state.data.results, ...action.payload];
        },
        setGenreData: (state, action) => {
            state.genreData = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        }
    }
});

export const {
    setData,
    setGenreData,
    setPage,
    setSelectedGenre,
    setSortBy,
    setSelectedMovie
} = movieSlice.actions;

export default movieSlice.reducer;
