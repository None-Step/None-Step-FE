import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import LoginWrap from '../components/LoginWrap';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  // 아이디 사용 가능 여부 체크
  const [idCheckPassed, setIdCheckPassed] = useState(false);

  // 인증번호
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  
  // 비밀번호 && 비밀번호 확인
  useEffect(() => {
    setPasswordConfirmValid(password === confirmPassword && password.length > 0); // 비밀번호 일치 여부 검증
  }, [password, confirmPassword]);
  
  // 유효성 검사 모두 pass되면 버튼 활성화하기
  useEffect(() => {
    if (idValid && emailValid && passwordValid && nameValid && phoneNumberValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [idValid, emailValid, passwordValid, nameValid, phoneNumberValid]);

  // 아이디 중복 여부 검사 함수
  const checkID = async () => {
    try {
      const response = await axios.get(`/nonestep/member/idcheck?memberID=${memberID}`);
      if (response.data) { // 응답이 true일 경우 (사용 가능)
        setIdCheckPassed(true);
        alert('사용 가능한 아이디입니다.');
      } else { // 응답이 false일 경우 (사용 불가능)
        setIdCheckPassed(false);
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 검사 에러:', error);
      alert('아이디 중복 검사 중 문제가 발생했습니다.');
    }
  };

  // 아이디 필드 값이 4글자 이상 & 유효성 검사
  const validateID = (id) => {
    // 예: 아이디 길이가 4자 이상이어야 하고, 특수 문자를 포함하지 않아야 함
    const isValid = id.length >= 4 && /^[a-zA-Z0-9]+$/.test(id);
    setIdValid(isValid); // 상태 업데이트
  };

  // 폼 제출 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const requestBody = {
      memberID,
      memberPass,
      memberName,
      memberMail,
      memberPhone
    };

    try {
      const response = await axios.post('http://localhost:5173/nonestep/member/signup', requestBody);
      console.log('회원가입 성공:', response.data);
      // 회원가입 성공 후 로그인 페이지로 리디렉션 하기
      navigate('/login');
    } catch (error) {
      console.error('회원가입 에러:', error.response ? error.response.data : 'API 서버 오류');
      alert('회원가입 중 에러가 발생했습니다. 다시 시도해 주세요.');
    }

  };

  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setMemberPhone(newValue);
    // 휴대폰 번호 유효성 검사
    const isValid = /^\d{11}$/.test(newValue);
    setPhoneNumberValid(isValid);
  };

  // 휴대폰 인증번호 함수
  const sendVerificationCode = async () => {
    try {
      if (phoneNumberValid) {
        const response = await axios.post('http://localhost:5173/nonestep/member/phone', { memberPhone });
        setPhoneCodeSent(true);
        alert('인증번호가 전송되었습니다.');
      } else {
        alert('유효한 휴대폰 번호를 입력해주세요.');
      }
    } catch (error) {
      console.error('휴대폰 인증 에러:', error);
      alert('휴대폰 인증 중 문제가 발생했습니다.');
    }
  };

  return (
    <LoginWrap onSubmit={handleSubmit}>
      <Logo/>
      <PageTitle>회원가입</PageTitle>

      <InputWrap>
        <InputForm
          label="아이디"
          type="text"
          placeholder="아이디"
          value={memberID}
          onChange={(e) => {
            setMemberID(e.target.value);
            validateID(e.target.value); // 입력할 때마다 유효성 검사 수행
          }}
          onValidationChange={setIdValid}
        />
        <SubmitBut onClick={checkID} disabled={!idValid}>확인</SubmitBut>
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
        <SubmitBut onClick={sendVerificationCode} disabled={!phoneNumberValid || phoneCodeSent}>인증</SubmitBut>
      </InputWrap>
      <MarginInputForm
        label="인증번호 확인" 
        type="text" 
        placeholder="인증번호 확인"
        value={Number}
      />

      <Button disabled={buttonDisabled} submitMessage="회원가입" ></Button>
    </LoginWrap>
  );
}

export default SignUpForm;