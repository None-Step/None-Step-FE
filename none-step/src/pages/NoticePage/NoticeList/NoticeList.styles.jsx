import styled from "styled-components";

export const NoticeListWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    min-height: calc(100vh - 142px);
    margin-top: 70px;
    margin-bottom: 72px;
    background: #fafafa;
`;

export const NoticeListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
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

export const CreateNoticeContainer = styled.div`
    position: sticky;
    bottom: 87px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 600px;
`;

export const CreateNotice = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: #0069da;
    }

    svg {
        width: 24px;
        height: 24px;
        color: ${(props) => props.theme.colors.white};
    }
`;

export const PaginateContainer = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 20px;
    color: ${(props) => props.theme.colors.gray02};

    li {
        cursor: pointer;
    }

    li svg {
        width: 24px;
        height: 24px;
        transition: all 0.2s ease;
    }

    li svg:hover {
        color: #666;
    }

    .page {
        display: inline-block;
        margin: 0 10px;
        font-size: 1.6rem;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .page:hover {
        color: #666;
        text-decoration: underline;
    }

    .page.selected {
        color: #666;
        font-weight: 500;
    }
`;
