import axios from "axios";
import { store } from "@/store";
import { logout } from "@/store/slices/memberSlice";

// 토큰 만료 시간 관련 상수
const ACCESS_TOKEN_EXPIRY = 60 * 60 * 1000; // 1시간
const REFRESH_TOKEN_BEFORE_EXPIRY = 5 * 60 * 1000; // 5분

// 토큰 만료 시간 추적을 위한 변수
let tokenExpirationTime = null;

const axiosInstance = axios.create({
  baseURL: "https://nonestep.site",
  withCredentials: true, // HttpOnly 쿠키 사용을 위해 필수
  headers: {
    'Content-Type': 'application/json'
  }
});

// 토큰 만료 시간 설정 함수
function setTokenExpiration() {
  tokenExpirationTime = Date.now() + ACCESS_TOKEN_EXPIRY;
}

// 토큰 갱신이 필요한지 확인하는 함수
function isTokenRefreshNeeded() {
  return tokenExpirationTime && (tokenExpirationTime - Date.now() < REFRESH_TOKEN_BEFORE_EXPIRY);
}

// 토큰 갱신 함수
async function refreshAccessToken() {
  try {
    const memberID = sessionStorage.getItem('memberID');
    const response = await axiosInstance.post('/nonestep/member/token', { memberID });
    const newToken = response.headers['Authorization'];
    if (newToken) {
      sessionStorage.setItem('accessToken', newToken);
      setTokenExpiration();
    }
  } catch (refreshError) {
    store.dispatch(logout());
    sessionStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
    window.location.href = '/login';
    throw refreshError;
  }
}

// 요청 인터셉터에 토큰 갱신 로직 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    if (isTokenRefreshNeeded()) {
      await refreshAccessToken();
    }
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 서버로부터 응답이 도착한 후, then/catch 핸들러로 전달되기 전에 실행, 응답 데이터를 가공 및 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];
    if (authHeader) {
      sessionStorage.setItem('accessToken', authHeader);
      setTokenExpiration(); // 새 토큰을 받았을 때 만료 시간 갱신
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Access Token이 만료되었을 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한루프 방지
      try {
        await refreshAccessToken();
        // 원래 요청의 헤더를 새 토큰으로 업데이트
        originalRequest.headers['Authorization'] = sessionStorage.getItem('accessToken');
        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우는 refreshAccessToken 함수에서 처리됨
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 초기 토큰 설정 함수 (로그인 성공 시 호출 필요)
axiosInstance.setInitialToken = (token) => {
  sessionStorage.setItem('accessToken', token);
  setTokenExpiration();
};

export default axiosInstance;