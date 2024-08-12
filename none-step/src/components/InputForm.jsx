import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Wrap = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.4rem 1.2rem 1.0rem 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.gray04};
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.white};
  transition: border .4s;
  margin-top: 0.5rem;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.gray01};
  }

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
  color: ${(props) => props.theme.colors.black};
  transform: translate(0, -25%);
  transition: all .4s;

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

const InputForm = ({ label, type, placeholder, onValidationChange, onChange, className, password }) => {
  const [val, setVal] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setVal(newValue);
    let valid = false;

    switch (label) {
      case "아이디":
        valid = /^[A-Za-z0-9]{4,12}$/.test(newValue);
        break;
      case "이메일":
        valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(newValue);
        break;
      case "비밀번호":
        valid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$`~!@$!%*#^?&\-_=+]).{8,20}$/.test(newValue);
        break;
      case "비밀번호 확인":
        valid = newValue === password; // `password`는 현재 비밀번호 상태값
        break;
      case "이름":
        valid = newValue.trim().length >= 2;
        break;
      case "휴대폰 번호":
        valid = /^\d{11}$/.test(newValue);
        break;
      default:
        valid = false;
    }

    setIsValid(valid);
    onValidationChange(valid, newValue);
    // onChange 함수를 사용하는 경우에만 값 반환하기
    if (onChange && typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const errorMessage = (() => {
    switch (label) {
      case "아이디":
        return "아이디는 4-12자의 영문 및 숫자만 가능합니다.";
      case "이메일":
        return "올바른 이메일 형식을 입력해주세요.";
      case "비밀번호":
        return "대/소문자, 특수문자, 숫자 포함 8자리 이상, 20자리 이하";
      case "비밀번호 확인":
        return "비밀번호가 일치하지 않습니다.";
      case "이름":
        return "이름은 최소 2글자 이상이어야 합니다.";
      case "휴대폰 번호":
        return "휴대폰 번호는 숫자 11자리를 입력해주세요.";
      default:
        return "";
    }
  })();

  
  return (
    <Wrap>
      <InputWrap className={className}>
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