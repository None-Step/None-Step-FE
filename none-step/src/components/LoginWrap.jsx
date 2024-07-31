import React from 'react'
import styled from 'styled-components'

const Wrap = styled.form`
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  padding: 3.6rem 1.8rem;
  box-sizing: border-box;
`;

const LoginWrap = ({ children, onSubmit }) => {
  return (
    <Wrap onSubmit={onSubmit}>
      {children}
    </Wrap>
  )
}

export default LoginWrap
