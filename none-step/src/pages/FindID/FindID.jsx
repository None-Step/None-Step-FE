import React, { useState, useEffect } from 'react'
import LoginWrap from '../../components/LoginWrap'
import Logo from '../../components/Logo'
import { PageTitle, InputWrap, MarginInputForm, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { SignActionSpan, Wrapper } from '../Login/Login.style'
import axiosInstance from '../../apis/axiosInstance'
import MenuBar from '../../components/menuBar/MenuBar'

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

  const navigate = useNavigate();

  useEffect(() => {
    if (idValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [idValid, phoneNumberValid]);

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
        })
        .catch((error) => {
          console.log(error);
          alert("인증번호 발송에 실패했습니다.");
        })
    }
  }

  useEffect(() => {
    if (verificationSent && 
        verificationCode.length === verificationCodeLength && 
        !verificationPassed && 
        verificationCode !== '' && 
        checkVerificationCode !== '') {
      
      if (verificationCode === checkVerificationCode) {
        setVerificationPassed(true);
        alert("인증이 완료되었습니다.");
      } else {
        setVerificationPassed(false);
        alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
      }
    }
  }, [verificationCode, checkVerificationCode, verificationPassed, verificationCodeLength, verificationSent]);

  const handleVerificationCodeChange = (isValid, value) => {
    setVerificationCode(value);
  };

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

  // 아이디 찾기 폼 제출
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
          navigate('/findIDSuccess', { state: { foundIDs: response.data } });
        } else {
          alert('본 개인정보와 일치하는 가입정보가 없습니다.');
        }
      })
      .catch((error) => {
        console.log('아이디 찾기 오류:', error);
        alert('아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
      })
  };

  return (
    <Wrapper>
      <LoginWrap>
        <Logo/>
        <PageTitle>아이디 찾기</PageTitle>
        <MarginInputForm
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
          disabled={!phoneNumberValid || verificationSent}>인증</SubmitBut>
        </InputWrap>
        
        <MarginInputForm
          label="인증번호" 
          type="text" 
          placeholder="인증번호 입력"
          value={verificationCode}
          onValidationChange={handleVerificationCodeChange}
        />
        { showVerificationMessage &&
          <SignActionSpan>
            인증번호가 발송되었습니다. 3분 이내로 인증번호를 입력해주세요.
          </SignActionSpan>
        }
        {verificationMessage && <SignActionSpan>{verificationMessage}</SignActionSpan>}

        <Button onClick={handleSubmit} disabled={buttonDisabled} submitMessage="아이디 찾기"></Button>
      </LoginWrap>

      <MenuBar/>

    </Wrapper>
  )
}

export default FindID