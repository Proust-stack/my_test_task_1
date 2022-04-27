import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice.js'
import currencyReducer from './currencySlice'
import productReducer from './productSlice'
import categoryReducer from './categorySlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        currencies: currencyReducer,
        product: productReducer,
        category: categoryReducer,
    }
})