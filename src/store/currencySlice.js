import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../index';
import { GET_CURRENCIES } from "../utils/graphQLqueries";


export const fetchCurrencies = createAsyncThunk(
    'currency/fetchCurrencies',
    async (_, {rejectWithValue}) => {
        try {
            const response = await client.query({
                query: GET_CURRENCIES,
              });
              const { currencies } = await response.data;
              return currencies
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError =  (state, action) => {
    state.loading = false;
    state.error = action.payload
}

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currencies: [],
        currency: {},
        loading: false,
        error: null
    },
    reducers: {
        changeCurrency(state, action) {
            state.currency = action.payload
        }
    },
    extraReducers: {
        [fetchCurrencies.pending]: (state) => {
            state.loading = true;
            state = null;
        },
        [fetchCurrencies.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currencies = action.payload;
        },
        [fetchCurrencies.rejected]: setError,
    }
})

export default currencySlice.reducer