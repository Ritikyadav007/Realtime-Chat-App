import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, onValue, get, child } from 'firebase/database';
import realtimeDb from '../../../Services/DatabaseService';

type Message = {
  fromUser: string;
  message: string;
  timestamp: number;
};

type MessageState = {
  messages: any[];
};

const initialState = {
  messages: [{}],
};

export const fetchMessages = createAsyncThunk(
  'message/fetch',
  async (id: string) => {
    const dbRef = ref(realtimeDb);
    const userMessages = await get(
      child(dbRef, `groups/${id && id}/messages`),
    ).then(
      // eslint-disable-next-line consistent-return
      (snapshot) => {
        const data = snapshot.val();
        if (data === null) {
          return [];
        }
        const Messages = Object.entries(data).map((val: Array<any>) => {
          return val[1];
        });
        return Messages;
      },
    );
    console.log(userMessages);
    return userMessages;
  },
);

export const messageSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export default messageSlice.reducer;
