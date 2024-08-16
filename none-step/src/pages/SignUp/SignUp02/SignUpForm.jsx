import React, { useState, useEffect, act } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputWrap, PageTitle, SubmitBut } from './SignUpForm.style';
import LoginWrap from '@/components/LoginWrap';
import Logo from '@/components/Logo';
import InputForm from '@/components/InputForm';
import Button from '@/components/Button';
import axiosInstance from '@/apis/axiosInstance';
import { SignActionSpan, Wrapper } from '../../Login/Login.style';
import MenuBar from '@/components/menuBar/MenuBar';

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
  const [verificationCodeLength, setVerificationCodeLength] = useState(0);  // 인증번호 일치 확인용 verificationCode 길이 상태


  const handleValidationChange = (isValid, value, name) => {
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
          setCheckVerificationCode(response.data.authenticationNumber);
          setVerificationCodeLength(response.data.authenticationNumber.length); // 인증 코드 길이 설정
          setShowVerificationMessage(true);
          setVerificationSent(true);
          setVerificationPassed(false); // 새로운 인증 코드 발급 => 인증 상태 초기화
        })
        .catch((error) => {
          console.log(error);
          alert("인증번호 발송에 실패했습니다.");
        })
    }
  }

  // 인증 코드 검증
  useEffect(() => {
    if (verificationSent && 
        verificationCode.length === verificationCodeLength && 
        !verificationPassed && 
        verificationCode !== '' && 
        checkVerificationCode !== '') {
      
      const isVerified = verificationCode === checkVerificationCode;
      setVerificationPassed(isVerified);
      
      // 상태 업데이트 후 비동기적으로 알림 표시
      setTimeout(() => {
        alert(isVerified ? "인증이 완료되었습니다." : "인증번호가 일치하지 않습니다. 다시 확인해주세요.");
      }, 0);
    }
  }, [verificationCode, checkVerificationCode, verificationPassed, verificationCodeLength, verificationSent]);
  
  // 인증 코드 입력 처리 함수
  const handleVerificationCodeChange = (isValid, value) => {
    setVerificationCode(value);
  };

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


  // 회원가입 폼 제출
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid() && idCheckPassed && verificationPassed) {

      const apiFormData = {
        memberID: formData.memberID,
        memberPass: formData.memberPass,
        memberName: formData.memberName,
        memberMail: formData.memberMail,
        memberPhone: formData.memberPhone
      };
  
      // 모든 검증을 통과한 경우
      axiosInstance
        .post('/nonestep/member/signup', apiFormData)
        .then((response) => {
          if (response.data.memberID) {
            navigate('/signup/success');
          } else {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
          }
        })
        .catch((error) => {
          console.error('회원가입 오류:', error);
          alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        });
    } else {
      alert('모든 필드를 올바르게 입력하고 인증을 완료해주세요.');
    }
  };

  return (
    <Wrapper>
    <LoginWrap>
      <Logo />
      <PageTitle>회원가입</PageTitle>

      <InputWrap>
        <InputForm label="아이디" type="text" 
        name="memberID" placeholder="아이디"
        onValidationChange={(isValid, value) => handleValidationChange(isValid, value, 'memberID')} />
        <SubmitBut onClick={checkIdAvailability}
        disabled={!formValidations.memberID || idCheckPassed}>확인</SubmitBut>
      </InputWrap>

        <InputForm label="비밀번호" type="password" 
        name="memberPass" placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
        onValidationChange={(isValid, value) => handleValidationChange(isValid, value, 'memberPass')} />
        <InputForm label="비밀번호 확인" type="password" 
        name="confirmPassword" placeholder="비밀번호 확인"
        password={formData.memberPass}
        onValidationChange={(isValid, value) => handleValidationChange(isValid, value,'confirmPassword')} />
        <InputForm label="이름" type="text" 
        name="memberName" placeholder="이름"
        onValidationChange={(isValid, value) => handleValidationChange(isValid, value, 'memberName')} />
        <InputForm label="이메일" type="email" 
        name="memberMail" placeholder="이메일"
        onValidationChange={(isValid, value) => handleValidationChange(isValid, value, 'memberMail')} />
      <InputWrap>
        <InputForm label="휴대폰 번호" type="text" 
          name="memberPhone" placeholder="휴대폰 번호"
          onValidationChange={(isValid, value) => handleValidationChange(isValid, value, 'memberPhone')} />
        <SubmitBut onClick={sendVerificationCode}
          disabled={!formValidations.memberPhone || verificationSent}>
          {verificationSent ? '재발송' : '인증'}
        </SubmitBut>
      </InputWrap>

      <InputForm label="인증번호" type="text" 
      placeholder="인증번호 입력" value={verificationCode} 
      onValidationChange={handleVerificationCodeChange}
      />
      { showVerificationMessage &&
        <SignActionSpan>
          인증번호가 발송되었습니다. 3분 이내로 인증번호를 입력해주세요.
        </SignActionSpan>
      }
      {verificationMessage && <SignActionSpan>{verificationMessage}</SignActionSpan>}

      <Button onClick={handleSubmit} disabled={!isFormValid()} submitMessage="회원가입"></Button>
    </LoginWrap>

    <MenuBar/>
    </Wrapper>

  );
};

export default SignUpForm;