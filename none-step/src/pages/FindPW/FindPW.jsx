import React from 'react'
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
  return (
    <LoginWrap>
      <Logo/>
      <PageTitle>비밀번호 재설정하기</PageTitle>

      <InputForm
          label="이름"
          type="text" 
          placeholder="이름"
        />
      <InputForm
          label="아이디"
          type="text" 
          placeholder="아이디"
        />
      <InputWrap>
        <InputForm
          label="휴대폰 번호"
          type="text" 
          placeholder="휴대폰 번호"
        />
        <SubmitBut>인증</SubmitBut>
      </InputWrap>
      <InputForm
        label="인증번호 확인" 
        type="text" 
        placeholder="인증번호 확인"
        value={Number}
      />
      <Button submitMessage="확인"></Button>
      
      <SignAction>
        <SignActionSpan>아이디를 잊으셨나요?</SignActionSpan>
        <PrimaryLink to="/">아이디 찾기</PrimaryLink>
      </SignAction>
    </LoginWrap>
    
  )
}

export default FindPW