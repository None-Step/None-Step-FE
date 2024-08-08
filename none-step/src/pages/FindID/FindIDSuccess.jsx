import React from 'react'
import styled from 'styled-components'
import { Container, Description } from '../../components/CommonStyles'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import SecondaryButton from '../../components/SecondaryButton'
import { InputWrap } from '../SignUp/SignUp02/SignUpForm.style'
import { useLocation, useNavigate } from 'react-router-dom'
import { Wrapper } from '../Login/Login.style'
import MenuBar from '../../components/menuBar/MenuBar'

const IdWrap = styled.div`
  width: 100%;
  max-width: 304px;
  background-color: ${(props) => props.theme.colors.gray06};
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  margin-block: 4rem 1.5rem;
`;

const FindIDSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { foundIDs } = location.state || { foundIDs: [] };

  const handleResetPassword = () => {
    navigate('/findPW'); // 비밀번호 재설정 페이지로 이동
  };

  const handleLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Wrapper>
      <Container>
        <Logo/>
        <Description>
          입력한 정보와 일치하는 아이디입니다.
        </Description>
        <IdWrap>
          {foundIDs.map((item, index) => (
            <InputWrap key={index}>
              <Description>아이디</Description>
              <Description>{item.memberID}</Description>
            </InputWrap>
          ))}
        </IdWrap>
        <SecondaryButton submitMessage="비밀번호 재설정하기" onClick={handleResetPassword} />
        <Button submitMessage="로그인하기" onClick={handleLogin} />
      </Container>

      <MenuBar/>

    </Wrapper>
  )
}

export default FindIDSuccess