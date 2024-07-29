import React, { useEffect } from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  width: 100%;
  padding-block: 1.6rem;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 1.5rem;

  // 버튼이 비활성화 상태일 때
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

const Button = ({submitMessage, disabled, onClick}) => {

  return (
    <Btn disabled={disabled} onClick={onClick}> {submitMessage} </Btn>
  )
}

export default Button