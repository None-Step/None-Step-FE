import styled from "styled-components";

export const ChatCategoryWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 10px 0;
    background: ${(props) => props.theme.colors.white};
    z-index: 10;
`;

export const ChatCategoryContainer = styled.ul`
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
        margin-left: 20px;
    }

    li:last-child {
        margin-right: 20px;
    }
`;

export const ChattingWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 64px);
    margin-top: 64px;
`;

export const ChattingContainer = styled.div``;

export const ChattingInputContainer = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    height: 60px;
    padding: 10px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
`;

const StyledInput = styled.input`
    width: calc(100% - 45px);
    height: 40px;
    padding: 0 10px;
    border: 1px solid ${(props) => props.theme.colors.gray04};
    border-radius: 4px;
    background: ${(props) => props.theme.colors.white};
    font-size: 1.4rem;
    outline: none;
`;

export const ChattingInput = (props) => {
    return <StyledInput {...props} />;
};

export const MessageSendBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.primary};
    outline: none;
    cursor: pointer;

    svg {
        width: 22px;
        height: 22px;
        color: #fff;
    }
`;
