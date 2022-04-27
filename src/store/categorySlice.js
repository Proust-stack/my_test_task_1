import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../index';
import { GET_CATEGORY } from "../utils/graphQLqueries";

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async (title = 'all', {rejectWithValue}) => {
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

const setError =  (state, action) => {
    state.loading = false;
    state.error = action.payload
}

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: {},
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
    }
})

export default categorySlice.reducer