import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import productReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import checkourReducer from './slices/checkoutSlice'
const store = configureStore({
    reducer: {
       auth: authReducer,
       products: productReducer,
       cart: cartReducer,
       checkout: checkourReducer,
    }
})

export default store