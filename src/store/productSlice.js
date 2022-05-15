import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../index';
import { GET_PRODUCT } from "../queries/graphQLqueries";


export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id, {rejectWithValue}) => {
        try {
            const response = await client.query({
                query:GET_PRODUCT,
                  variables: {
                    id
                  }
              })
              const { product } = await response.data;
              return product
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError =  (state, action) => {
    state.loading = false;
    state.error = action.payload
}

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchProduct.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        },
        [fetchProduct.rejected]: setError,
    }
})

export default productSlice.reducer