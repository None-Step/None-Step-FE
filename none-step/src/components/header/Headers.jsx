import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "@/assets/img/header-logo.svg";
import LogInIcon from "@/assets/img/user.svg";
import LogOutIcon from "@/assets/img/logout.svg";
import LeftArrow from "@/assets/img/LeftArrow.svg";
import {
    HeaderWrapper,
    Icon,
    IconAuthState,
    MainWrapper,
    PageName,
} from "./Headers.style";
import useLogout from "@/hooks/logout";

export const MainHeader = () => {
    const isAuthorized = useSelector((state) => state.member.isAuthorized);
    const navigate = useNavigate();
    const handleLogout = useLogout();

    const handleIconClick = () => {
        if (isAuthorized) {
            handleLogout();
        } else {
            navigate("/login");
        }
    };

    return (
        <MainWrapper>
            <img src={logoImage} width="130px" alt="로고" />
            <IconAuthState
                src={isAuthorized ? LogOutIcon : LogInIcon}
                alt={isAuthorized ? "로그아웃 아이콘" : "로그인 아이콘"}
                onClick={handleIconClick}
            />
        </MainWrapper>
    );
};

export const PageHeader = () => {
    const isAuthorized = useSelector((state) => state.member.isAuthorized);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const handleLogout = useLogout();

    const handleNavigation = () => {
        navigate(-1);
    };

    const handleIconClick = () => {
        if (isAuthorized) {
            handleLogout();
        } else {
            navigate("/login");
        }
    };

    const getPageName = () => {
        if (/^\/notice\/\d+$/.test(currentPath)) {
            return "공지사항";
        }

        if (/^\/notice\/modify\/\d+$/.test(currentPath)) {
            return "공지사항 수정";
        }

        switch (currentPath) {
            case "/findway":
                return "길찾기";
            case "/findway/route":
                return "경로 선택";
            case "/findway/navigate":
                return "길안내";
            case "/chat":
                return "채팅";
            case "/mypage":
                return "내정보";
            case "/mypage/bookmark/find":
                return "길찾기 즐겨찾기";
            case "/mypage/bookmark/map":
                return "지도 즐겨찾기";
            case "/map":
                return "지도";
            case "/chat/capital":
                return "수도권";
            case "/chat/busan":
                return "부산";
            case "/chat/daejeon":
                return "대전";
            case "/chat/daegu":
                return "대구";
            case "/chat/gwangju":
                return "광주";
            case "/notice":
                return "공지사항";
            case "/notice/edit":
                return "공지사항 작성";
            case "/notice/search":
                return "공지사항 검색";
            default:
                return "";
        }
    };

    return (
        <HeaderWrapper>
            <Icon
                src={LeftArrow}
                alt="뒤로가기 버튼"
                onClick={handleNavigation}
            />
            <PageName>{getPageName()}</PageName>
            <IconAuthState
                src={isAuthorized ? LogOutIcon : LogInIcon}
                alt={isAuthorized ? "로그아웃 아이콘" : "로그인 아이콘"}
                onClick={handleIconClick}
            />
        </HeaderWrapper>
    );
};
