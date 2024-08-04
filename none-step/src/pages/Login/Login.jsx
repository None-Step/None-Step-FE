import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm'
import Button from '../../components/Button'
import SocialButton from '../../components/SocialButton'
import Logo from '../../components/Logo'
import LoginWrap from '../../components/LoginWrap'
import { useNavigate } from 'react-router-dom'
import { HrWrap, Hr, Span, SignAction, SignActionSpan} from './Login.style';
import axiosInstance from '../../apis/axiosInstance'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/memberSlice'

const Login = () => {
    const [memberID, setMemberID] = useState('');
    const [memberPass, setMemberPass] = useState('');
    // useEffect 훅으로 valid값이 변경될 때마다 버튼 활성화 여부 결정
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (emailValid && passwordValid) {
            setButtonDisabled(false);
            return;
        } else {
            setButtonDisabled(true);
        }
    }, [emailValid, passwordValid]);

    const socialLogin = async (provider) => {
        const authURL = `https://nonestep.site/nonestep/member/login/${provider}`
        window.location.href = authURL

        try {
            // const response = await axiosInstance.get("/nonestep/member/info");
            // const data = response.data;

            // const payload = {
            //     isAuthorized: true,
            //     memberID: data.memberID,
            //     memberNickName: data.memberNickName || "",
            //     memberRandom: data.memberRandom || "",
            //     memberFile: data.memberFile || "",
            //     memberIntroduce: data.memberIntroduce || "",
            // };

            // dispatch(login(payload));
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 일반 로그인 핸들러
    const handleLogin = async (event) => {
      event.preventDefault();

      try {
          const loginResponse = await axiosInstance
            .post('/nonestep/member/login',
              { memberID : memberID, 
                memberPass : memberPass});
            // 1. 응답 받은 액세스 토큰 저장
            const { accessToken, ...userInfo } = loginResponse.data;
            // 2. 헤더에 토큰 보내주기 (디폴트값으로 저장, 추후에 따로 요청하지 않아도 됨)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
          // Redux store에 사용자 정보 저장
          dispatch(login({
            isAuthorized: true,
            memberID: userInfo.memberID,
            memberNickName: userInfo.memberNickName || "",
            memberRandom: userInfo.memberRandom || "",
            memberFile: userInfo.memberFile || "",
            memberIntroduce: userInfo.memberIntroduce || "",
          }));
          navigate('/');
      } catch (error) {
          console.error('Login error:', error);
          if (error.response) {
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
          } else if (error.request) {
              console.error('Error request:', error.request);
          } else {
              console.error('Error message:', error.message);
          }
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
  }

    const handleID = (value) => {
      setMemberID(value);
    }

    const handlePW = (value) => {
      setMemberPass(value);
    }

    return (
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
            <SocialButton type='kakao' onClick={() => socialLogin('kakao')} />
            <SocialButton type='naver' onClick={() => socialLogin('naver')} />
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