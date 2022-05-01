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
            state.items.push(action.payload)
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        changeProperties(state, action) {
            const item = state.items.filter(item => item.id === action.payload.id)
           

        },
        increaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item.quantity < 10) {
                item.quantity += 1
            }
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item.quantity > 1) {
                item.quantity -= 1
            }
        }
    },
    
})

export const {addItem, removeItem, increaseQuantity, decreaseQuantity, changeProperties} = cartSlice.actions
export default cartSlice.reducer