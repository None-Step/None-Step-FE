import styled from "styled-components";

export const MapWrapper = styled.div`
    position: relative;
    top: 60px;
    width: 100%;
    max-width: 100%;
    height: calc(100vh - 120px);
`;

export const SearchWrapper = styled.div`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    max-width: 100%;
    z-index: 10;
`;

export const SearchInputContainer = styled.div`
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 15px;
        height: 15px;
        color: ${(props) => props.theme.colors.gray01};
    }
`;

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px 0 30px;
    border: none;
    border-radius: 4px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    font-size: 1.4rem;
    outline: none;
`;

export const SearchInput = (props) => {
    return <StyledInput {...props} />;
};

export const CategoryWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 10;
`;

export const CategoryContainer = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: mandatory;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    li:first-child {
        margin-left: 8.5%;
    }

    li:last-child {
        margin-right: 8.5%;
    }
`;

export const CategoryBtn = styled.button`
    height: 32px;
    padding: 6px 12px;
    border: none;
    border-radius: 15px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    font-size: 1.4rem;
    outline: none;
    cursor: pointer;

    &.selected {
        background: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.white};
    }

    svg,
    img {
        width: 14px;
        height: 14px;
    }

    span {
        margin-left: 5px;
    }
`;

export const OverlayContainer = styled.div`
    max-width: 370px;
    padding: 5px 10px 5px 7px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    color: #333;

    span {
        font-size: 1.4rem;
    }

    & > p {
        line-height: 2rem;
    }

    p > span:first-child {
        margin-right: 5px;
        vertical-align: middle;
        color: #9ca3af;
    }

    p > span:nth-child(2) {
        color: #4f4f4f;
    }

    p span svg {
        width: 16px;
        height: 16px;
        color: #9ca3af;
    }

    .lift_comment {
        display: block;
        margin-left: 66px;
        margin-bottom: 7px;
    }
`;

export const ZoomControlContainer = styled.div`
    position: absolute;
    bottom: 80px;
    right: 12px;
    width: 36px;
    box-shadow: ${(props) => props.theme.colors.shadow200};
    z-index: 10;
`;

export const ZoomControlBtn = styled.button`
    width: 100%;
    height: 36px;
    border: none;
    border-radius: 3px 3px 0 0;
    background: ${(props) => props.theme.colors.white};
    color: #333;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:first-child {
        height: 37px;
        border-bottom: 1px solid #e2e2e2;
    }

    &:last-child {
        border-radius: 0 0 3px 3px;
    }

    &:active {
        background: ${(props) => props.theme.colors.secondary};
    }
`;

export const LocationBtn = styled.button`
    position: absolute;
    bottom: 20px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;
    z-index: 10;

    &:active {
        background: ${(props) => props.theme.colors.gray06};
    }

    img {
        width: 20px;
        height: 20px;
        color: ${(props) => props.theme.colors.primary};
    }
`;
