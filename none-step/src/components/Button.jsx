import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react';

const Btn = styled.button`
  width: 100%;
  padding-block: 1.6rem;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 0.5rem;

  // 버튼이 비활성화 상태일 때
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

const Button = ({submitMessage, disabled}) => {

  return (
    <Btn disabled={disabled}>{submitMessage}</Btn>
  )
}

export default Button