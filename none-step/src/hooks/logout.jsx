import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/memberSlice';
import axiosInstance from '../apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            await axiosInstance.get('/nonestep/member/logout');
            dispatch(logout());
            delete axiosInstance.defaults.headers.common['Authorization'];
            navigate('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error('Logout error:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    }, [dispatch, navigate]);

    return handleLogout;
};

export default useLogout;