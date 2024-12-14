import { configureStore } from '@reduxjs/toolkit';
import partitionsReducer from './partitionsSlice';

const store = configureStore({
  reducer: {
    partitions: partitionsReducer,
  },
});

export default store;