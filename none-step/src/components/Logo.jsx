import React from 'react'
import styled from 'styled-components'

const LogoCustom = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Logo = () => {
  return (
    <LogoCustom>이호선</LogoCustom>
  )
}

export default Logo