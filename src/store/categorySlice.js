import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../index';
import { GET_CATEGORY, GET_CATEGORY_NAME } from "../queries/graphQLqueries";

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async (title, {rejectWithValue}) => {
        try {
            const response = await client.query({
                query:GET_CATEGORY,
                  variables: {
                    title
                  }
              })
              const { category } = await response.data;
              return category
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCategoriesNames = createAsyncThunk(
    'category/fetchCategoriesNames',
    async (_, {rejectWithValue}) => {
        try {
            const response = await client.query({
                query:GET_CATEGORY_NAME
              })
              const { categories } = await response.data;
              return categories
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError =  (state, action) => {
    state.loading = false;
    state.error = action.payload
}

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: {},
        categoriesNames: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [fetchCategory.pending]: (state) => {
            state.loading = true;
            state = null;
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.category = action.payload;
        },
        [fetchCategory.rejected]: setError,
        [fetchCategoriesNames.pending]: (state) => {
            state.loading = true;
            state = null;
        },
        [fetchCategoriesNames.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.categoriesNames = action.payload;
        },
        [fetchCategoriesNames.rejected]: setError,

    }
})

export default categorySlice.reducer