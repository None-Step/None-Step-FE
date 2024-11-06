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

const InputForm = React.memo(({ 
  label, 
  type, 
  placeholder, 
  value, 
  onValidationChange, 
  onChange, 
  className, 
  password 
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isValid, setIsValid] = useState(true);

  // value prop이 변경될 때 internalValue 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    // 원래 입력값 저장
    const inputValue = e.target.value;
    
    // 입력된 값 그대로 internal state에 저장 (공백 유지)
    setInternalValue(inputValue);
    
    // 유효성 검사를 위한 값 (공백 제거)
    const processedValue = inputValue.replace(/\s/g, '');
    
    let valid = false;

    if (processedValue === '') {
      valid = false;
    } else {
      switch (label) {
        case "아이디":
          valid = /^[A-Za-z0-9]{4,12}$/.test(processedValue);
          break;
        case "이메일":
          valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(processedValue);
          break;
        case "비밀번호":
          valid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$`~!@$!%*#^?&\-_=+]).{8,20}$/.test(processedValue);
          break;
        case "비밀번호 확인":
          valid = processedValue === password;
          break;
        case "이름":
          valid = processedValue.length >= 2;
          break;
        case "휴대폰 번호":
          valid = /^\d{11}$/.test(processedValue);
          break;
        case "닉네임":
          valid = processedValue.length <= 8;
          break;
        case "인증번호":
          valid = processedValue.length > 0;
          break;
        default:
          valid = true;
      }
    }

    setIsValid(valid);

    // 부모 컴포넌트에 처리된 값(공백 제거된)과 유효성 상태 전달
    if (onValidationChange) {
      onValidationChange(valid, processedValue);
    }

    // 부모 컴포넌트에 처리된 값(공백 제거된) 전달
    if (onChange) {
      onChange(processedValue);
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