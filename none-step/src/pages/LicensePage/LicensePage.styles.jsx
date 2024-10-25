import styled from "styled-components";

export const LicenseWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin-top: 70px;
    margin-bottom: 73px;
    background: #fafafa;
`;

export const PartContainer = styled.ul`
    & > li > div:not(:first-child) {
        border-top: 1px solid ${(props) => props.theme.colors.gray06};
    }

    li > div.part_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 0 25px;
        background: ${(props) => props.theme.colors.white};
        cursor: pointer;
    }

    li > .part_title span {
        font-size: 1.8rem;
        font-weight: 500;
    }

    li > div svg {
        width: 20px;
        height: 20px;
        color: #333;
        transition: all 0.2s ease;
        transform: rotate(0deg);
    }

    li > div.part_open > svg {
        transition: all 0.2s ease;
        transform: rotate(180deg);
    }
`;

export const PartInfo = styled.div`
    height: 0;
    background: #fff;
    transition: height 0.2s ease;
    overflow: hidden;

    &.part_open {
        height: auto;
        min-height: 130px;
        transition: height 0.2s ease;
    }

    .part_license_info {
        padding: 25px;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
    }

    .part_license_info h3 {
        text-align: center;
        font-size: 1.6rem;
        font-weight: 500;
    }

    .part_license_info p {
        line-height: 1.5;
        margin: 20px 0;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 400;
        word-break: keep-all;
    }

    .part_license_info details summary {
        font-size: 1.5rem;
    }

    .part_license_info details > pre {
        max-height: 200px;
        margin: 5px 0;
        padding: 15px 10px;
        border: 1px solid ${(props) => props.theme.colors.gray03};
        border-radius: 4px;
    }

    .part_license_info details pre {
        color: #4f4f4f;
        font-size: 1.5rem;
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    }

    details pre.license_header {
        text-align: center;
        margin-bottom: 15px;
    }
`;

export const LicenseContainer = styled.ul`
    & > li:last-child {
        border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
    }

    li > div.license_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 35px;
        background: ${(props) => props.theme.colors.white};
        cursor: pointer;
    }

    li > .license_title span {
        font-size: 1.6rem;
        font-weight: 400;
    }

    li > div svg {
        width: 18px;
        height: 18px;
        color: #333;
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
        padding: 25px 30px;
        transition: height 0.2s ease;
    }

    a {
        display: block;
        text-decoration: underline;
        color: -webkit-link;
        font-size: 1.5rem;
        word-break: break-all;
    }

    p {
        font-size: 1.5rem;
    }

    p.copyright {
        color: #777;
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
        font-size: 1.3rem;
        overflow-x: auto;
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
        font-weight: 500;
    }

    .license_info {
        margin-left: 15px;
    }
`;

export const DataListContainer = styled.ul`
    position: relative;
    width: 100%;
    height: 0;
    line-height: 1.5;
    background: #fcfcfc;
    transition: height 0.2s ease;
    overflow: hidden;

    li {
        margin-left: 20px;
        margin-bottom: 10px;
        color: #333;
        font-size: 1rem;
        list-style-type: disc;
    }

    &.open {
        height: auto;
        padding: 25px 30px;
        transition: height 0.2s ease;
    }

    a {
        display: block;
        text-decoration: underline;
        color: -webkit-link;
        font-size: 1.5rem;
        word-break: break-all;
    }
`;
