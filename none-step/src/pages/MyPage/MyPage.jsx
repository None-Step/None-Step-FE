import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  SubmitBut,
  RightIcon,
  EditIconWrapper} from './MyPage.style'
import Button from '../../components/Button';
import InputForm from './MyPageInputForm';
import useLogout from '../../hooks/logout';
import axiosInstance from '../../apis/axiosInstance';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 토스트 모달
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false); // 탈퇴하기 step.1 팝업
  const [isWithdrawCompleteOpen, setIsWithdrawCompleteOpen] = useState(false); // 탈퇴하기 step.2 팝업
  const [memberInfo, setMemberInfo] = useState(null); // 회원 정보 상태
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isNicknameEdited, setIsNicknameEdited] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState(''); // 프로필 변경 항목 구분
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 업로드 상태

  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axiosInstance.get('/nonestep/member/info');
        console.log('불러온 회원 정보:', response.data);
        setMemberInfo(response.data);
        setNicknameInput(response.data.memberNickName);
        setNewEmail(response.data.memberMail);
        setNewPhone(response.data.memberPhone);
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
        alert('회원 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
      }
    };
  
    fetchMemberInfo();
  }, []); // 의존성 배열을 비워두어 컴포넌트 마운트 시에만 실행되도록 합니다.

    const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
    setNicknameInput(memberInfo?.memberNickName || '');
    setIsNicknameEdited(false);
  }, [memberInfo]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleWithdrawOpen = useCallback(() => {
    setIsWithdrawOpen(true);
  }, []);

  const handleWithdrawClose = useCallback(() => {
    setIsWithdrawOpen(false);
  }, []);

  const handleLogout = useLogout();


  // 닉네임 변경 핸들러
  const handleNicknameChange = useCallback((value) => {
    setNicknameInput(value);
    setIsNicknameEdited(true);
  }, []);

  // 닉네임 유효성 변경 핸들러
  const handleNicknameValidation = useCallback((isValid) => {
    setIsNicknameValid(isValid);
  }, []);

// 프로필 저장 핸들러
const handleSaveProfile = useCallback(() => {
  if (!isNicknameEdited && !selectedImage) {
    handleModalClose();
    return;
  }

  if (isNicknameValid) {
    const formData = new FormData();
    
    if (isNicknameEdited) {
      formData.append('memberNickName', nicknameInput);
    }
    
    if (selectedImage) {
      // 파일 크기와 확장자 검사 로직 (생략)
      formData.append('memberIMG', selectedImage);
    }

    if (formData.has('memberNickName') || formData.has('memberIMG')) {
      axiosInstance.put('/nonestep/member/modify-nickname', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('API 응답:', response.data);
        setMemberInfo(prevInfo => {
          const updatedInfo = {
            ...prevInfo,
            memberNickName: response.data.memberNickName || prevInfo.memberNickName,
            memberIMG: response.data.memberIMG || prevInfo.memberIMG
          };
          console.log('업데이트된 memberInfo:', updatedInfo);
          return updatedInfo;
        });
        setNicknameInput(response.data.memberNickName || nicknameInput);
        setIsNicknameEdited(false);
        handleModalClose();
        setSelectedImage(null);
        alert('프로필이 성공적으로 업데이트되었습니다.');
      })
      .catch(error => {
        console.error('프로필 업데이트 실패:', error);
        alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
      });
    } else {
      handleModalClose();
    }
  } else {
    alert('올바른 닉네임을 입력해주세요.');
  }
}, [isNicknameEdited, isNicknameValid, nicknameInput, selectedImage, handleModalClose]);

// 이미지 선택 핸들러
const handleImageChange = useCallback((event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    
    // 파일 크기 검사
    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      event.target.value = ''; // 선택된 파일 초기화
      return;
    }
    
    // 파일 확장자 검사
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      alert('허용되지 않는 파일 형식입니다. PNG, JPG, JPEG, BMP, GIF 파일만 업로드 가능합니다.');
      event.target.value = ''; // 선택된 파일 초기화
      return;
    }
    
    setSelectedImage(file);
  }
}, []);

// 모달 닫고 수정 항목 초기화
const handleEditModalClose = useCallback(() => {
  setEditModalOpen(false);
  setEditType('');
}, []);


// 이메일 변경 핸들러
const handleEmailChange = useCallback(() => {
  axiosInstance
    .put('/nonestep/member/modify-mail', {
    memberMail: newEmail,
  })
  .then(response => {
    console.log('서버 응답:', response.data);
    console.log('이메일 : ', newEmail);
    if (response.data.message.toLowerCase() === 'success') {
      setMemberInfo(prevInfo => ({...prevInfo, memberMail: newEmail}));
      alert('이메일이 성공적으로 변경되었습니다.');
      handleEditModalClose();
      setEditModalOpen(false);
    }
  })
  .catch(error => {
    console.error('이메일 변경 실패:', error);
    alert('이메일 변경에 실패했습니다. 다시 시도해주세요.');
  });
}, [newEmail, handleEditModalClose]);

