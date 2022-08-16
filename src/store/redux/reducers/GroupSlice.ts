/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, child } from 'firebase/database';
import { doc, getDoc } from '@firebase/firestore';
import db from '../../../Services/UserService';
import realtimeDb from '../../../Services/DatabaseService';

export type Group = {
  [key: string]: {
    groupId: string;
    members: string[];
    messages?: {
      [key: string]: {
        fromUser: string;
        message: string;
        timestamp: number;
      };
    };
    name: string;
    imageUrl?: string;
  };
};

export type GroupState = {
  groupList: Group[];
  str: string;
};

const initialState = {
  groupList: [{}],
  str: '',
};

export const fetchGroups = createAsyncThunk(
  'groups/fetch',
  async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const groupData = getDoc(docRef).then(async (data: any) => {
      const dbRef = ref(realtimeDb);
      const groupDataPromise = data.data().groups.map(async (id: string) => {
        // eslint-disable-next-line @typescript-eslint/return-await
        return get(child(dbRef, `groups/${id}`)).then((snapshot) => {
          return snapshot.val();
        });
      });
      return Promise.all(groupDataPromise);
    });
    return groupData;
  },
);

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setState(state: GroupState, action) {
      state.str = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.groupList = action.payload;
    });
  },
});

export const { setState } = groupSlice.actions;

export default groupSlice.reducer;

// export function fetchGroups(id: string) {
//   return async function fetchGroupsThunk(dispatch: any, getState: any) {
//     const { uid } = getState().id;
//     const docRef = doc(db, 'users', uid);
//     getDoc(docRef).then((data: any) => {
//       const dbRef = dbref(realtimeDb);
//       const groupDataPromise = data.data().groups.map((id: string) => {
//         return get(child(dbRef, `groups/${id}`)).then((snapshot) => {
//           return snapshot.val();
//         });
//       });
//       Promise.all(groupDataPromise).then((values) => {
//         dispatch(setState(values));
//       });
//     });
//   };
// }
