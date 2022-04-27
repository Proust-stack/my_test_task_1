import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload)
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        increaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id)
            item.quantity++
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id)
            item.quantity--
        }
    },
    
})

export const {addItem, removeItem, increaseQuantity, decreaseQuantity} = cartSlice.actions
export default cartSlice.reducer