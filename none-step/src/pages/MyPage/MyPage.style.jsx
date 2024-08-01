import styled from "styled-components";
import { SignActionSpan } from "../Login/Login.style";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray06};

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