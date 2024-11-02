import styled from "styled-components";

export const NoticeSearchWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    min-height: calc(100vh - 142px);
    margin-top: 70px;
    margin-bottom: 72px;
    background: #fafafa;
`;

export const NoticeSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;

export const NoResultContainer = styled.div`
    /* display: flex;
    justify-content: center; */
    padding: 30px 10px;

    p {
        margin-bottom: 20px;
        color: #666;
        font-size: 1.8rem;
        font-weight: 500;
        word-break: keep-all;
    }

    em {
        color: ${(props) => props.theme.colors.primary};
        font-weight: 600;
        font-style: normal;
    }

    ul li {
        list-style: disc;
        list-style-position: inside;
        padding-left: 5px;
        font-size: 1.6rem;
        color: ${(props) => props.theme.colors.gray01};
    }

    ul li::marker {
        content: "· ";
        color: ${(props) => props.theme.colors.gray02};
    }

    ul li:not(:last-child) {
        margin-bottom: 5px;
    }
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
