import React from 'react'
import styled from 'styled-components'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import { theme } from '../styles/Theme'

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
  background-color: ${(props) => props.theme.gray06};
`

const Logo = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
`

const Login = () => {
  return (
    <LoginWrap>
      <Logo>이호선</Logo>
      <InputForm></InputForm>
      <InputForm></InputForm>
      <Button></Button>
    </LoginWrap>



  )
}

export default Login
