import React, { useState,useEffect } from 'react'
import LoginWrap from '../../components/LoginWrap'
import { InputWrap, PageTitle, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '../../components/InputForm'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { SignAction, SignActionSpan } from '../Login/Login.style'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PrimaryLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
`;

const FindPW = () => {
  const [nameValid, setNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // 유효성 검사 모두 pass되면 버튼 활성화하기
  useEffect(() => {
    if (nameValid && idValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nameValid, idValid, phoneNumberValid]);

  return (
    <LoginWrap>
      <Logo/>
      <PageTitle>비밀번호 재설정하기</PageTitle>

      <InputForm
          label="이름"
          type="text" 
          placeholder="이름"
          onValidationChange={setNameValid}
        />
      <InputForm
          label="아이디"
          type="text" 
          placeholder="아이디"
          onValidationChange={setIdValid}
        />
      <InputWrap>
        <InputForm
          label="휴대폰 번호"
          type="text" 
          placeholder="휴대폰 번호"
          onValidationChange={setPhoneNumberValid}
        />
        <SubmitBut>인증</SubmitBut>
      </InputWrap>
      <InputForm
        label="인증번호 확인" 
        type="text" 
        placeholder="인증번호 확인"
        value={Number}
      />
      <Button disabled={buttonDisabled} submitMessage="확인"></Button>
      
      <SignAction>
        <SignActionSpan>아이디를 잊으셨나요?</SignActionSpan>
        <PrimaryLink to="/">아이디 찾기</PrimaryLink>
      </SignAction>
    </LoginWrap>
    
  )
}

export default FindPW