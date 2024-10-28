import styled from "styled-components";
import { SignActionSpan } from "../Login/Login.style";
import { FaChevronRight } from "react-icons/fa";

export const RightIcon = styled(FaChevronRight)`
    cursor: pointer;
`;

export const BG = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.gray06};
`;

export const PageContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    overflow: scroll;
    position: relative;
    top: 0;
    left: 0;

    /* Firefox용 스크롤바 숨기기 */
    scrollbar-width: none;
    /* IE and Edge용 스크롤바 숨기기 */
    -ms-overflow-style: none;
    /* Chrome, Safari, Opera용 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ProfileSection = styled.section`
    margin-top: 70px;
    padding: 20px;
    background-color: white;
    margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
    width: 60px;
    height: 60px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 50%;
    object-fit: cover;
`;

export const ProfileInfoWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ProfileInfo = styled.div`
    width: 100%;
    display: flex;
`;

export const ProfileName = styled.h2`
    display: flex;
    margin-left: 15px;
    font-size: 18px;
    align-items: center;
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
    background-color: #007aff;
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
    cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

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
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray02};
`;

// ----------------- 모달 컴포넌트 --------------------

export const ModalBG = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.modalLayer};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

export const ModalContainer = styled.div`
    width: 100%;
    max-width: 600px;
    height: fit-content;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${(props) => props.theme.colors.white};
    position: fixed;
    bottom: 72px;
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

export const EditIconWrapper = styled.div`
    position: relative;
    cursor: pointer;

    .profile_img_reset button {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 100%;
        background: #ff8c86;
        outline: none;
        cursor: pointer;
    }

    .profile_img_reset button svg {
        width: 16px;
        height: 16px;
        color: #fff;
    }
`;

export const EditIcon = styled.svg.attrs({
    viewBox: "0 0 31 30",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
})`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;

    circle {
        fill: #69a5ff;
    }

    path {
        fill: white;
    }
`;

export const ProfileImgContainer = styled.div`
    margin-bottom: 2rem;
`;

export const Span = styled.span`
    display: block;
    margin-top: 20px;
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.black};
`;

export const CloseButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5rem;
    margin-top: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 6px;
    font-size: 1.6rem;
    cursor: pointer;
`;

const Close = ({ onClick, children }) => {
    return <CloseButton onClick={onClick}>{children}</CloseButton>;
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
`;

export const But = styled.button`
    width: calc(50% - 1rem);
    padding: 1.1rem;
    box-sizing: border-box;
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 4px;
`;

export const SeconBut = styled(But)`
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const SubmitButton = styled(But)`
    width: 100%;
`;
