import React from 'react'
import styled from 'styled-components'
import Logo from '../../components/Logo';
import { SignActionSpan } from '../Login/Login.style';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/CommonStyles';
import { Description } from '../../components/CommonStyles';


const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <Container>
      <Logo/>
      <Description>
        회원가입이 완료되었습니다.
      </Description>
      <Description>
        새로운 계정으로 서비스를 이용해보세요.
      </Description>
      <Button onClick={handleLoginRedirect} submitMessage="로그인하기"/>
    </Container>
  )
}

export default SignUpSuccess