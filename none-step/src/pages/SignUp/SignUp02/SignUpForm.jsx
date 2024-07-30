import React, { useState, useEffect, act } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputWrap, PageTitle, SubmitBut } from './SignUpForm.style';
import LoginWrap from '../../../components/LoginWrap';
import Logo from '../../../components/Logo';
import InputForm from '../../../components/InputForm';
import Button from '../../../components/Button';
import axiosInstance from '../../../apis/axiosInstance';
import { Description } from '../../../components/CommonStyles';
import { SignActionSpan } from '../../Login/Login.style';

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
    memberName: false,
    memberMail: false,
    memberPhone: false,
    confirmPassword: false,

  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationTimeout, setVerificationTimeout] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [checkVerificationCode, setCheckVerificationCode] = useState('');
  const [verificationPassed, setVerificationPassed] = useState(false);
  const [idCheckPassed, setIdCheckPassed] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);


  // 입력 폼 유효성 검사
  const handleValidationChange = (event, isValid, name, value) => {
    event.preventDefault();
    
    // 유효성 상태 갱신
    setFormValidations(prev => ({ ...prev, [name]: isValid }));
    // 필드 값 갱신
    setFormData(prev => ({ ...prev, [name]: value }));

    // 변경된 필드가 아이디 필드면, 아이디 중복 검사 상태 초기화
    if(name === 'memberID') {
      setIdCheckPassed(false);
    }
  };

  // 모든 필드가 유효한지 검사하고 모든 원소가 조건을 만족하면 true 반환하기
  const isFormValid = () => Object.values(formValidations).every(Boolean);

  // 아이디 중복 검사
  const checkIdAvailability = (event) => {
    event.preventDefault();

    if(formData.memberID) {
      axiosInstance
        .get(`/nonestep/member/idcheck?memberID=${formData.memberID}`)
        .then((response) => {
          if (response.data) {
            alert("사용 가능한 아이디입니다.");
            setIdCheckPassed(true);
          } else {
            alert("이미 사용중인 아이디입니다.");
            setIdCheckPassed(false);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("아이디 검사에 실패했습니다.");
          setIdCheckPassed(false);
        });
    }
  }

  // 휴대폰 인증번호 요청
  const sendVerificationCode = (event) => {
    event.preventDefault();

    if(formData.memberPhone) {
      axiosInstance
        .post(`/nonestep/member/phone`, {
          memberPhone : formData.memberPhone
        })
        .then((response) => {
          // 응답 받은 값을 인증번호 체크 setter에 넣어줌
          setCheckVerificationCode(response.data.authenticationNumber);
          setShowVerificationMessage(true); // 메시지 표시
          setVerificationSent(true); // 인증번호 전송 상태 변경
        })
        .catch((error) => {
          onsole.log(error);
          alert("인증번호 검증에 실패했습니다.");
        })
    }
  }

  const verificationPassedCheck = () => {
    if (verificationCode === checkVerificationCode) {
      setVerificationPassed(true);
      alert("인증 되었습니다.");
    } else {
      setVerificationPassed(false);
      alert("인증번호가 일치하지 않습니다.");
    }
  }
  

  useEffect(() => {
    // 인증번호가 전송된 경우 실행되고, 3분 후 타임아웃 되기
    if (verificationSent) {
      const timeout = setTimeout(() => {
        setVerificationMessage('인증번호 유효 시간이 초과되었습니다. 다시 시도해주세요');
        setVerificationTimeout(true);
        // 인증번호 전송 상태 false로 변경
        setVerificationSent(false);
        setVerificationSent(false);
        setShowVerificationMessage(false); // 메시지 숨기기
      }, 180000);

      // 타이머 중복 실행 방지
      return () => clearTimeout(timeout);
    }
  }, [verificationSent]);



  return (
    <LoginWrap>
      <Logo />
      <PageTitle>회원가입</PageTitle>

      <InputWrap>
        <InputForm label="아이디" type="text" 
        name="memberID" placeholder="아이디" onValidationChange={(isValid, value) => handleValidationChange(isValid, 'memberID', value)} />
        <SubmitBut onClick={checkIdAvailability}
        disabled={!formValidations.memberID || idCheckPassed}>확인</SubmitBut>
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
        <SubmitBut onClick={sendVerificationCode}
          disabled={!formValidations.memberPhone || verificationSent}>
          {verificationSent ? '재발송' : '인증'}
        </SubmitBut>
      </InputWrap>
      <InputForm label="인증번호" type="text" 
      placeholder="인증번호 입력" value={verificationCode} 
      onValidationChange={(isValid, value) => setVerificationCode(value)} />
      { showVerificationMessage &&
        <SignActionSpan>
          인증번호가 발송되었습니다. 3분 이내로 인증번호를 입력해주세요.
        </SignActionSpan>
      }

      <Button onClick={handleValidationChange} disabled={!isFormValid()} submitMessage="회원가입"></Button>
      {verificationMessage && <p>{verificationMessage}</p>}
    </LoginWrap>
  );
};

export default SignUpForm;