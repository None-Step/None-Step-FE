import React from 'react'
import styled from 'styled-components'
import InputForm from '../components/InputForm'
import Button from '../components/Button'

const LoginWrap = styled.div`
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  padding: 3.6rem 1.8rem;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.gray06};
`;

const Logo = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Login = () => {
  return (
    <LoginWrap>
      <Logo>이호선</Logo>
      <InputForm label="아이디" type="text" placeholder="아이디를 입력하세요"></InputForm>
      <InputForm label="비밀번호" type="password" placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"></InputForm>
      <Button disabled={true} submitMessage="로그인"></Button>
    </LoginWrap>

  )
}

export default Login
