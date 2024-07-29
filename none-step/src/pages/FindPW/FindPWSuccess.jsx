import React from 'react'
import { Container, Description } from '../../components/CommonStyles'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';

const FindPWSuccess = () => {
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

export default FindPWSuccess