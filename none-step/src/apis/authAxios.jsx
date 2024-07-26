import axios from 'axios';

export const getAuthAxios = (token) => {
  const authAxios = axios.create({
    baseURL: 'http://localhost:5173',
    headers: {
      //authAxios.get으로 보낸 모든 요청에 대해 heder에 accessToken이 있도록 함
      Authorization: token,
    }
  });
  //
  authAxios.interceptors.response.use(
    // 성공한 경우 응답을 그대로 반환
    (res) => res,
    // 실패한 경우 = 토큰이 만료된 경우 
    async (error) => {
      if (error.response.status == 401) {
        // 토큰이 만료된 경우 리프레시 토큰을 새로 발급
        const {accessToken, refreshToken} = await getNewRefreshToken();
        error.config.headers.Authorization = accessToken;
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        return (await axios.get(error.config.url, error.config)).data;
  
      }
    }
  );
  return authAxios;
}