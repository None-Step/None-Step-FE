import React from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { PageContainer,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileTag,
  EditProfileButton,
  InfoSection,
  SectionTitle,
  InfoItem,
  WithdrawalText, 
  ProfileInfoWrap,
  Withdraw} from './MyPage.style'
import Button from '../../components/Button';
import { SignActionSpan } from '../Login/Login.style';

const MyPage = () => {
  return (
    <PageContainer>
      <ProfileSection>
        <ProfileInfoWrap>
          <ProfileInfo>
            <ProfileImage src="https://example.com/hamster.jpg" alt="Profile" />
            <ProfileName>꾸시꾸시하는햄지</ProfileName>
          </ProfileInfo>
          <ProfileTag>#1234</ProfileTag>
        </ProfileInfoWrap>
        <Button submitMessage="프로필 편집하기"></Button>
      </ProfileSection>


      <InfoSection>
        <SectionTitle>내 가입 정보</SectionTitle>
        <InfoItem>
          <span>이름</span>
          <span>김보민</span>
        </InfoItem>
        <InfoItem>
          <span>아이디</span>
          <span>whooz</span>
        </InfoItem>
        <InfoItem $clickable>
          <span>비밀번호</span>
          <FaChevronRight />
        </InfoItem>
        <InfoItem $clickable>
          <span>이메일</span>
          <FaChevronRight />
        </InfoItem>
        <InfoItem $clickable>
          <span>휴대폰번호</span>
          <FaChevronRight />
        </InfoItem>
      </InfoSection>

      <InfoSection>
        <SectionTitle>계정 관리</SectionTitle>
        <InfoItem $clickable>
          <span>로그아웃</span>
          <FaChevronRight />
        </InfoItem>
      </InfoSection>
      <Withdraw>회원탈퇴</Withdraw>
    </PageContainer>
  );
};


export default MyPage;