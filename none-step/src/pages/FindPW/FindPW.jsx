import React, { useState, useEffect } from 'react'
import axiosInstance from '@/apis/axiosInstance'  // axiosInstance import 추가
import LoginWrap from '@/components/LoginWrap'
import { InputWrap, PageTitle, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '@/components/InputForm'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import { SignAction, SignActionSpan, Wrapper } from '../Login/Login.style'
import { Link, useNavigate } from 'react-router-dom'  // useNavigate 추가
import styled from 'styled-components'
import MenuBar from '@/components/menuBar/MenuBar'

const PrimaryLink = styled(Link)`
 color: ${(props) => props.theme.colors.primary};
`;

const FindPW = () => {
  const navigate = useNavigate();  // navigation 추가
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
      if (verificationSent && // 인증번호가 실제로 발송되었는지 확인
          verificationCode.length === verificationCodeLength && // 입력된 코드 길이가 올바른지 확인
          !verificationPassed && // 아직 인증이 완료되지 않았는지 확인
          verificationCode !== '' && // 입력된 코드가 비어있지 않은지 확인
          checkVerificationCode !== '') { // 서버에서 받은 코드가 비어있지 않은지 확인
        
        // 입력된 코드와 서버에서 받은 코드 비교
        if (verificationCode === checkVerificationCode) {
          setVerificationPassed(true); // 인증 성공 상태로 설정
          alert("인증이 완료되었습니다.");
        } else {
          setVerificationPassed(false); // 인증 실패 상태로 설정
          alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
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
  
  
  // 유효성 검사 모두 pass되면 버튼 활성화하기
  useEffect(() => {
    if (nameValid && idValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nameValid, idValid, phoneNumberValid]);

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
        // 비밀번호 찾기 성공 후 비밀번호 재설정 페이지로 이동
        navigate('/findPWResetting', {
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
      console.error('비밀번호 찾기 오류:', error);
      alert('비밀번호 찾기 중 오류가 발생했습니다.');
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
        disabled={!phoneNumberValid || verificationSent}>인증</SubmitBut>
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

      <Button 
        disabled={buttonDisabled} 
        submitMessage="확인" 
        onClick={handleFindPassword}
      />
      <SignAction>
        <SignActionSpan>아이디를 잊으셨나요?</SignActionSpan>
        <PrimaryLink to="/findID">아이디 찾기</PrimaryLink>
      </SignAction>
    </LoginWrap>

    <MenuBar/>

    </Wrapper>
  )
}

export default FindPW