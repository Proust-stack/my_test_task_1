import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { currencies } from '../dummyData.js'
import { client } from '../index'
import { GET_CURRENCIES } from '../queries/graphQLqueries'

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: GET_CURRENCIES,
      })
      const { currencies } = await response.data
      console.log(currencies)
      return currencies
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: currencies,
    currentCurrency: 0,
    loading: false,
    error: null,
  },
  reducers: {
    changeCurrency(state, action) {
      state.currentCurrency = action.payload.index
    },
  },
  extraReducers: {
    [fetchCurrencies.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchCurrencies.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.currencies = action.payload
    },
    [fetchCurrencies.rejected]: setError,
  },
})
export const { changeCurrency } = currencySlice.actions
export default currencySlice.reducer
