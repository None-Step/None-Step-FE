import React, { useState, useEffect } from 'react'
import axiosInstance from '@/apis/axiosInstance'
import LoginWrap from '@/components/LoginWrap'
import { InputWrap, PageTitle, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '@/components/InputForm'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import { SignAction, SignActionSpan, Wrapper } from '../Login/Login.style'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuBar from '@/components/menuBar/MenuBar'

export const PrimaryLink = styled(Link)`
 color: ${(props) => props.theme.colors.primary};
`;

const FindPW = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberID: '',
    memberName: '',
    memberPhone: ''
  });
  const [nameValid, setNameValid] = useState(false);
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

  // 휴대폰 인증번호 요청하기
  const sendVerificationCode = (event) => {
    event.preventDefault();
  
    if(formData.memberPhone) {
      if (window.verificationTimer) {
        clearTimeout(window.verificationTimer);
      }
  
      axiosInstance
        .post(`/nonestep/member/phone`, {
          memberPhone : formData.memberPhone
        })
        .then((response) => {
          if (response.data && response.data.authenticationNumber) {
            setCheckVerificationCode(response.data.authenticationNumber);
            setVerificationCodeLength(response.data.authenticationNumber.length);
            setShowVerificationMessage(true);
            setVerificationPassed(false);
            setVerificationMessage('');
  
            window.verificationTimer = setTimeout(() => {
              setVerificationMessage('인증번호 유효 시간이 초과되었습니다. 다시 시도해주세요');
              setVerificationSent(false);
              setShowVerificationMessage(false);
            }, 180000);
  
            setVerificationSent(true);
            
            // console.log("인증번호가 성공적으로 발송되었습니다.");
          } else {
            throw new Error("서버 응답에 인증번호가 없습니다.");
          }
        })
        .catch((error) => {
          console.error("인증번호 발송 오류:", error);
          alert("인증번호 발송에 실패했습니다. 다시 시도해 주세요.");
          setVerificationSent(false);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (window.verificationTimer) {
        clearTimeout(window.verificationTimer);
      }
    };
  }, []);

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

  // 유효성 검사 모두 pass되면 버튼 활성화하기
  useEffect(() => {
    if (nameValid && idValid && phoneNumberValid && verificationPassed) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nameValid, idValid, phoneNumberValid, verificationPassed]);

  // 입력값 변경 처리 함수
  const handleInputChange = (name, value, isValid) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    switch(name) {
      case 'memberID':
        setIdValid(isValid);
        break;
      case 'memberName':
        setNameValid(isValid);
        break;
      case 'memberPhone':
        setPhoneNumberValid(isValid);
        break;
      default:
        break;
    }
  };

  // 비밀번호 찾기 요청 함수
  const handleFindPassword = (event) => {
    event.preventDefault();
    
    axiosInstance.post('/nonestep/member/pwfind', formData)
    .then(response => {
      if (response.data && response.data.message === "success") {
        navigate('/findpw/resetting', {
          state: { 
            memberID: formData.memberID,
            memberName: formData.memberName,
            memberPhone: formData.memberPhone
          } 
        });
      } else {
        alert('비밀번호 찾기에 실패했습니다.');
      }
    })
    .catch(error => {
      console.error('비밀번호 변경 오류:', error);
    
      if (error.response) {
        console.error('서버 응답 에러:', error.response.data);
        console.error('HTTP 상태 코드:', error.response.status);
      } else if (error.request) {
        console.error('요청이 전송되었지만 응답이 없습니다:', error.request);
      } else {
        console.error('요청 설정 중 오류 발생:', error.message);
      }
      
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    });
  };

  return (
    <Wrapper>
      <LoginWrap>
        <Logo/>
        <PageTitle>비밀번호 재설정하기</PageTitle>
        <InputForm
          label="이름"
          type="text"
          name="memberName"
          placeholder="이름"
          onValidationChange={(isValid, value) => handleInputChange('memberName', value, isValid)}
        />
        <InputForm
          label="아이디"
          type="text"
          name="memberID"
          placeholder="아이디"
          onValidationChange={(isValid, value) => handleInputChange('memberID', value, isValid)}
        />
        <InputWrap>
          <InputForm
            label="휴대폰 번호"
            type="text"
            name="memberPhone"
            placeholder="휴대폰 번호"
            onValidationChange={(isValid, value) => handleInputChange('memberPhone', value, isValid)}
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
          disabled={buttonDisabled} 
          submitMessage="비밀번호 찾기" 
          onClick={handleFindPassword}
        />
        <SignAction>
          <SignActionSpan>아이디를 잊으셨나요?</SignActionSpan>
          <PrimaryLink to="/findid">아이디 찾기</PrimaryLink>
        </SignAction>
      </LoginWrap>

      <MenuBar/>
    </Wrapper>
  )
}

export default FindPW