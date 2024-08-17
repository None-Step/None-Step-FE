import styled from "styled-components";

export const MenuWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 1.4rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 99;
`;

export const IconBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg path {
        fill: ${(props) =>
            props.$isActive ? props.theme.colors.primary : "#333333"};
    }
`;

export const SvgIcon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MenuName = styled.span`
    font-size: 1.6rem;
    text-align: center;
    margin-top: 0.8rem;
    color: ${(props) =>
        props.$isActive ? props.theme.colors.primary : "#333333"};
`;
