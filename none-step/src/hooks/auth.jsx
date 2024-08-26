import axiosInstance from '@/apis/axiosInstance';
import { login } from '@/store/slices/memberSlice';

export const fetchUserInfo = async (dispatch) => {
  try {
    const response = await axiosInstance.get('/nonestep/member/info');
    const data = response.data;
    const payload = {
      isAuthorized: true,
      memberID: data.memberID || "",
      memberMail: data.memberMail || "",
      memberName: data.memberName || "",
      memberPhone: data.memberPhone || "",
      memberIMG: data.memberIMG || "",
      memberNickName: data.memberNickName || "",
      memberRandom: data.memberRandom || "",
      memberJoinDate: data.memberJoinDate || ""
    };
    dispatch(login(payload));
    return payload;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};