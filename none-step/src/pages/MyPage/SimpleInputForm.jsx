import React from 'react';
import styled from 'styled-components';

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

const SimpleInputForm = ({ label, type, placeholder, value, onChange }) => {
  return (
    <InputWrap>
      <Label>{label}</Label>
      <InputText
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputWrap>
  );
};

export default SimpleInputForm;