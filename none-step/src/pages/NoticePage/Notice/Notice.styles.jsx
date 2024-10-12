import styled from "styled-components";

export const NoticeWrapper = styled.div`
    width: 100%;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow100};
    cursor: pointer;
`;

export const NoticeContainer = styled.div`
    padding: 16px;

    h4 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2.5rem;
        margin-bottom: 10px;
        font-size: 1.8rem;
        font-weight: 600;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }
`;

export const ContentTimeContainer = styled.div`
    margin-bottom: 20px;
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 2.4rem;
    font-size: 1.6rem;
    text-overflow: ellipsis;
    word-break: keep-all;
    overflow: hidden;

    p strong {
        font-weight: 400;
        background-color: transparent !important;
        color: #000 !important;
    }

    p em {
        font-style: normal;
    }

    p u,
    s {
        text-decoration: none;
    }

    p span {
        background-color: transparent !important;
        color: #000 !important;
    }

    p > img {
        display: none;
        line-height: 0;
    }
`;
