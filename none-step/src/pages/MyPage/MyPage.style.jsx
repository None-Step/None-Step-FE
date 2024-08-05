import styled from "styled-components";
import { SignActionSpan } from "../Login/Login.style";
import { FaChevronRight } from 'react-icons/fa';

export const RightIcon = styled(FaChevronRight)`
  cursor: pointer;
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray06};
  position: relative;
  top: 0;
  left: 0;
`;

export const ProfileSection = styled.section`
  margin-top: 106px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover 50% 50%;
`;

export const ProfileInfoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
`;

export const ProfileName = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const ProfileTag = styled.span`
font-size: 1.2rem;
  height: fit-content;
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
`;

export const EditProfileButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const InfoSection = styled.section`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: 1.6rem;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  &:last-child {
    border-bottom: none;
  }
`;

export const WithdrawalText = styled.span`
  color: red;
`;

export const Withdraw = styled(SignActionSpan)`
  display: inline-block;
  padding-left: 2rem;
  font-size : 1.4rem;
  color: ${(props) => props.theme.colors.gray02};
`;


// ----------------- 모달 컴포넌트 --------------------

export const ModalBG = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.modalLayer};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 490px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ActionTitle = styled.span`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.gray01};
  margin-bottom: 2rem;
`;

export const ProfileImageLagrge = styled(ProfileImage)`
  width: 90px;
  height: 90px;
`;

export const EditIcon = styled.svg.attrs({
  viewBox: '0 0 31 30',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none'
})`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 60px;
  right: 0;
  cursor: pointer;

  circle {
    fill: #69A5FF;
  }

  path {
    fill: white;
  }
`;

export const ProfileImgContainer = styled.div`
  width : 110px;
  height: 140px;
  position: relative;
  margin-bottom: 2rem;
`;

export const Span = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.black};
  position: absolute;
  bottom: 0;
  left: calc(50% - 50px);
`;

export const CloseButton = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.6rem;
  border-top: 1px solid ${(props) => props.theme.colors.gray05};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const Close = ({onClick, children}) => {
  return(
    <CloseButton onClick={onClick}>
      {children}
    </CloseButton>
  );
};

export default Close;

// ------------ 탈퇴 팝업 ----------------

export const WithdrawContainer = styled.div`
  width: 95%;
  max-width: 350px;
  min-width: 270px;
  height: fit-content;
  padding: 1.6rem;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 1.8rem;
`;

export const Notice = styled.p`
  padding: 2rem 0;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const But = styled.button`
  width: calc(50% - 1rem);
  padding: 1.1rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 4px;
`
export const SeconBut = styled(But)`
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.primary};

`
export const SubmitBut = styled(But)`
  width: 100%;
`
