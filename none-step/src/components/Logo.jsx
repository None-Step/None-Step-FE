import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import logoImage from '@/assets/img/header-logo.svg';

const LogoCustom = styled.h1`
  width: 100%;
  max-width: 150px;
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