import styled from "styled-components";

export const LicenseWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin-top: 70px;
    margin-bottom: 73px;
    background: #fafafa;
`;

export const LicenseContainer = styled.ul`
    li > div:first-child {
        border-top: 1px solid ${(props) => props.theme.colors.gray06};
    }

    li > div.license_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 25px;
        background: ${(props) => props.theme.colors.white};
        cursor: pointer;
    }

    li > .license_title span {
        font-size: 1.8rem;
        font-weight: 500;
    }

    li > div svg {
        width: 20px;
        height: 20px;
        color: #11152a;
        transition: all 0.2s ease;
        transform: rotate(0deg);
    }

    li > div.open svg {
        transition: all 0.2s ease;
        transform: rotate(180deg);
    }
`;

export const LicenseInfo = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    line-height: 1.5;
    background: #fcfcfc;
    transition: height 0.2s ease;
    overflow: hidden;

    &.open {
        height: auto;
        min-height: 130px;
        padding: 25px;
        transition: height 0.2s ease;
    }

    a {
        text-decoration: underline;
        color: -webkit-link;
        font-size: 1.5rem;
        word-break: break-all;
    }

    p {
        font-size: 1.5rem;
    }

    details summary {
        font-size: 1.5rem;
    }

    details pre {
        max-height: 200px;
        margin: 5px 0;
        padding: 10px;
        border: 1px solid ${(props) => props.theme.colors.gray03};
        border-radius: 4px;
        overflow-x: auto;
        font-size: 1.3rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

export const IconsMenuContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 15px;
    }

    span {
        display: block;
        font-size: 1.6rem;
        font-weight: 600;
    }

    .license_info {
        margin-left: 15px;
    }
`;
