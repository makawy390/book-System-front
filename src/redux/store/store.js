import { configureStore } from '@reduxjs/toolkit'
import dataSlice from '../reducer/createSlice';
 const store = configureStore({
  reducer: {
    data : dataSlice
  },
})

export default store;

