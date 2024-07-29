import React, { useState,useEffect } from 'react'
import axios from 'axios';
import LoginWrap from '../../components/LoginWrap'
import Logo from '../../components/Logo'
import { PageTitle, InputWrap, MarginInputForm, SubmitBut } from '../SignUp/SignUp02/SignUpForm.style'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const FindID = () => {
  const [nameValid, setNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const navigate = useNavigate();

  // 유효성 검사 모두 pass되면 버튼 활성화하기
  useEffect(() => {
  if (nameValid && phoneNumberValid) {
    setButtonDisabled(false);
  } else {
    setButtonDisabled(true);
  }
}, [nameValid, phoneNumberValid]);

  // 휴대폰 인증번호 함수
  const sendVerificationCode = async (event) => {
    event.preventDefault();
    if (phoneNumberValid) {
      try {
        const response = await axios.post('http://nonestep.site/nonestep/member/phone', { memberPhone });
        setPhoneCodeSent(true);
        alert('인증번호가 전송되었습니다.');
      } catch (error) {
        console.error('휴대폰 인증 에러:', error);
        alert('휴대폰 인증 중 문제가 발생했습니다.');
      }
    } else {
      alert('유효한 휴대폰 번호를 입력해주세요.');
    }
  };

  return (
    <LoginWrap>
      <Logo/>
      <PageTitle>아이디 찾기</PageTitle>
      <MarginInputForm
        label="이름" 
        type="text" 
        placeholder="이름"
        onValidationChange={setNameValid}
      />
      <InputWrap>
        <InputForm
          label="휴대폰 번호"
          type="text" 
          placeholder="휴대폰 번호"
          onValidationChange={setPhoneNumberValid} // 유효성 검사 함수로 수정 필요
        />
        <SubmitBut onClick={sendVerificationCode} disabled={!phoneNumberValid || phoneCodeSent}>인증</SubmitBut>
      </InputWrap>
      <MarginInputForm
        label="인증번호 확인" 
        type="text" 
        placeholder="인증번호 확인"
        value={Number}
      />
      <Button disabled={buttonDisabled} submitMessage="회원가입"></Button>
    </LoginWrap>
  )
}

export default FindID