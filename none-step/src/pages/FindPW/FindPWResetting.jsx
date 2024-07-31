import React, { useState, useEffect } from 'react'
import LoginWrap from '../../components/LoginWrap'
import Logo from '../../components/Logo'
import { Description } from '../../components/CommonStyles'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import styled from 'styled-components'

const MarginDescription = styled(Description)`
  margin-bottom: 3rem;
`;

const FindPWResetting = () => {
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPassword,setconfirmPassword] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (passwordValid && confirmPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordValid, confirmPassword]);

  return (
    <LoginWrap>
      <Logo/>
      <Description>본인 인증이 완료되었습니다.</Description>
      <MarginDescription>새로운 비밀번호를 설정해주세요.</MarginDescription>

      <InputForm 
        label="비밀번호" 
        type="password" 
        placeholder="새 비밀번호 입력"
        onValidationChange={setPasswordValid} // 유효성 결과 전달
        />
      <InputForm 
        label="비밀번호 확인" 
        type="password" 
        placeholder="새 비밀번호 확인"
        onValidationChange={setPasswordValid} // 유효성 결과 전달
        />
        <Button disabled={buttonDisabled} submitMessage="저장"></Button>
    </LoginWrap>
  )
}

export default FindPWResetting