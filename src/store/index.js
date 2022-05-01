import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice.js';
import currencyReducer from './currencySlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  currencies: currencyReducer,
  product: productReducer,
  category: categoryReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['category', 'product']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export default store;
