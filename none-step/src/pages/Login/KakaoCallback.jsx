import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/apis/axiosInstance';
import { login } from '@/store/slices/memberSlice';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
        axiosInstance.get(`/nonestep/member/login/callback/kakao?code=${code}`)
            .then(response => {
                if (response.data.message.toLowerCase() === 'success') {
                    const accessToken = response.headers['Authorization'];
                    if (accessToken) {
                        sessionStorage.setItem('accessToken', accessToken);
                        axiosInstance.defaults.headers.common['Authorization'] = accessToken;
                        return axiosInstance.get('/nonestep/member/info');
                    } else {
                        throw new Error('응답에서 토큰을 찾을 수 없음');
                    }
                } else {
                    throw new Error('로그인 실패');
                }
            })
            .then((response) => {
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
                navigate('/');
            })
            .catch(error => {
                console.error('로그인 에러:', error);
                alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
                navigate('/login');
            });
    } else {
        console.error("인증 코드가 없습니다");
        alert('로그인 정보가 올바르지 않습니다. 다시 시도해 주세요.');
        navigate('/login');
    }
}, [navigate, dispatch]);

  return <span>카카오 로그인 처리 중...</span>;
};

export default KakaoCallback;