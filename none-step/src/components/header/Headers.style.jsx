import styled from "styled-components";

export const HeaderWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    height: 70px;
    padding: 2rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: left;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 99;
`;

export const PageName = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-left: 1rem;
`;

export const Icon = styled.img`
    cursor: pointer;
`;

export const IconAuthState = styled(Icon)`
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    right: 20px;
`;

export const MainWrapper = styled(HeaderWrapper)`
    justify-content: center;

    img {
        cursor: pointer;
    }
`;
