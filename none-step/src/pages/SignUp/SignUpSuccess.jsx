import React from 'react'
import styled from 'styled-components'
import Logo from '../../components/Logo';
import { SignActionSpan } from '../Login/Login.style';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 304px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled(SignActionSpan)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray01};
  cursor: auto;
`;

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