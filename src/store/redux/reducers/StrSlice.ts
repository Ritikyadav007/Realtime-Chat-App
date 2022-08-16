import { createSlice } from '@reduxjs/toolkit';

export type StringState = {
  str: string;
};
const initialState = {
  str: '',
};

const stringSlice = createSlice({
  name: 'strSlice',
  initialState,
  reducers: {
    setString: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.str = action.payload;
    },
  },
});

export const { setString } = stringSlice.actions;

export default stringSlice.reducer;
