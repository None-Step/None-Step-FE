import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { TermsWrap, TermsTitleWrap, Title, Strong, Success, TermsTextBox, TermsTitle, TermsStrong } from './TermsOfService.style';
import { Wrapper } from '../../Login/Login.style';
import MenuBar from '@/components/menuBar/MenuBar';

const TermsOfService = () => {
  const theme = useContext(ThemeContext);  // theme 객체를 불러옵니다
  // 상태 추가: 각 Success 컴포넌트의 색상을 개별적으로 관리
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setColor1(theme.colors.gray01);
    setColor2(theme.colors.gray01);
  }, [theme]);

  // 모든 약관이 동의 되었을 때 버튼 활성화하기
  useEffect(() => {
    if (color1 === theme.colors.primary && color2 === theme.colors.primary) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [color1, color2, theme.colors.primary]);

  // 이벤트 핸들러 수정: 각 Success 컴포넌트의 색상을 독립적으로 토글
  const toggleColor1 = () => {
    setColor1(prevColor => prevColor === theme.colors.gray01 ? theme.colors.primary : theme.colors.gray01);
  };
  
  const toggleColor2 = () => {
    setColor2(prevColor => prevColor === theme.colors.gray01 ? theme.colors.primary : theme.colors.gray01);
  };

  // 다음 버튼 클릭시 페이지 이동
  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
          <TermsWrap>
      <Logo/>
      
      <TermsTitleWrap>
        <Title>
          <Strong>[필수]</Strong>
          이호선 이용약관
        </Title>
        <Success viewBox="0 0 24 25" fill="none"
         onClick={toggleColor1}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22.1112C6.477 22.1112 2 17.6342 2 12.1112C2 6.58821 6.477 2.11121 12 2.11121C17.523 2.11121 22 6.58821 22 12.1112C22 17.6342 17.523 22.1112 12 22.1112ZM12 20.1112C14.1217 20.1112 16.1566 19.2684 17.6569 17.7681C19.1571 16.2678 20 14.2329 20 12.1112C20 9.98947 19.1571 7.95464 17.6569 6.45435C16.1566 4.95406 14.1217 4.11121 12 4.11121C9.87827 4.11121 7.84344 4.95406 6.34315 6.45435C4.84285 7.95464 4 9.98947 4 12.1112C4 14.2329 4.84285 16.2678 6.34315 17.7681C7.84344 19.2684 9.87827 20.1112 12 20.1112ZM11.003 16.1112L6.76 11.8682L8.174 10.4542L11.003 13.2832L16.659 7.62621L18.074 9.04021L11.003 16.1112Z"
          fill={color1}/>
        </Success>
      </TermsTitleWrap>

      <TermsTextBox>
          <TermsTitle>이용약관</TermsTitle>

          <TermsStrong>1. 서론</TermsStrong>
          <p className='margin'>
            - 본 약관은 [회사명]('회사')이 제공하는 [서비스명] 및 관련 서비스(이하 '서비스')의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 이용조건과 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
          </p>

          <TermsStrong>2. 약관의 효력 및 변경</TermsStrong>
          <p>
          - 본 약관은 서비스 홈페이지에 공지함으로써 효력이 발생합니다.
          </p>
          <p>
          - 회사는 법률이나 서비스의 변경사항을 반영하기 위하여 필요한 경우 약관을 수정할 수 있으며, 변경된 약관은 지정된 날짜부터 서비스 홈페이지에 공지함으로써 효력이 발생합니다.
          </p>
          <p className='margin'>
          - 이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 회원 탈퇴(서비스 이용 중단)를 요청할 수 있으며, 약관 변경 발효 후에도 서비스를 계속 이용할 경우 변경 약관에 동의한 것으로 간주합니다.
          </p>

          <TermsStrong>3. 이용계약의 성립</TermsStrong>
          <p className='margin'>
          - 이용계약은 이용자의 서비스 이용 신청에 대한 회사의 이용 승낙과 이용자의 약관 동의로 성립합니다.
          </p>

          <TermsStrong>4. 서비스 이용</TermsStrong>
          <p>
          - 서비스 이용은 회사의 서비스 사용 가능 시간에 따라 제공됩니다.
          </p>
          <p>
          - 회사는 위치 기반 서비스, 지하철 정보 제공, 길찾기 서비스 및 채팅 기능을 포함하여 이용자에게 서비스를 제공합니다.
          </p>
          <p className='margin'>
          - 서비스 이용 중 발생할 수 있는 위치 정보의 정확도, 지하철 정보의 업데이트, 길찾기 결과의 정확성 및 채팅 시스템의 안정성에 대해 회사는 보증하지 않습니다.
          </p>

          <TermsStrong>5. 이용자의 의무</TermsStrong>
          <p>
          - 이용자는 관련 법령, 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 합니다.
          </p>
          <p className='margin'>
          - 이용자는 서비스 이용 중에 얻은 정보를 회사의 사전 승인 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.
          </p>

          <TermsStrong>6. 개인정보 보호</TermsStrong>
          <p>
          - 회사는 이용자의 개인정보 수집 시 서비스 제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
          </p>
          <p className='margin'>
          - 회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 안전하게 관리합니다.
          </p>

          <TermsStrong>7. 면책조항</TermsStrong>
          <p>
          - 회사는 천재지변 또는 이에 준하는 불가항력적 상황 발생 시 서비스 제공에 관한 책임이 면제됩니다.
          </p>
          <p className='margin'>
          - 회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
          </p>

          <TermsStrong>8. 분쟁 해결</TermsStrong>
          <p>
          - 서비스 이용 중 발생한 분쟁에 대해 회사와 이용자는 합의하에 분쟁을 해결하기 위해 노력합니다.
          </p>
          <p>
          - 법적 분쟁의 경우, 회사의 본사 위치 법원을 관할 법원으로 합니다.
          </p>

      </TermsTextBox>

      <TermsTitleWrap>
        <Title>
          <Strong>[필수]</Strong>
          개인정보 수집 및 이용
        </Title>
        <Success viewBox="0 0 24 25" fill="none"
         onClick={toggleColor2}
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22.1112C6.477 22.1112 2 17.6342 2 12.1112C2 6.58821 6.477 2.11121 12 2.11121C17.523 2.11121 22 6.58821 22 12.1112C22 17.6342 17.523 22.1112 12 22.1112ZM12 20.1112C14.1217 20.1112 16.1566 19.2684 17.6569 17.7681C19.1571 16.2678 20 14.2329 20 12.1112C20 9.98947 19.1571 7.95464 17.6569 6.45435C16.1566 4.95406 14.1217 4.11121 12 4.11121C9.87827 4.11121 7.84344 4.95406 6.34315 6.45435C4.84285 7.95464 4 9.98947 4 12.1112C4 14.2329 4.84285 16.2678 6.34315 17.7681C7.84344 19.2684 9.87827 20.1112 12 20.1112ZM11.003 16.1112L6.76 11.8682L8.174 10.4542L11.003 13.2832L16.659 7.62621L18.074 9.04021L11.003 16.1112Z"
          fill={color2}/>
        </Success>
      </TermsTitleWrap>
      
      <TermsTextBox>
        <TermsTitle>개인정보 수집 및 이용 약관</TermsTitle>

        <TermsStrong>1. 총칙</TermsStrong>

        <p>
        본 서비스는 회원의 개인정보보호를 매우 중요시하며, 회원의 개인정보 보호를 위해 최선을 다하고 있습니다. 본 약관은 [회사명]('회사')이 운영하는 [서비스명] 및 관련 서비스에서 이용자의 개인정보를 어떻게 수집, 이용, 관리하는지에 대한 방침을 명시합니다.
        </p>
        <p>
        1) 회사는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 비롯한 모든 개인정보보호 관련 법률 규정을 준수하고 있습니다.
        </p>
        <p className='margin'>
        2) 본 약관의 목적은 이용자의 권리와 의무를 명확히 하고, 개인정보 보호를 위해 회사가 취하는 조치를 설명하기 위함입니다.
        </p>

        <TermsStrong>2. 개인정보의 수집 및 이용 목적</TermsStrong>

        <p>
        회사는 다음의 목적을 위해 개인정보를 수집하고 이용합니다.
        </p>
        <p>
        1) 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령 확인, 불만처리 등 민원 처리, 고지사항 전달 등
        </p>
        <p>
        2) 서비스 제공: 콘텐츠 제공, 특정 맞춤 서비스 제공, 인증, 청구서 발송 등
        </p>
        <p className='margin'>
        3) 마케팅 및 광고에의 활용: 신규 서비스(제품) 개발 및 특화, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계
        </p>

        <TermsStrong>
        3. 수집하는 개인정보 항목 및 수집 방법
        </TermsStrong>

        <p>
        회사는 다음과 같은 개인정보 항목을 수집하고 있습니다.
        </p>
        <p>
        1) 수집 항목: 이름, 생년월일, 로그인ID, 비밀번호, 전화번호, 이메일, 접속 로그, 쿠키, 접속 IP 정보 등
        </p>
        <p className='margin'>
        2) 수집 방법: 홈페이지, 모바일 페이지, 어플리케이션, 서면양식, 전화/팩스를 통한 수집, 생성정보 수집 툴을 통한 수집
        </p>

        <TermsStrong>
        4. 개인정보의 보유 및 이용 기간
        </TermsStrong>

        <p>
        이용자의 개인정보는 원칙적으로 회원 탈퇴 시 또는 수집 및 이용목적이 달성된 후 지체 없이 파기합니다. 다만, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
        </p>
        <p>
        1) 보존 항목: 로그인ID, 이름, 이메일
        </p>
        <p>
        2) 보존 근거: 서비스 이용의 혼선 방지
        </p>
        <p>
        3) 보존 기간: 1년
        </p>
        <p className='margin'>
        - 법령에 따른 정보보유 사유가 있는 경우 해당 법령에서 정한 기간 동안 보유합니다.
        </p>

        <TermsStrong>5. 개인정보의 파기 절차 및 방법</TermsStrong>

        <p>
        회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
        </p>
        <p>
        1) 파기절차: 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다. 개인정보는 법률에 의한 경우를 제외하고는 보유되는 이외의 목적으로 이용되지 않습니다.
        </p>
        <p className='margin'>
        2) 파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기하며, 종이 문서에 기록된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
        </p>
      </TermsTextBox>

      <Button disabled={buttonDisabled} submitMessage="다음" onClick={handleButtonClick} ></Button>


    </TermsWrap>

    <MenuBar/>

    </Wrapper>
  )
}

export default TermsOfService