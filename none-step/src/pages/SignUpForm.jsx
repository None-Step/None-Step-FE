import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import LoginWrap from '../components/LoginWrap';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import axios from 'axios';

const PageTitle = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray01};
  margin-bottom: 3rem;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitBut = styled.button`
  width: 80px;
  padding: 1.7rem 2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-left: 0.5rem;

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

const MarginInputForm = styled(InputForm)`
  margin-bottom: 1.5rem;
`;

const SignUpForm = () => {
  //유효성 검사
  const [idValid, setIdValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

  // 입력값 저장
  const [memberID, setMemberID] = useState('');
  const [memberPass, setMemberPass] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberMail, setMemberMail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  

  useEffect(() => {
    setPasswordConfirmValid(password === confirmPassword && password.length > 0); // 비밀번호 일치 여부 검증
  }, [password, confirmPassword]);
  
  useEffect(() => {
    if (idValid && emailValid && passwordValid && nameValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [idValid, emailValid, passwordValid, nameValid, phoneNumberValid]);

  return (
    <LoginWrap>
      <Logo/>
      <PageTitle>회원가입</PageTitle>

      <InputWrap>
        <InputForm
          label="아이디"
          type="text"
          placeholder="아이디"
          value={memberID}
          onValidationChange={setIdValid}
        />
        <SubmitBut>확인</SubmitBut>
      </InputWrap>

      <InputForm 
        label="비밀번호" 
        type="password"
        placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
        value={memberID}
        onChange={(e) => setPassword(e.target.value)}
        onValidationChange={setPasswordValid}
      />

      {/* <MarginInputForm 
        label="비밀번호 확인" 
        type="password" 
        placeholder="비밀번호 확인"
        password={password}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onValidationChange={(isValid) => {
          setPasswordConfirmValid(isValid && password === e.target.value)
        }}
      /> */}

      <MarginInputForm
        label="이름" 
        type="text" 
        placeholder="이름"
        onValidationChange={setNameValid}
      />

      <MarginInputForm
        label="이메일" 
        type="text" 
        placeholder="이메일"
        onValidationChange={setEmailValid} // 이메일 유효성 검사 함수로 수정 필요
      />

      <InputWrap>
        <InputForm
          label="휴대폰 번호"
          type="text" 
          placeholder="휴대폰 번호"
          onValidationChange={setPhoneNumberValid} // 유효성 검사 함수로 수정 필요
        />
        <SubmitBut>인증</SubmitBut>
      </InputWrap>

      <Button disabled={buttonDisabled} submitMessage="회원가입" ></Button>
    </LoginWrap>
  );
}

export default SignUpForm;