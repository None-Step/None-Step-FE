import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthorized: false,
  memberID: '',
  memberNickName: '',
  memberRandom: '',
  memberFile: '',
  memberIntroduce: '',
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload, isAuthorized: true };
    },
    logout: () => initialState,
    updateMemberInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { login, logout, updateMemberInfo } = memberSlice.actions;
export default memberSlice.reducer;