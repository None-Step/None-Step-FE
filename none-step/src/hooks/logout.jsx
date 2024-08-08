import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/memberSlice';
import axiosInstance from '@/apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      // 1. 서버에 로그아웃 요청
      await axiosInstance.get('/nonestep/member/logout');

      // 2. 리덕스 스토어에서 사용자 정보 제거
      dispatch(logout());

      // 3. 세션 스토리지에서 관련 데이터 제거
      sessionStorage.removeItem('persist:root');
      sessionStorage.removeItem('accessToken');

      // 4. axios 인스턴스의 기본 헤더에서 Authorization 제거
      delete axiosInstance.defaults.headers.common['Authorization'];

      // 5. 쿠키 제거 (HttpOnly 쿠키는 서버에서 처리해야 함)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // 6. 로그인 페이지로 리다이렉트
      alert('정상적으로 로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [dispatch, navigate]);

  return handleLogout;
};

export default useLogout;