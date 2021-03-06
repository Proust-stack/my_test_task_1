import {  createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
        totalCost: 0
    },
    reducers: {
        addItem(state, action) {
            const item = state.items.find(item => item.cartId === action.payload.cartId)
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push(action.payload)
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.cartId !== action.payload.cartId)
        },
        increaseQuantity(state, action) {
            const item = state.items.find(item => item.cartId === action.payload.cartId)
            if (item.quantity < 10) {
                item.quantity += 1
            }
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(item => item.cartId === action.payload.cartId)
            if (item.quantity > 1) {
                item.quantity -= 1
            } else {
                state.items = state.items.filter(item => item.cartId !== action.payload.cartId)
            }
        }
    },
    
})

export const {addItem, removeItem, increaseQuantity, decreaseQuantity, changeProperties} = cartSlice.actions
export default cartSlice.reducer