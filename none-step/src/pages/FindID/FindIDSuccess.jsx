import React from 'react'
import styled from 'styled-components'
import { Container, Description } from '../../components/CommonStyles'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { SecondaryButton } from '../../components/CommonStyles'
import { InputWrap } from '../SignUp/SignUp02/SignUpForm.style'

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
  return (
    <Container>
      <Logo/>
      <Description>
        입력한 정보와 일치하는 아이디입니다.
      </Description>

      <IdWrap>
        <InputWrap>
          <Description>아이디</Description>
          <Description>findID</Description>
        </InputWrap>
        <InputWrap>
          <Description>아이디</Description>
          <Description>findID</Description>
        </InputWrap>
      </IdWrap>

      <SecondaryButton submitMessage="비밀번호 재설정하기" />
      <Button submitMessage="로그인하기" />
    </Container>
  )
}

export default FindIDSuccess
