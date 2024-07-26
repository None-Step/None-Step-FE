import React from 'react'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import SocialButton from '../../components/SocialButton'
import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import LoginWrap from '../../components/LoginWrap'
import { useNavigate } from 'react-router-dom'
import { login } from '../../apis/login'
import { HrWrap, Hr, Span, SignAction, SignActionSpan} from './Login.style';


const Login = () => {
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

    const handleLogin = async (event) => {
      event.preventDefault();  // 기본 동작 방지
      try {
        const { accessToken, refreshToken } = await login(memberID, memberPass);
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        navigate('/main');
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : 'API 서버 오류');
        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
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
      <Button onClick={handleLogin} disabled={buttonDisabled} submitMessage="로그인"/>

      <HrWrap>
        <Hr></Hr>
        <Span>또는</Span>
      </HrWrap>

      <SocialButton type='kakao'/>
      <SocialButton type='naver'/>
      
      <SignAction>
        <SignActionSpan>아이디 찾기</SignActionSpan>
        |
        <SignActionSpan>비밀번호 찾기</SignActionSpan>
        |
        <SignActionSpan>회원가입</SignActionSpan>
      </SignAction>

      <SignAction>
        <SignActionSpan>이용약관안내</SignActionSpan>
        <SignActionSpan>개인정보처리방침</SignActionSpan>
      </SignAction>
      
    </LoginWrap>

  )
}

export default Login
