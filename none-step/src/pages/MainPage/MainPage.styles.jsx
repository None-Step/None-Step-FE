import styled from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 100%;
    margin-top: 60px;
    margin-bottom: 95px;
    background: #fafafa;

    h3 {
        margin-bottom: 30px;
        font-size: 1.8rem;
    }
`;

export const MainSection = styled.div`
    width: 100%;
    height: 250px;
    background: linear-gradient(
        -127deg,
        rgba(0, 73, 153, 1) 0%,
        rgba(136, 193, 255, 1) 100%
    );
`;

export const CategoryWrapper = styled.div`
    padding: 20px 20px 25px;
    background: ${(props) => props.theme.colors.white};
`;

export const CategoryContainer = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 0 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    li {
        display: block;
    }
`;

export const CategoryBtn = styled.button`
    width: 100px;
    height: 100px;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    img {
        width: 40px;
        height: 40px;
        margin-bottom: 15px;
    }

    span {
        display: block;
        font-size: 1.4rem;
        font-weight: 500;
        word-break: keep-all;
    }
`;

export const ChatWrapper = styled.div`
    padding: 20px;
    background: ${(props) => props.theme.colors.white};
`;

export const ChatContainer = styled.ul`
    width: 100%;

    li {
        float: left;
        width: calc(50% - 7.5px);
        height: 80px;
    }

    li:nth-child(odd) {
        margin-right: 15px;
        margin-bottom: 15px;
    }

    li:nth-child(even) {
        margin-bottom: 15px;
    }
`;

export const ChatBtn = styled.button`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;
    background: none;
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    cursor: pointer;

    img {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 60px;
        opacity: 0.2;
    }

    span {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 1.8rem;
        font-weight: 600;
    }
`;
