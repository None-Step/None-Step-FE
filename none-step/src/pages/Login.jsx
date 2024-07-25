import React from 'react'
import styled from 'styled-components'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import SocialButton from '../components/SocialButton'
import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import LoginWrap from '../components/LoginWrap'

const HrWrap = styled.div`
  width: 100%;
  height: 5rem;
  position: relative;
  margin-block : 1rem .8rem;
`;

const Hr = styled.hr`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray05};
  position: absolute;
  top: 50%;
  border: none;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.gray02};
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 0.5rem;
  font-size: 1.2rem;

`;

const SignAction = styled.p`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size : 1.2rem;
  color: ${(props) => props.theme.colors.gray01};
  margin-top: 2rem;
`;

const SignActionSpan = styled.span`
  margin-inline : 0.5rem;
  cursor: pointer;
`;


const Login = () => {
    // useEffect 훅으로 valid값이 변경될 때마다 버튼 활성화 여부 결정
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    useEffect(() => {
      if (emailValid && passwordValid) {
        setButtonDisabled(false);
        return;
      } else {
        setButtonDisabled(true);
      }
    }, [emailValid, passwordValid]);

  return (
    <LoginWrap>
      <Logo/>
      <InputForm
        label="아이디"
        type="text" 
        placeholder="아이디를 입력하세요"
        onValidationChange={setEmailValid} // 유효성 결과 전달
      ></InputForm>
      <InputForm 
        label="비밀번호" 
        type="password" 
        placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
        onValidationChange={setPasswordValid} // 유효성 결과 전달
        ></InputForm>
      <Button disabled={buttonDisabled} submitMessage="로그인"></Button>

      <HrWrap>
        <Hr></Hr>
        <Span>또는</Span>
      </HrWrap>

      <SocialButton type='kakao'/>
      <SocialButton type='naver'/>
      
      <SignAction>
        <SignActionSpan>아이디 찾기</SignActionSpan>
        |
        <SignActionSpan>비밀번호 찾기</SignActionSpan>
        |
        <SignActionSpan>회원가입</SignActionSpan>
      </SignAction>

      <SignAction>
        <SignActionSpan>이용약관안내</SignActionSpan>
        <SignActionSpan>개인정보처리방침</SignActionSpan>
      </SignAction>
      
    </LoginWrap>

  )
}

export default Login
