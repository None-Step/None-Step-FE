import React from 'react'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import SocialButton from '../../components/SocialButton'
import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import LoginWrap from '../../components/LoginWrap'
import { useNavigate } from 'react-router-dom'
import { HrWrap, Hr, Span, SignAction, SignActionSpan} from './Login.style';


const Login = () => {
  // kakao 앱 키
    const KAKAO_REST_API_KEY = '6dae53e627b023224f6da7d08b32b28f';
    const KAKAO_REDIRECT_URI = `${window.location.origin}/nonestep/member/login/callback/kakao`;
    const KAKAO_link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const [memberID, setMemberID] = useState('');
    const [memberPass, setMemberPass] = useState('');

    // useEffect 훅으로 valid값이 변경될 때마다 버튼 활성화 여부 결정
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const navigate = useNavigate();
  
    useEffect(() => {
      if (emailValid && passwordValid) {
        setButtonDisabled(false);
        return;
      } else {
        setButtonDisabled(true);
      }
    }, [emailValid, passwordValid]);


    const KAKAOloginHandler = (event) => {
      event.preventDefault();
      window.location.href = KAKAO_link;
    };

  return (
    <LoginWrap>
      <Logo/>
      <InputForm
        label="아이디"
        type="text" 
        placeholder="아이디를 입력하세요"
        onValidationChange={setEmailValid} // 유효성 결과 전달
      />
      <InputForm 
        label="비밀번호" 
        type="password" 
        placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
        onValidationChange={setPasswordValid} // 유효성 결과 전달
        />
      <Button disabled={buttonDisabled} submitMessage="로그인"/>

      <HrWrap>
        <Hr></Hr>
        <Span>또는</Span>
      </HrWrap>

      <SocialButton type='kakao'
      onClick={KAKAOloginHandler}
      />
      <SocialButton type='naver'/>
      
      <SignAction>
        <SignActionSpan to="/findID">아이디 찾기</SignActionSpan>
        |
        <SignActionSpan to="/findPW">비밀번호 찾기</SignActionSpan>
        |
        <SignActionSpan to="/signUp">회원가입</SignActionSpan>
      </SignAction>

      <SignAction>
        <SignActionSpan to="/terms">이용약관안내</SignActionSpan>
        <SignActionSpan to='/terms'>개인정보처리방침</SignActionSpan>
      </SignAction>
      
    </LoginWrap>

  )
}

export default Login
