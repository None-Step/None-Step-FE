import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding :0.4rem 1.2rem 1.0rem 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.gray04};
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.white};
  transition: border .4s;

  //focus-within : css의 가상 클래스, 이 가상 클래스는 해당 요소 또는 그 자식 요소 중 어느 하나라도 포커스 상태일 때 선택된다.
  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.gray01};
  }

  // InputWrap이 focus 되면 label이 밑에서 올라오기
  &:focus-within Label {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.gray01};
  opacity: 0;
  transform: translate(0, 50%);
  transition: all .4s;
`;

const InputText = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color : ${(props) => props.theme.colors.gray01};
  transform: translate(0, -25%);
  transition: all .4s;

  // input이 focus되면 내려가기(label과 자리 맞춤)
  &:focus {
    transform: translate(0, 0%);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray02};
  }
`;

const ErrorMessageWrap = styled.div`
  margin-top: 0.4rem;
  color: #AF2323;
  font-size: 1.2rem;
`;

const InputForm = ({label, type, placeholder}) => {
  return (
    <Wrap>
      <InputWrap>
        <Label>{label}</Label>
        <InputText type={type} placeholder={placeholder}/>
      </InputWrap>
      <ErrorMessageWrap>
        형식을 올바르게 입력해주세요.
      </ErrorMessageWrap>
    </Wrap>
  )
}

export default InputForm
