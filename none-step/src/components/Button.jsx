import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  width: 100%;
  height: 50px;
  padding-block: 1.6rem;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 1.5rem;
  font-size: 1.6rem;

  // 버튼이 비활성화 상태일 때
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

const Button = ({submitMessage, disabled, onClick, children}) => {

  return (
    <Btn disabled={disabled} onClick={onClick}> {submitMessage || children} </Btn>
  )
}

export default Button