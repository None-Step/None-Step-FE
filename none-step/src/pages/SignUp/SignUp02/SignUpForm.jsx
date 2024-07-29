import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputWrap, PageTitle, SubmitBut } from './SignUpForm.style';
import LoginWrap from '../../../components/LoginWrap';
import Logo from '../../../components/Logo';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Button';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberID: '',
    memberPass: '',
    memberName: '',
    memberMail: '',
    memberPhone: '',
    confirmPassword: '',
  });
  const [formValidations, setFormValidations] = useState({
    memberID: false,
    memberPass: false,
    confirmPassword: false,
    memberName: false,
    memberMail: false,
    memberPhone: false,
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationTimeout, setVerificationTimeout] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');  // 인증번호를 저장할 상태
  const [idCheckPassed, setIdCheckPassed] = useState(false);

  useEffect(() => {
    if (verificationSent) {
      const timeout = setTimeout(() => {
        setVerificationMessage('인증번호 유효 시간이 초과되었습니다. 다시 시도해주세요');
        setVerificationTimeout(true);
        setVerificationSent(false);
      }, 180000); // 3분 후 타임아웃

      return () => clearTimeout(timeout);
    }
  }, [verificationSent]);

  const handleValidationChange = (isValid, name, value) => {
    setFormValidations(prev => ({ ...prev, [name]: isValid }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => Object.values(formValidations).every(Boolean);


  return (
    <LoginWrap>
      <Logo />
      <PageTitle>회원가입</PageTitle>

      <InputWrap>
        <InputForm label="아이디" type="text" 
        name="memberID" placeholder="아이디" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberID', value)} />
        <SubmitBut disabled={!formValidations.memberID || idCheckPassed}>확인</SubmitBut>
      </InputWrap>

        <InputForm label="비밀번호" type="password" 
        name="memberPass" placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberPass', value)} />
        <InputForm label="비밀번호 확인" type="password" 
        name="confirmPassword" placeholder="비밀번호 확인" password={formData.memberPass} onValidationChange={(isValid, value) => handleValidationChange(isValid, 'confirmPassword', value)} />
        <InputForm label="이름" type="text" 
        name="memberName" placeholder="이름" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberName', value)} />
        <InputForm label="이메일" type="email" 
        name="memberMail" placeholder="이메일" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberMail', value)} />
      <InputWrap>
      <InputForm label="휴대폰 번호" type="text" 
        name="memberPhone" placeholder="휴대폰 번호" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberPhone', value)} />
        <SubmitBut disabled={!formValidations.memberPhone || verificationSent}>
          {verificationSent ? '재발송' : '인증'}
        </SubmitBut>
      </InputWrap>
      <InputForm label="인증번호" type="text" placeholder="인증번호 입력" value={verificationCode} onValidationChange={(isValid, value) => setVerificationCode(value)} />
      <Button onClick={handleValidationChange} disabled={!isFormValid()} submitMessage="회원가입"></Button>
      {verificationMessage && <p>{verificationMessage}</p>}
    </LoginWrap>
  );
};

export default SignUpForm;