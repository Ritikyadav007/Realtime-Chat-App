import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './reducers/GroupSlice';
import messageReducer from './reducers/MessageSlice';

const store = configureStore({
  reducer: {
    groups: groupReducer,
    message: messageReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
