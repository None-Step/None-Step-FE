import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthorized: false,
  memberID : "",
  memberMail : "",
  memberName : "",
  memberPhone : "",
  memberIMG : "",
  memberNickName : "",
  memberRandom : "",
  memberJoinDate : ""
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
    updateNickname: (state, action) => {
      state.memberNickName = action.payload;
    },
  },
});

export const { login, logout, updateMemberInfo, updateNickname } = memberSlice.actions;
export default memberSlice.reducer;