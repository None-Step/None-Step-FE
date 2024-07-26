import axios from "axios";

export const login = async (memberID,memberPass) => {
  try {
    const response = await axios.post('http://nonstep.site/nonestep/member/login', {
      memberID,
      memberPass
    });
    console.log('Login response:', response.data);
    return response.data; // 데이터만 반환

  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : 'API 서버 오류');
    throw error; // 에러를 throw 하여 컴포넌트에서 처리하도록 함
  }
};