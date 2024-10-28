import styled from "styled-components";

export const DetailWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: calc(100vh - 142px);
    margin-top: 70px;
    margin-bottom: 72px;
    background: ${(props) => props.theme.colors.white};

    .contents_line {
        display: block;
        width: calc(100% - 40px);
        margin: 0 auto;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
    }
`;

export const DetailContainer = styled.div`
    padding: 30px 20px;

    h4 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2.5rem;
        margin-bottom: 10px;
        font-size: 1.8rem;
        font-weight: 600;
        word-break: keep-all;
    }
`;

export const ContentTimeContainer = styled.div`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
    color: ${(props) => props.theme.colors.gray01};
    font-size: 1.4rem;

    .modify_container::before {
        content: "|";
        margin: 0 6px;
        color: ${(props) => props.theme.colors.gray03};
    }

    .modify_container {
        display: inline-block;
    }

    .write_time,
    .modify_time {
        margin-left: 4px;
        letter-spacing: 0.2px;
    }
`;

export const ContentContainer = styled.div`
    min-height: calc(100vh - 400px);

    p {
        line-height: 2.4rem;
        font-size: 1.6rem;
        word-break: keep-all;
    }

    p img {
        width: 100%;
    }

    p a {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: underline;
        word-break: break-all;
    }

    p ul li {
        list-style: disc;
        list-style-position: inside;
        padding-left: 1.5em;
    }

    p ol li {
        list-style: decimal;
        list-style-position: inside;
        padding-left: 1.5em;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 16px 30px;
    margin-top: 20px;
`;

export const NoticeAdminContainer = styled.div``;

export const NoticeButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    font-size: 1.4rem;
    outline: none;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: #0069da;
    }
`;

export const NoticeInvertedButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-right: 8px;
    padding: 8px 16px;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 4px;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.4rem;
    outline: none;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.gray06};
    }
`;
