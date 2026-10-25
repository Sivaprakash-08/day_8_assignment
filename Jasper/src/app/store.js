import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';

const cartPersistConfig = {
  key: 'jasper-cart',
  storage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER', 'persist/PAUSE', 'persist/PURGE', 'persist/FLUSH'],
      },
    }),
});

export const persistor = persistStore(store);
