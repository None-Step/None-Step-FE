import React from 'react'
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Description } from '../../components/CommonStyles';
import { Wrapper } from '../Login/Login.style';
import MenuBar from '../../components/menuBar/MenuBar';


const SignUpSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
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

      <MenuBar/>
    </Wrapper>
  )
}

export default SignUpSuccess