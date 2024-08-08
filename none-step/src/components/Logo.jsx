import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import logoImage from '@/assets/img/logo.svg';

const LogoCustom = styled.h1`
  margin-bottom: 2rem;
`;

const Logo = () => {
  return (
    <LogoCustom>
      <Link to='/'>
        <img src={logoImage} alt='로고'/>
      </Link>
    </LogoCustom>
  )
}

export default Logo