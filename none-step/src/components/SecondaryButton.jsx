import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  width: 100%;
  padding-block: 1.6rem;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  margin-top: 1.5rem;
  font-size: 1.6rem;

  // 버튼이 비활성화 상태일 때
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

const SecondaryButton = ({submitMessage, disabled, onClick, children}) => {

  return (
    <Btn disabled={disabled} onClick={onClick}> {submitMessage || children} </Btn>
  )
}

export default SecondaryButton