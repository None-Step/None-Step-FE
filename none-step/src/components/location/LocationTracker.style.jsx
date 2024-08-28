import styled from "styled-components";
import { SubmitButton } from "@/pages/MyPage/MyPage.style";
import { Title } from "@/pages/MyPage/MyPage.style";

export const HomeContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.white};
    padding: 1.6rem 2rem;
    box-sizing: border-box;
`;

export const InBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

export const LocationTitle = styled(Title)`
    margin-bottom: 0 !important;
`;

export const LocationBut = styled(SubmitButton)`
    width: fit-content;
    padding: 0.8rem 1.2rem;
    box-sizing: border-box;
`;

export const Location = styled.p`
    font-size: 1.6rem;
    padding-block: 1.5rem 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ThisStop = styled.strong`
    font-size: 1.8rem;
`;

export const Notice = styled.span`
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.gray01};
`;

export const AccuracyMessage = styled(Location)`
    font-size: 1.4rem;
    padding: 0 0 2rem 0;
    color: ${(props) => props.theme.colors.gray01};
`;

export const Br = styled.br`
    display: none;

    @media (max-width: 400px) {
        display: block;
    }
`;

export const Strong = styled.strong`
    color: ${(props) => props.color};
`;

export const ToggleButton = styled.button`
    background-color: ${(props) =>
        props.$isActive
            ? props.theme.colors.primary
            : props.theme.colors.gray04};
    color: ${(props) =>
        props.$isActive ? props.theme.colors.white : props.theme.colors.black};
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;
