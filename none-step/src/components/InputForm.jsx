import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';

const Wrap = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding :0.4rem 1.2rem 1.0rem 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.gray04};
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.white};
  transition: border .4s;
  margin-top: 0.5rem;

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
  color : ${(props) => props.theme.colors.black};
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

const InputForm = ({ label, type, placeholder, onValidationChange }) => {
  // input value값
  const [val, setVal] = useState('');
  // 유효성 검사
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setVal(newValue);
    let valid = false;
    if (label === "아이디") {
      valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(newValue);
    } else if (label === "비밀번호") {
      valid = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\$begin:math:text$\\$end:math:text$\-_=+]).{8,20}$/.test(newValue);
    }
    setIsValid(valid);
    onValidationChange(valid);
  };

  // 라벨에 따라 에러 메시지 결정
  const errorMessage = label === "아이디" 
  ? "올바른 이메일을 입력해주세요."
  : "대/소문자, 특수문자, 숫자 포함 8자리 이상, 20자리 이하";

  return (
    <Wrap>
      <InputWrap>
        <Label>{label}</Label>
        <InputText
          type={type}
          placeholder={placeholder}
          value={val}
          onChange={handleChange}/>
      </InputWrap>
      <ErrorMessageWrap>
        {
          // 유효성 검사를 통과하지 못하거나, 값이 없는 경우에만 오류 메시지 띄우기
          !isValid && val.length > 0 && (
            <div>{errorMessage}</div>
          )
        }
      </ErrorMessageWrap>
    </Wrap>
  )
}

export default InputForm
