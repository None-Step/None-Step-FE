// KakaoCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axiosInstance.get(`/nonestep/member/login/callback/kakao?code=${code}`)
        .then(response => {
          // 로그인 성공 처리
          // 예: 토큰을 localStorage에 저장
          localStorage.setItem('token', response.data.token);
          navigate('/'); // 로그인 성공시 메인으로 리디렉트
        })
        .catch(error => {
          console.error('카카오 로그인 에러', error);
          alert('카카오 로그인에 실패하였습니다.')
          navigate('/login'); // 에러 시 로그인 페이지로 리디렉트
        });
    }
  }, [navigate]);

  return <div>Processing Kakao login...</div>;
};

export default KakaoCallback;