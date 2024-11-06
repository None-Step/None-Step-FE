import React, { useState, useEffect } from 'react'
import LoginWrap from '@/components/LoginWrap'
import Logo from '@/components/Logo'
import { PageTitle, InputWrap, MarginInputForm, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '@/components/InputForm'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { SignAction, SignActionSpan, Wrapper } from '../Login/Login.style'
import axiosInstance from '@/apis/axiosInstance'
import MenuBar from '@/components/menuBar/MenuBar'
import { PrimaryLink } from '../FindPW/FindPW'

const FindID = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [checkVerificationCode, setCheckVerificationCode] = useState('');
  const [verificationPassed, setVerificationPassed] = useState(false);
  const [verificationCodeLength, setVerificationCodeLength] = useState(0);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [verificationButtonDisabled, setVerificationButtonDisabled] = useState(true);

  const navigate = useNavigate();

  // 이름, 휴대폰 번호의 유효성에 따라 버튼 활성화 상태 변경하기
  useEffect(() => {
    if (idValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [idValid, phoneNumberValid]);

  // 인증번호 발송하기
  const sendVerificationCode = (event) => {
    event.preventDefault();
  
    if(phoneNumber) {
      axiosInstance
        .post(`/nonestep/member/phone`, {
          memberPhone: phoneNumber
        })
        .then((response) => {
          setCheckVerificationCode(response.data.authenticationNumber);
          setVerificationCodeLength(response.data.authenticationNumber.length);
          setShowVerificationMessage(true);
          setVerificationSent(true);
          setVerificationPassed(false);
          setVerificationMessage(''); // 기존 메시지 초기화
        })
        .catch((error) => {
          console.log(error);
          alert("인증번호 발송에 실패했습니다.");
        })
    }
  }

  // 인증번호 입력값 변경 처리하기
  const handleVerificationCodeChange = (isValid, value) => {
    setVerificationCode(value);
    setVerificationButtonDisabled(value.length === 0);
  };

  // 인증번호 확인하기
  const verifyCode = () => {
    if (verificationCode === checkVerificationCode) {
      setVerificationPassed(true);
      alert("인증이 완료되었습니다.");
    } else {
      setVerificationPassed(false);
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  // 인증번호 유효 시간 체크하기
  useEffect(() => {
    if (verificationSent) {
      const timeout = setTimeout(() => {
        setVerificationMessage('인증번호 유효 시간이 초과되었습니다. 다시 시도해주세요');
        setVerificationSent(false);
        setShowVerificationMessage(false);
      }, 180000);

      return () => clearTimeout(timeout);
    }
  }, [verificationSent]);

  // 아이디 찾기 폼 제출하기
  const handleSubmit = (event) => {
    event.preventDefault();

    const apiFormData = {
      memberName : name,
      memberPhone : phoneNumber
    }

    axiosInstance
    .post('/nonestep/member/idfind', apiFormData)
    .then((response) => {
      if(response.data.length > 0) {
        navigate('/findid/success', { state: { foundIDs: response.data } });
      } else {
        alert('본 개인정보와 일치하는 가입정보가 없습니다.');
      }
    })
    .catch((error) => {
      console.log('아이디 찾기 오류:', error);
      if (error.response && error.response.status === 400) {
        alert('입력하신 정보와 일치하는 아이디가 없습니다.');
      } else {
        alert('아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    })
  };

  return (
    <Wrapper>
      <LoginWrap>
        <Logo/>
        <PageTitle>아이디 찾기</PageTitle>
        <InputForm
          label="이름" 
          type="text" 
          placeholder="이름"
          onValidationChange={(isValid, value) => {
            setIdValid(isValid);
            setName(value);
          }}
        />
        <InputWrap>
          <InputForm
            label="휴대폰 번호"
            type="text" 
            placeholder="휴대폰 번호"
            onValidationChange={(isValid, value) => {
              setPhoneNumberValid(isValid);
              setPhoneNumber(value);
            }}
          />
          <SubmitBut onClick={sendVerificationCode}
          disabled={!phoneNumberValid}>
            {verificationSent ? '재발송' : '인증'}
          </SubmitBut>
        </InputWrap>
        
        <InputWrap>
          <InputForm
            label="인증번호" 
            type="text" 
            placeholder="인증번호 입력"
            value={verificationCode}
            onValidationChange={handleVerificationCodeChange}
          />
          <SubmitBut 
            onClick={verifyCode} 
            disabled={verificationButtonDisabled || !verificationSent || verificationPassed}
          >
            확인
          </SubmitBut>
        </InputWrap>

        {showVerificationMessage && (
          <SignActionSpan>
            인증번호가 발송되었습니다. 3분 이내로 인증번호를 입력해주세요.
          </SignActionSpan>
        )}
        {verificationMessage && <SignActionSpan>{verificationMessage}</SignActionSpan>}

        <Button 
          onClick={handleSubmit} 
          disabled={buttonDisabled || !verificationPassed} 
          submitMessage="아이디 찾기"
        />

        <SignAction>
          <SignActionSpan>비밀번호를 잊으셨나요?</SignActionSpan>
          <PrimaryLink to="/findpw">비밀번호 찾기</PrimaryLink>
        </SignAction>
      </LoginWrap>

      <MenuBar/>
    </Wrapper>
  )
}

export default FindID