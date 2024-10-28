import React from "react";
import { Container, Description } from "@/components/CommonStyles";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../Login/Login.style";
import MenuBar from "@/components/menuBar/MenuBar";

const FindPWSuccess = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <Wrapper>
            <Container>
                <Logo />
                <Description>비밀번호 변경이 완료되었습니다.</Description>
                <Description>변경된 비밀번호로 로그인 해 보세요.</Description>
                <Button
                    onClick={handleLoginRedirect}
                    submitMessage="로그인하기"
                />
            </Container>

            <MenuBar />
        </Wrapper>
    );
};

export default FindPWSuccess;