// 휴대폰 번호 변경 핸들러
const handlePhoneChange = useCallback(() => {
  axiosInstance.put('/nonestep/member/modify-phone', {
    memberPhone: newPhone
  })
  .then(response => {
    if (response.data.message.toLowerCase() === 'success') {
      setMemberInfo(prevInfo => ({...prevInfo, memberPhone: newPhone}));
      alert('휴대폰 번호가 성공적으로 변경되었습니다.');
      handleEditModalClose();
      setEditModalOpen(false);
    }
  })
  .catch(error => {
    console.error('휴대폰 번호 변경 실패:', error);
    alert('휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요.');
  });
}, [newPhone]);


  const handleWithdraw = useCallback(() => {
    axiosInstance
      .post('/nonestep/member/delete')
      .then((response) => {
        if (response.data.message.toLowerCase() === 'success') {
          setIsWithdrawOpen(false); // 1. 회원 탈퇴하기 모달 닫기
          setIsWithdrawCompleteOpen(true); // 2. 회원 탈퇴 완료 모달 열기
        }
      })
      .catch((error) => {
        console.error('회원 탈퇴 오류:', error);
        alert('회원 탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      });
  }, []);

  // 회원 탈퇴 완료 후 메인 페이지로 이동
  const handleWithdrawComplete = useCallback(() => {
    setIsWithdrawCompleteOpen(false);
    navigate('/'); // 메인 페이지로 이동
  }, [navigate]);

  // 프로필 변경 항목 중 수정할 항목 선택 => 모달 열기
  const handleEditClick = useCallback((type) => {
    if (type === '비밀번호') {
      navigate('/findPW');
    } else {
      setEditType(type);
      setEditModalOpen(true);
      // 모달이 열릴 때 현재 값으로 상태 초기화
      if (type === '이메일') {
        setNewEmail(memberInfo.memberMail);
      } else if (type === '휴대폰 번호') {
        setNewPhone(memberInfo.memberPhone);
      }
    }
  }, [navigate, memberInfo]);


  // 수정 내용 저장
  const handleEditSave = useCallback(() => {
    switch(editType) {
      case '비밀번호':
        console.log('Navigating to password change page');
        navigate('/findPW');
        break;
      case '이메일':
        console.log('Saving email:', newEmail);
        handleEmailChange();
        break;
      case '휴대폰 번호':
        console.log('Saving phone number:', newPhone);
        handlePhoneChange();
        break;
      default:
        console.error('알 수 없는 수정 타입:', editType);
    }
  }, [editType, navigate, handleEmailChange, handlePhoneChange, newEmail, newPhone]);


  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 이미지 업로드 용량 10MB로 제한하기
  const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']; // 파일 확장자 제한

  return (
    <PageContainer>
      {memberInfo &&
          <ProfileSection>
          <ProfileInfoWrap>
            <ProfileInfo>
              <ProfileImage src={memberInfo.memberIMG} alt="Profile" />
              <ProfileName>{memberInfo.memberNickName}</ProfileName>
            </ProfileInfo>
            <ProfileTag>{memberInfo.memberRandom}</ProfileTag>
          </ProfileInfoWrap>
          <Button onClick={handleModalOpen} submitMessage="프로필 편집하기"></Button>
        </ProfileSection>
      }


      {memberInfo && (
        <InfoSection>
          <SectionTitle>내 가입 정보</SectionTitle>
          <InfoItem>
            <span>이름</span>
            <span>{memberInfo.memberName}</span>
          </InfoItem>
          <InfoItem>
            <span>아이디</span>
            <span>{memberInfo.memberID}</span>
          </InfoItem>
          <InfoItem $clickable onClick={() => handleEditClick('비밀번호')}>
            <span>비밀번호</span>
            <RightIcon />
          </InfoItem>
          <InfoItem $clickable onClick={() => handleEditClick('이메일')}>
            <span>이메일</span>
            <RightIcon />
          </InfoItem>
          <InfoItem $clickable onClick={() => handleEditClick('휴대폰 번호')}>
            <span>휴대폰 번호</span>
            <RightIcon />
          </InfoItem>
        </InfoSection>
      )}

      <InfoSection>
        <SectionTitle>계정 관리</SectionTitle>
        <InfoItem $clickable>
          <span onClick={handleLogout}>로그아웃</span>
          <RightIcon />
        </InfoItem>
      </InfoSection>
      <Withdraw onClick={handleWithdrawOpen}>회원탈퇴</Withdraw>

      {/* 프로필 편집(이미지, 닉네임 수정) 모달 */}
      { isModalOpen && <>
        <ModalBG onClick={handleModalClose} />
      <ModalContainer>
        <ActionTitle>프로필편집</ActionTitle>

        <ProfileImgContainer>
        <ProfileImageLagrge 
          src={selectedImage ? URL.createObjectURL(selectedImage) : memberInfo.memberIMG} 
          alt="Profile" 
        />          
        <EditIconWrapper>
            <input
              type="file"
              id="profileImageInput"
              accept="image/png, image/jpeg, image/gif, image/bmp"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="profileImageInput">
              <EditIcon>
                <circle cx="15.5" cy="15" r="15" />
                <path d="M20.5 14H16.5V10C16.5 9.73478 16.3946 9.48043 16.2071 9.29289C16.0196 9.10536 15.7652 9 15.5 9C15.2348 9 14.9804 9.10536 14.7929 9.29289C14.6054 9.48043 14.5 9.73478 14.5 10V14H10.5C10.2348 14 9.98043 14.1054 9.79289 14.2929C9.60536 14.4804 9.5 14.7348 9.5 15C9.5 15.2652 9.60536 15.5196 9.79289 15.7071C9.98043 15.8946 10.2348 16 10.5 16H14.5V20C14.5 20.2652 14.6054 20.5196 14.7929 20.7071C14.9804 20.8946 15.2348 21 15.5 21C15.7652 21 16.0196 20.8946 16.2071 20.7071C16.3946 20.5196 16.5 20.2652 16.5 20V16H20.5C20.7652 16 21.0196 15.8946 21.2071 15.7071C21.3946 15.5196 21.5 15.2652 21.5 15C21.5 14.7348 21.3946 14.4804 21.2071 14.2929C21.0196 14.1054 20.7652 14 20.5 14Z" />
              </EditIcon>
            </label>
          </EditIconWrapper>
          <Span>프로필 사진 수정</Span>
        </ProfileImgContainer>

        <InputForm
          label="닉네임"
          type="text"
          placeholder="닉네임"
          value={nicknameInput}
          onChange={handleNicknameChange}
          onValidationChange={handleNicknameValidation}
        />
        <Button onClick={handleSaveProfile} submitMessage="저장하기" />

        <Close onClick={handleModalClose}>
          닫기
        </Close>
      </ModalContainer>
      </>}

      {/* 프로필 편집(비밀번호, 메일, 휴대폰번호 수정) 모달 */}
      {editModalOpen && (
        <>
        <ModalBG onClick={handleEditModalClose} />
        <ModalContainer>
          <ActionTitle>{editType} 수정</ActionTitle>
          <InputForm
            label={editType}
            type={editType === '비밀번호' ? 'password' : 'text'}
            placeholder={`새 ${editType}를 입력하세요`}
            value={
              editType === '이메일' ? newEmail :
              editType === '휴대폰 번호' ? newPhone : ''
            }
            onChange={(value) => {
              switch(editType) {
                case '이메일':
                  setNewEmail(value);
                  break;
                case '휴대폰 번호':
                  setNewPhone(value);
                  break;
              }
            }}
          />
          <Button onClick={handleEditSave} submitMessage="저장하기" />
          <Close onClick={handleEditModalClose}>
            닫기
          </Close>
        </ModalContainer>
      </>
    )}

      {/* 회원 탈퇴 step.1 팝업 */}
      { isWithdrawOpen && <>
        <ModalBG  onClick={handleWithdrawClose}/>
        <WithdrawContainer>
          <Title>회원 탈퇴하기</Title>
          <Notice>
            <span>현재 가입한 아이디와 동일한 아이디로</span>
            <span>재가입이 불가능합니다.</span>
            <span>정말 탈퇴 하시겠습니까?</span>
          </Notice>
          <ButWrap>
            <SeconBut onClick={handleWithdrawClose}>취소</SeconBut>
            <But onClick={handleWithdraw}>탈퇴하기</But>
          </ButWrap>
        </WithdrawContainer>
      </>}
      
      {/* 회원 탈퇴 step.2 팝업 */}
      { isWithdrawCompleteOpen &&
        <WithdrawContainer>
          <Title>회원 탈퇴 완료</Title>
          <Notice>
            <span>그동안 이호선을 이용해 주셔서</span>
            <span>진심으로 감사합니다.</span>
          </Notice>
          <ButWrap>
            <SubmitBut onClick={handleWithdrawComplete}>확인</SubmitBut>
          </ButWrap>
        </WithdrawContainer>
      }

    </PageContainer>
  );
};


export default MyPage;