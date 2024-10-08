import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
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

const InputForm = React.memo(({ label, type, placeholder, value, onValidationChange, onChange, className, password }) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value || ''; // 빈 문자열을 기본값으로 사용
    setInternalValue(newValue);

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
        valid = newValue === password;
        break;
      case "이름":
        valid = newValue.trim().length >= 2;
        break;
      case "휴대폰 번호":
        valid = /^\d{11}$/.test(newValue);
        break;
      case "닉네임":
        valid = newValue.length <= 8 && !/\s/.test(newValue);
        break;
      case "인증번호":
        valid = newValue.length > 0; // 인증번호는 비어있지 않으면 유효
        break;
      default:
        valid = true;
    }

    setIsValid(valid);

    if (typeof onValidationChange === 'function') {
      onValidationChange(valid, newValue); // isValid와 newValue 모두 전달
    }

    if (typeof onChange === 'function') {
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
      case "닉네임":
        return "닉네임은 8글자 이하로 입력해주세요. 공백은 사용할 수 없습니다.";
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
          value={internalValue}
          onChange={handleChange}
        />
      </InputWrap>
      <ErrorMessageWrap>
        {!isValid && internalValue.length > 0 && (
          <div>{errorMessage}</div>
        )}
      </ErrorMessageWrap>
    </Wrap>
  );
});

export default InputForm;