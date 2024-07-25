import React from 'react'
import styled from 'styled-components'

const SocialBtnWrap = styled.button`
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.social[props.type]} !important;
  margin-top: 1rem;
`;

const SocialImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 48px;
  object-fit: contain;
`;

const SocialButton = ({type}) => {
  // type에 따라 이미지 경로 결정
  const imagePath = type === 'kakao' ? 'src/assets/img/kakao_login.png' : 'src/assets/img/naver_login.png';

  return (
    <SocialBtnWrap type={type}>
      <SocialImg src = {imagePath} alt={type} />
    </SocialBtnWrap>
  )
}

export default SocialButton