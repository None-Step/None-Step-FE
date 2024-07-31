// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../apis/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [memberID, setMemberID] = useState(null);

  // refreshToken을 사용하여 새 accessToken 요청
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedMemberID = localStorage.getItem('memberID');
    
    if (!storedRefreshToken || !storedMemberID) {
      console.log('저장된 리프레시 토큰 또는 멤버 ID가 없습니다.');
      return;
    }

    try {
      const response = await axiosInstance.post('/nonestep/member/token', {
        memberID: storedMemberID,
        memberToken: storedRefreshToken
      });

      if (response.data.message === 'success') {
        const newAccessToken = response.data.accessToken; // 응답 구조에 따라 조정 필요
        setAccessToken(newAccessToken);
        console.log('새로운 액세스 토큰이 발급되었습니다.');
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      // 에러 처리 (예: 로그아웃)
      logout();
    }
  };

  // 컴포넌트 마운트 시 토큰 갱신 시도
  useEffect(() => {
    refreshToken();
  }, []);

  // 로그인 함수
  const login = async (memberID, memberPass) => {
    try {
      const response = await axiosInstance.post('/nonestep/member/login', {
        memberID: memberID,
        memberPass: memberPass
      });
      // ... 나머지 코드
    } catch (error) {
      console.error('로그인 실패:', error);
      // 에러 응답 내용 출력
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못한 경우
        console.error('Error request:', error.request);
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      }
    
    return false;
  };

  // 로그아웃 함수
  const logout = () => {
    setAccessToken(null);
    setMemberID(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('memberID');
    console.log('로그아웃 처리됨');
  };

  return (
    <AuthContext.Provider value={{ accessToken, memberID, setAccessToken, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);