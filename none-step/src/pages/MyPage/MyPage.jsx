import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import Close, { PageContainer,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileTag,
  InfoSection,
  SectionTitle,
  InfoItem,
  ProfileInfoWrap,
  Withdraw,
  ModalBG,
  ModalContainer,
  ProfileImgContainer,
  ProfileImageLagrge,
  EditIcon,
  ActionTitle,
  Span,
  WithdrawContainer,
  Title,
  Notice,
  ButWrap,
  SeconBut,
  But,
  SubmitBut} from './MyPage.style'
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleWithdrawOpen = () => {
    setIsWithdrawOpen(true);
  }

  const handleWithdrawClose = () => {
    setIsWithdrawOpen(false);
  }

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
        <Button onClick={handleModalOpen} submitMessage="프로필 편집하기"></Button>
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
      <Withdraw onClick={handleWithdrawOpen}>회원탈퇴</Withdraw>

      { isModalOpen && <>
        <ModalBG onClick={handleModalClose} />
      <ModalContainer>
        <ActionTitle>프로필편집</ActionTitle>

        <ProfileImgContainer>
          <ProfileImageLagrge />
          <EditIcon>
            <circle cx="15.5" cy="15" r="15" />
            <path d="M20.5 14H16.5V10C16.5 9.73478 16.3946 9.48043 16.2071 9.29289C16.0196 9.10536 15.7652 9 15.5 9C15.2348 9 14.9804 9.10536 14.7929 9.29289C14.6054 9.48043 14.5 9.73478 14.5 10V14H10.5C10.2348 14 9.98043 14.1054 9.79289 14.2929C9.60536 14.4804 9.5 14.7348 9.5 15C9.5 15.2652 9.60536 15.5196 9.79289 15.7071C9.98043 15.8946 10.2348 16 10.5 16H14.5V20C14.5 20.2652 14.6054 20.5196 14.7929 20.7071C14.9804 20.8946 15.2348 21 15.5 21C15.7652 21 16.0196 20.8946 16.2071 20.7071C16.3946 20.5196 16.5 20.2652 16.5 20V16H20.5C20.7652 16 21.0196 15.8946 21.2071 15.7071C21.3946 15.5196 21.5 15.2652 21.5 15C21.5 14.7348 21.3946 14.4804 21.2071 14.2929C21.0196 14.1054 20.7652 14 20.5 14Z" />
          </EditIcon>
          <Span>프로필 사진 수정</Span>
        </ProfileImgContainer>

        <InputForm
          label="닉네임"
          type="text"
          placeholder="닉네임"
        />
        <Button submitMessage="저장하기"></Button>

        <Close onClick={handleModalClose}>
          닫기
        </Close>
      </ModalContainer>

      </>}

      { isWithdrawOpen && <>
        <ModalBG />
        <WithdrawContainer>
          <Title>회원 탈퇴하기</Title>
          <Notice>
            <span>현재 가입한 아이디와 동일한 아이디로</span>
            <span>재가입이 불가능합니다.</span>
            <span>정말 탈퇴 하시겠습니까?</span>
          </Notice>
          <ButWrap>
            <SeconBut onClick={handleWithdrawClose}>취소</SeconBut>
            <But>탈퇴하기</But>
          </ButWrap>
        </WithdrawContainer>
      </>}

      {/*
        <WithdrawContainer>
          <Title>회원 탈퇴 완료</Title>
          <Notice>
            <span>그동안 이호선을 이용해 주셔서</span>
            <span>진심으로 감사합니다.</span>
          </Notice>
          <ButWrap>
            <SubmitBut>확인</SubmitBut>
          </ButWrap>
        </WithdrawContainer> */}

    </PageContainer>
  );
};


export default MyPage;