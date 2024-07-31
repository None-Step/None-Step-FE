import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import SocialButton from '../../components/SocialButton'
import Logo from '../../components/Logo'
import LoginWrap from '../../components/LoginWrap'
import { useNavigate } from 'react-router-dom'
import { HrWrap, Hr, Span, SignAction, SignActionSpan} from './Login.style';
import { useAuth } from '../../apis/AuthContext' // 추가
import axiosInstance from '../../apis/axiosInstance'


const Login = () => {
  const [memberID, setMemberID] = useState('');
  const [memberPass, setMemberPass] = useState('');
  // useEffect 훅으로 valid값이 변경될 때마다 버튼 활성화 여부 결정
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { login } = useAuth(); // 추가
  const navigate = useNavigate();


  useEffect(() => {
    if (emailValid && passwordValid) {
      setButtonDisabled(false);
      return;
    } else {
      setButtonDisabled(true);
    }
  }, [emailValid, passwordValid]);

  // const KAKAOloginHandler = (event) => {
  //   event.preventDefault();
  //   axiosInstance
  //     .get('/nonestep/member/login/kakao')
  //     .then((response) =>  {
  //       console.log(response.message);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // };

  const socialLoginHandler = (params) => {
    const authURL = `https://nonestep.site/nonestep/member/login/${params}`
    window.location.href = authURL

  };

  const kakaohandle = (event) => {
    event.preventDefault();

    const authURL = `https://nonestep.site/nonestep/member/login/kakao`
    window.location.href = authURL
  }

  const naverhandle = (event) => {
    event.preventDefault();

    const authURL = `https://nonestep.site/nonestep/member/login/naver`
    window.location.href = authURL
  }

  // 일반 로그인 핸들러
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // AuthContext의 login 함수 사용
      const success = await login(memberID, memberPass);
      if (success) {
        navigate('/'); // 메인 페이지로 이동
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
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
        onChange={(e) => setMemberID(e.target.value)} // 아이디 상태 업데이트
      />
      <InputForm
        label="비밀번호"
        type="password"
        placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
        onValidationChange={setPasswordValid} // 유효성 결과 전달
        onChange={(e) => setMemberPass(e.target.value)} // 비밀번호 상태 업데이트
      />
      <Button 
        disabled={buttonDisabled} 
        submitMessage="로그인"
        onClick={handleLogin} // 로그인 핸들러 연결
      />
      <HrWrap>
        <Hr></Hr>
        <Span>또는</Span>
      </HrWrap>
      <SocialButton type='kakao'
        onClick={kakaohandle}
      />
      <SocialButton type='naver'
        onClick={naverhandle}/>
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