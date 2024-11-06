import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateNickname } from "@/store/slices/memberSlice";
import { useNavigate } from "react-router-dom";
import Close, {
    PageContainer,
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
    SubmitButton,
    RightIcon,
    EditIconWrapper,
} from "./MyPage.style";
import Button from "@/components/Button";
import InputForm from "./MyPageInputForm";
import useLogout from "@/hooks/logout";
import { logout } from "@/store/slices/memberSlice";
import axiosInstance from "@/apis/axiosInstance";
import MenuBar from "@/components/menuBar/MenuBar";
import { PageHeader } from "@/components/header/Headers";
import DefaultProfile from "@/assets/img/profile-img.svg";
import { SignActionSpan } from "../Login/Login.style";
import { InputWrap, SubmitBut } from "@/pages/SignUp/SignUp02/SignUpForm.style";
import SimpleInputForm from "./SimpleInputForm";
import { IoClose } from "react-icons/io5";

const MyPage = () => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".bmp", ".gif"];

    const scrollRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [isWithdrawCompleteOpen, setIsWithdrawCompleteOpen] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [isNicknameValid, setIsNicknameValid] = useState(true);
    const [isNicknameEdited, setIsNicknameEdited] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editType, setEditType] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPhone, setCurrentPhone] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [checkVerificationCode, setCheckVerificationCode] = useState("");
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationPassed, setVerificationPassed] = useState(false);
    const [showVerificationMessage, setShowVerificationMessage] =
        useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");
    const [verificationButtonDisabled, setVerificationButtonDisabled] =
        useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 회원 정보 불러오기
    useEffect(() => {
        const fetchMemberInfo = () => {
            const token = sessionStorage.getItem("accessToken");
            if (token) {
                axiosInstance
                    .get("/nonestep/member/info", {
                        headers: { Authorization: token },
                    })
                    .then((response) => {
                        setMemberInfo(response.data);
                        setNicknameInput(response.data.memberNickName);
                        setNewEmail(response.data.memberMail);
                        setCurrentPhone(response.data.memberPhone);
                    })
                    .catch((error) => {
                        console.error("회원 정보 불러오기 실패:", error);
                        alert(
                            "회원 정보를 불러오는데 실패했습니다. 다시 시도해주세요."
                        );
                    });
            } else {
                // console.error("액세스 토큰이 없습니다.");
                navigate("/login");
            }
        };

        fetchMemberInfo();
    }, [navigate]);

    // 프로필 편집 모달 열기
    const handleModalOpen = useCallback(() => {
        setIsModalOpen(true);
        setNicknameInput(memberInfo?.memberNickName || "");
        setIsNicknameEdited(false);
        if (scrollRef.current) {
            scrollRef.current.style.overflow = "hidden";
        }
    }, [memberInfo]);

    // 프로필 편집 모달 닫기
    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        if (scrollRef.current) {
            scrollRef.current.style.overflow = "auto";
        }
    }, []);

    // 회원 탈퇴 모달 열기
    const handleWithdrawOpen = useCallback(() => {
        setIsWithdrawOpen(true);
    }, []);

    // 회원 탈퇴 모달 닫기
    const handleWithdrawClose = useCallback(() => {
        setIsWithdrawOpen(false);
    }, []);

    const handleLogout = useLogout();

    // 닉네임 변경 처리하기
    const handleNicknameChange = useCallback((value) => {
        setNicknameInput(value);
        setIsNicknameEdited(true);
    }, []);

    // 닉네임 유효성 검사하기
    const handleNicknameValidation = useCallback((isValid) => {
        setIsNicknameValid(isValid);
    }, []);

    // 프로필 저장하기
    const handleSaveProfile = useCallback(() => {
        if (!isNicknameEdited && !selectedImage) {
            handleModalClose();
            return;
        }

        if (isNicknameValid) {
            const formData = new FormData();

            if (isNicknameEdited) {
                formData.append("memberNickName", nicknameInput);
            }

            if (selectedImage) {
                formData.append("memberIMG", selectedImage);
            }

            if (formData.has("memberNickName") || formData.has("memberIMG")) {
                axiosInstance
                    .put("/nonestep/member/modify-nickname", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        const updatedNickname =
                            response.data.memberNickName ||
                            response.data.memberNickname ||
                            nicknameInput;
                        setMemberInfo((prevInfo) => ({
                            ...prevInfo,
                            memberNickName: updatedNickname,
                            memberIMG:
                                response.data.memberIMG || prevInfo.memberIMG,
                        }));
                        setNicknameInput(updatedNickname);
                        setIsNicknameEdited(false);
                        handleModalClose();
                        setSelectedImage(null);
                        alert("프로필이 성공적으로 업데이트되었습니다.");

                        dispatch(updateNickname(updatedNickname));
                    })
                    .catch((error) => {
                        console.error("프로필 업데이트 실패:", error);
                        alert(
                            "프로필 업데이트에 실패했습니다. 다시 시도해주세요."
                        );
                    });
            } else {
                handleModalClose();
            }
        } else {
            alert("올바른 닉네임을 입력해주세요.");
        }
    }, [
        isNicknameEdited,
        isNicknameValid,
        nicknameInput,
        selectedImage,
        handleModalClose,
        dispatch,
    ]);

    // 이미지 선택 처리하기
    const handleImageChange = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (file.size > MAX_FILE_SIZE) {
                alert("파일 크기는 10MB를 초과할 수 없습니다.");
                event.target.value = "";
                return;
            }

            const fileExtension =
                "." + file.name.split(".").pop().toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
                alert(
                    "허용되지 않는 파일 형식입니다. PNG, JPG, JPEG, BMP, GIF 파일만 업로드 가능합니다."
                );
                event.target.value = "";
                return;
            }

            setSelectedImage(file);
        }
    }, []);

    const handleDeleteImage = () => {
        setSelectedImage("");
    };

    // 정보 수정 모달 닫기
    const handleEditModalClose = useCallback(() => {
        setEditModalOpen(false);
        setEditType("");
    }, []);

    // 비밀번호 변경하기
    const handlePasswordChange = useCallback(() => {
        const passwordData = {
            memberID: memberInfo.memberID,
            memberName: memberInfo.memberName,
            memberPhone: memberInfo.memberPhone,
            memberPass: newPassword,
        };

        axiosInstance
            .put("/nonestep/member/modify-pass", passwordData)
            .then((response) => {
                if (response.data.message.toLowerCase() === "success") {
                    alert("비밀번호가 성공적으로 변경되었습니다.");
                    handleEditModalClose();
                    setNewPassword("");
                }
            })
            .catch((error) => {
                console.error("비밀번호 변경 실패:", error);
                alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            });
    }, [memberInfo, newPassword, handleEditModalClose]);

    // 이메일 변경하기
    const handleEmailChange = useCallback(() => {
        axiosInstance
            .put("/nonestep/member/modify-mail", { memberMail: newEmail })
            .then((response) => {
                if (response.data.message.toLowerCase() === "success") {
                    setMemberInfo((prevInfo) => ({
                        ...prevInfo,
                        memberMail: newEmail,
                    }));
                    alert("이메일이 성공적으로 변경되었습니다.");
                    handleEditModalClose();
                }
            })
            .catch((error) => {
                console.error("이메일 변경 실패:", error);
                alert("이메일 변경에 실패했습니다. 다시 시도해주세요.");
            });
    }, [newEmail, handleEditModalClose]);

    // 인증번호 발송하기
    const sendVerificationCode = useCallback(
        (event) => {
            event.preventDefault();
            if (currentPhone) {
                axiosInstance
                    .post(`/nonestep/member/phone`, {
                        memberPhone: currentPhone,
                    })
                    .then((response) => {
                        setCheckVerificationCode(
                            response.data.authenticationNumber
                        );
                        setShowVerificationMessage(true);
                        setVerificationSent(true);
                        setVerificationPassed(false);
                        setVerificationMessage("");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("인증번호 발송에 실패했습니다.");
                    });
            }
        },
        [currentPhone]
    );

    // 인증번호 확인하기
    const verifyCode = useCallback(() => {
        if (verificationCode === checkVerificationCode) {
            setVerificationPassed(true);
            alert("인증이 완료되었습니다.");
        } else {
            setVerificationPassed(false);
            alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
    }, [verificationCode, checkVerificationCode]);

    // 휴대폰 번호 변경하기
    const handlePhoneChange = useCallback(() => {
        if (verificationPassed) {
            axiosInstance
                .put("/nonestep/member/modify-phone", { memberPhone: newPhone })
                .then((response) => {
                    if (response.data.message.toLowerCase() === "success") {
                        setMemberInfo((prevInfo) => ({
                            ...prevInfo,
                            memberPhone: newPhone,
                        }));
                        alert("휴대폰 번호가 성공적으로 변경되었습니다.");
                        handleEditModalClose();
                    }
                })
                .catch((error) => {
                    console.error("휴대폰 번호 변경 실패:", error);
                    alert(
                        "휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요."
                    );
                });
        } else {
            alert("먼저 인증을 완료해주세요.");
        }
    }, [newPhone, verificationPassed, handleEditModalClose]);

    // 인증번호 입력값 변경 처리하기
    const handleVerificationCodeChange = useCallback((isValid, value) => {
        setVerificationCode(value || "");
        setVerificationButtonDisabled(!value || value.length === 0);
    }, []);

    // 회원 탈퇴하기
    const handleWithdraw = useCallback(() => {
        axiosInstance
            .post("/nonestep/member/delete")
            .then((response) => {
                if (response.data.message.toLowerCase() === "success") {
                    setIsWithdrawOpen(false);
                    setIsWithdrawCompleteOpen(true);
                }
            })
            .catch((error) => {
                console.error("회원 탈퇴 오류:", error);
                alert(
                    "회원 탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            });
    }, []);

    // 회원 탈퇴 완료 후 메인 페이지로 이동하기
    const handleWithdrawComplete = useCallback(() => {
        setIsWithdrawCompleteOpen(false);

        // 리덕스 스토어에서 사용자 정보 제거
        dispatch(logout());

        // 세션 스토리지에서 관련 데이터 제거
        sessionStorage.removeItem("persist:root");
        sessionStorage.removeItem("accessToken");

        // axios 인스턴스의 기본 헤더에서 Authorization 제거
        delete axiosInstance.defaults.headers.common["Authorization"];

        navigate("/");
    }, [dispatch, navigate]);

    // 프로필 변경 항목 선택하기
    const handleEditClick = useCallback(
        (type) => {
            setEditType(type);
            setEditModalOpen(true);
            if (type === "이메일") {
                setNewEmail(memberInfo.memberMail);
            } else if (type === "휴대폰 번호") {
                setCurrentPhone(memberInfo.memberPhone);
            }
        },
        [memberInfo]
    );

    function handleBookmark($clickable) {
        switch ($clickable) {
            case "길찾기":
                navigate("/mypage/bookmark/find");
                break;
            case "지도":
                navigate("/mypage/bookmark/map");
                break;

            default:
                break;
        }
    }

    return (
        <>
            <PageHeader />
            <PageContainer ref={scrollRef}>
                {memberInfo && (
                    <ProfileSection>
                        <ProfileInfoWrap>
                            <ProfileInfo>
                                <ProfileImage
                                    src={memberInfo.memberIMG || DefaultProfile}
                                    alt="Profile"
                                />
                                <ProfileName>
                                    {memberInfo.memberNickName}
                                </ProfileName>
                            </ProfileInfo>
                            <ProfileTag>{memberInfo.memberRandom}</ProfileTag>
                        </ProfileInfoWrap>
                        <Button
                            onClick={handleModalOpen}
                            submitMessage="프로필 편집하기"
                        ></Button>
                    </ProfileSection>
                )}

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
                        <InfoItem
                            $clickable
                            onClick={() => handleEditClick("비밀번호")}
                        >
                            <span>비밀번호</span>
                            <RightIcon />
                        </InfoItem>
                        <InfoItem
                            $clickable
                            onClick={() => handleEditClick("이메일")}
                        >
                            <span>이메일</span>
                            <RightIcon />
                        </InfoItem>
                        <InfoItem
                            $clickable
                            onClick={() => handleEditClick("휴대폰 번호")}
                        >
                            <span>휴대폰 번호</span>
                            <RightIcon />
                        </InfoItem>
                    </InfoSection>
                )}

                <InfoSection>
                    <SectionTitle>즐겨찾기 관리</SectionTitle>
                    <InfoItem
                        $clickable
                        onClick={() => handleBookmark("길찾기")}
                    >
                        <span>길찾기</span>
                        <RightIcon />
                    </InfoItem>
                    <InfoItem $clickable onClick={() => handleBookmark("지도")}>
                        <span>지도</span>
                        <RightIcon />
                    </InfoItem>
                </InfoSection>

                <InfoSection>
                    <SectionTitle>계정 관리</SectionTitle>
                    <InfoItem $clickable onClick={handleLogout}>
                        <span>로그아웃</span>
                        <RightIcon />
                    </InfoItem>
                </InfoSection>
                <Withdraw onClick={handleWithdrawOpen}>회원탈퇴</Withdraw>

                {/* 프로필 편집(이미지, 닉네임 수정) 모달 */}
                {isModalOpen && (
                    <>
                        <ModalBG onClick={handleModalClose} />
                        <ModalContainer>
                            <ActionTitle>프로필편집</ActionTitle>

                            <ProfileImgContainer>
                                <EditIconWrapper>
                                    {selectedImage !== "" && (
                                        <div className="profile_img_reset">
                                            <button onClick={handleDeleteImage}>
                                                <IoClose />
                                            </button>
                                        </div>
                                    )}
                                    <ProfileImageLagrge
                                        src={
                                            selectedImage
                                                ? URL.createObjectURL(
                                                      selectedImage
                                                  )
                                                : memberInfo.memberIMG ||
                                                  DefaultProfile
                                        }
                                        alt="Profile"
                                    />
                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        accept="image/png, image/jpeg, image/gif, image/bmp"
                                        onChange={handleImageChange}
                                        style={{
                                            display: "none",
                                            position: "relative",
                                        }}
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
                            <Button
                                onClick={handleSaveProfile}
                                submitMessage="저장하기"
                            />

                            <Close onClick={handleModalClose}>닫기</Close>
                        </ModalContainer>
                    </>
                )}

                {/* 프로필 편집(비밀번호, 메일, 휴대폰번호 수정) 모달 */}
                {editModalOpen && (
                    <>
                        <ModalBG onClick={handleEditModalClose} />
                        <ModalContainer>
                            <ActionTitle>{editType} 수정</ActionTitle>
                            {editType === "비밀번호" && (
                                <>
                                    <InputForm
                                        label="새 비밀번호"
                                        type="password"
                                        placeholder="새 비밀번호를 입력하세요"
                                        onChange={(value) =>
                                            setNewPassword(value)
                                        }
                                    />
                                </>
                            )}
                            {editType === "이메일" && (
                                <InputForm
                                    label="새 이메일"
                                    type="email"
                                    placeholder="새 이메일을 입력하세요"
                                    value={newEmail}
                                    onChange={(value) => setNewEmail(value)}
                                />
                            )}
                            {editType === "휴대폰 번호" && (
                                <>
                                    <InputWrap>
                                        <InputForm
                                            label="현재 휴대폰 번호"
                                            type="text"
                                            placeholder="현재 휴대폰 번호"
                                            value={currentPhone}
                                            onChange={(value) =>
                                                setCurrentPhone(value)
                                            }
                                            onValidationChange={(isValid) =>
                                                setPhoneNumberValid(isValid)
                                            }
                                        />
                                        <SubmitBut
                                            onClick={sendVerificationCode}
                                            disabled={!phoneNumberValid}
                                        >
                                            {verificationSent
                                                ? "재발송"
                                                : "인증"}
                                        </SubmitBut>
                                    </InputWrap>
                                    <InputWrap>
                                        <InputForm
                                            label="인증번호"
                                            type="text"
                                            placeholder="인증번호 입력"
                                            value={verificationCode}
                                            onChange={(value) =>
                                                setVerificationCode(value)
                                            }
                                            onValidationChange={
                                                handleVerificationCodeChange
                                            }
                                        />

                                        <SubmitBut
                                            onClick={verifyCode}
                                            disabled={
                                                verificationButtonDisabled ||
                                                !verificationSent ||
                                                verificationPassed
                                            }
                                        >
                                            확인
                                        </SubmitBut>
                                    </InputWrap>
                                    {showVerificationMessage && (
                                        <SignActionSpan>
                                            인증번호가 발송되었습니다. 3분
                                            이내로 인증번호를 입력해주세요.
                                        </SignActionSpan>
                                    )}
                                    {verificationMessage && (
                                        <SignActionSpan>
                                            {verificationMessage}
                                        </SignActionSpan>
                                    )}
                                    <SimpleInputForm
                                        label="새 휴대폰 번호"
                                        type="text"
                                        placeholder="새 휴대폰 번호"
                                        value={newPhone}
                                        onChange={(value) => setNewPhone(value)}
                                    />
                                </>
                            )}
                            <Button
                                onClick={
                                    editType === "비밀번호"
                                        ? handlePasswordChange
                                        : editType === "이메일"
                                        ? handleEmailChange
                                        : handlePhoneChange
                                }
                                submitMessage="저장하기"
                            />
                            <Close onClick={handleEditModalClose}>닫기</Close>
                        </ModalContainer>
                    </>
                )}

                {/* 회원 탈퇴 step.1 팝업 */}
                {isWithdrawOpen && (
                    <>
                        <ModalBG onClick={handleWithdrawClose} />
                        <WithdrawContainer>
                            <Title>회원 탈퇴하기</Title>
                            <Notice>
                                <span>
                                    현재 가입한 아이디와 동일한 아이디로
                                </span>
                                <span>재가입이 불가능합니다.</span>
                                <span>정말 탈퇴 하시겠습니까?</span>
                            </Notice>
                            <ButWrap>
                                <SeconBut onClick={handleWithdrawClose}>
                                    취소
                                </SeconBut>
                                <But onClick={handleWithdraw}>탈퇴하기</But>
                            </ButWrap>
                        </WithdrawContainer>
                    </>
                )}

                {/* 회원 탈퇴 step.2 팝업 */}
                {isWithdrawCompleteOpen && (
                    <>
                        <ModalBG onClick={handleWithdrawComplete} />
                        <WithdrawContainer>
                            <Title>회원 탈퇴 완료</Title>
                            <Notice>
                                <span>그동안 이번역을 이용해 주셔서</span>
                                <span>진심으로 감사합니다.</span>
                            </Notice>
                            <ButWrap>
                                <SubmitButton onClick={handleWithdrawComplete}>
                                    확인
                                </SubmitButton>
                            </ButWrap>
                        </WithdrawContainer>
                    </>
                )}
            </PageContainer>
            <MenuBar />
        </>
    );
};

export default MyPage;
