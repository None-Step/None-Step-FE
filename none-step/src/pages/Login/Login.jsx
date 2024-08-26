import React, { useEffect, useState } from 'react'
import InputForm from '@/components/InputForm'
import Button from '@/components/Button'
import SocialButton from '@/components/SocialButton'
import Logo from '@/components/Logo'
import LoginWrap from '@/components/LoginWrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { Wrapper, HrWrap, Hr, Span, SignAction, SignActionSpan} from './Login.style';
import axiosInstance from '@/apis/axiosInstance'
import { useDispatch } from 'react-redux'
import MenuBar from '@/components/menuBar/MenuBar'
import { fetchUserInfo } from '@/hooks/auth';

const Login = () => {
    const [memberID, setMemberID] = useState('');
    const [memberPass, setMemberPass] = useState('');
    // useEffect 훅으로 valid값이 변경될 때마다 버튼 활성화 여부 결정
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (emailValid && passwordValid) {
            setButtonDisabled(false);
            return;
        } else {
            setButtonDisabled(true);
        }
    }, [emailValid, passwordValid]);

    useEffect(() => {
      // URL 파라미터에서 토큰 확인
      const params = new URLSearchParams(location.search);
      const token = params.get('Authorization');

      if (token) {
          handleSocialLoginSuccess(token);
      }
  }, [location]);

  const handleSocialLoginSuccess = (token) => {
      // 액세스 토큰을 세션 스토리지에 저장
      sessionStorage.setItem('accessToken', token);
      
      // axiosInstance의 기본 헤더에 토큰 설정
      axiosInstance.defaults.headers.common['Authorization'] = token;

      fetchUserInfo(dispatch)
          .then(() => {
              navigate('/'); // fetchUserInfo 완료 후 메인 페이지로 이동
          })
          .catch(error => {
              console.error('소셜 로그인 사용자 정보 가져오기 실패:', error);
              alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
          });
  }

    // 소셜 로그인 핸들러
    const socialLogin = (event, provider) => {
      event.preventDefault();
      console.log(`${provider} 로그인 시도 중`);
      const authURL = `https://nonestep.site/nonestep/member/login/${provider}`;
      console.log(`다음 URL로 리다이렉트 중: ${authURL}`);
      window.location.href = authURL;
    };
    
    // 일반 로그인 핸들러
    const handleLogin = (event) => {
      event.preventDefault();

      axiosInstance.post('/nonestep/member/login', { 
        memberID: memberID, 
        memberPass: memberPass 
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          // Authorization 헤더에서 액세스 토큰 추출
          const accessToken = response.headers['authorization'];
          
          if (accessToken) {
            // 액세스 토큰을 세션 스토리지에 저장
            sessionStorage.setItem('accessToken', accessToken);
            
            // axiosInstance의 기본 헤더에 토큰 설정
            axiosInstance.defaults.headers.common['Authorization'] = accessToken;

            return fetchUserInfo(dispatch);
          } else {
            throw new Error('응답에서 액세스 토큰을 찾을 수 없음');
          }
        } else {
          throw new Error('로그인 실패');
        }
      })
      .then(() => {
        navigate('/'); // fetchUserInfo 완료 후 메인 페이지로 이동
      })
      .catch(error => {
        console.error('Login error:', error);
        let errorMessage = "로그인에 실패했습니다. 다시 시도해주세요.";
        
        if (error.response && error.response.status === 401) {
          errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
        }
        
        alert(errorMessage);
      });
    }      


          const handleID = (value) => {
      setMemberID(value);
    }

    const handlePW = (value) => {
      setMemberPass(value);
    }

    return (
      <Wrapper>
        <LoginWrap>
            <Logo/>
            <InputForm
                label="아이디"
                type="text"
                placeholder="아이디를 입력하세요"
                onValidationChange={setEmailValid} // 유효성 결과 전달
                onChange={handleID} // 아이디 상태 업데이트
            />
            <InputForm
                label="비밀번호"
                type="password"
                placeholder="대/소문자, 특수문자, 숫자 포함 8자리 이상"
                onValidationChange={setPasswordValid} // 유효성 결과 전달
                onChange={handlePW} // 비밀번호 상태 업데이트
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
            <SocialButton type='kakao' onClick={(event) => socialLogin(event,'kakao')} />
            <SocialButton type='naver' onClick={(event) => socialLogin(event,'naver')} />
            <SignAction>
                <SignActionSpan to="/findid">아이디 찾기</SignActionSpan>
                |
                <SignActionSpan to="/findpw">비밀번호 찾기</SignActionSpan>
                |
                <SignActionSpan to="/signup/terms">회원가입</SignActionSpan>
            </SignAction>
            <SignAction>
                <SignActionSpan to="/signup/terms">이용약관안내</SignActionSpan>
                <SignActionSpan to='/signup/terms'>개인정보처리방침</SignActionSpan>
            </SignAction>

        </LoginWrap>
        <MenuBar/>

      </Wrapper>
    )
}

export default Login