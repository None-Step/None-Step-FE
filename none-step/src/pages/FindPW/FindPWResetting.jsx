import React, { useState, useEffect } from 'react'
import LoginWrap from '../../components/LoginWrap'
import Logo from '../../components/Logo'
import { Description } from '../../components/CommonStyles'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import styled from 'styled-components'
import axiosInstance from '../../apis/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'

const MarginDescription = styled(Description)`
  margin-bottom: 3rem;
`;

const FindPWResetting = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 이전 페이지에서 전달된 데이터를 가져옵니다.
  const { memberID, memberName, memberPhone } = location.state || {};

  useEffect(() => {
    // 이전 페이지에서 전달된 데이터가 없으면 로그인 페이지로 리다이렉트
    if (!memberID || !memberName || !memberPhone) {
      alert('잘못된 접근입니다.');
      navigate('/login');
    }
  }, [memberID, memberName, memberPhone, navigate]);

  useEffect(() => {
    if (passwordValid && confirmPasswordValid && password === confirmPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordValid, confirmPasswordValid, password, confirmPassword]);

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  // 비밀번호 변경 요청 함수
  const handleChangePassword = (event) => {
    event.preventDefault();
    axiosInstance
      .put('/nonestep/member/modify-pass', {
        memberID: memberID,
        memberName: memberName,
        memberPhone: memberPhone,
        memberPass: password
      })
      .then(response => {
        if (response.data && response.data.message.toLowerCase() === "success") {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          navigate('/login'); // 로그인 페이지로 이동
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('비밀번호 변경 오류:', error);
        alert('비밀번호 변경 중 오류가 발생했습니다.');
        console.error('에러 응답:', error.response.data);
        console.error('에러 상태:', error.response.status);
      });
  }

  return (
    <LoginWrap>
      <Logo/>
      <Description>본인 인증이 완료되었습니다.</Description>
      <MarginDescription>새로운 비밀번호를 설정해주세요.</MarginDescription>
      <InputForm
        label="비밀번호"
        type="password"
        placeholder="새 비밀번호 입력"
        onValidationChange={setPasswordValid}
        onChange={handlePasswordChange}
      />
      <InputForm
        label="비밀번호 확인"
        type="password"
        placeholder="새 비밀번호 확인"
        onValidationChange={setConfirmPasswordValid}
        onChange={handleConfirmPasswordChange}
        password={password}
      />
      <Button onClick={handleChangePassword} disabled={buttonDisabled} submitMessage="저장"></Button>
    </LoginWrap>
  )
}

export default FindPWResetting