import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';
import { AuthContext } from '../../apis/AuthContext';

const NaverCallback = () => {
  const navigate = useNavigate();
  // AuthContext에서 setAccessToken 함수 가져오기
  const { setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("Received code:", code);

    if (code) {
      axiosInstance.get(`/nonestep/member/login/callback/naver?code=${code}`)
        .then(response => {
          // 액세스 토큰을 메모리(Context)에 저장
          setAccessToken(response.data.accessToken);

          // axios 인스턴스의 기본 헤더 설정
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

          navigate('/'); // 로그인 성공시 메인으로 리디렉트
        })
        .catch(error => {
          console.error('네이버 로그인 오류', error);
          alert('네이버 로그인에 실패했습니다. 다시 시도해 주세요.');
          navigate('/login'); // 에러 시 로그인 페이지로 리디렉트
        });
    } else {
      console.error("인증 코드가 없습니다");
      alert('로그인 정보가 올바르지 않습니다. 다시 시도해 주세요.');
      navigate('/login');
    }
  }, [navigate, setAccessToken]);

  return <span>네이버 로그인 처리 중...</span>;
};

export default NaverCallback;