import styled from "styled-components";

export const CongestionTimeWrapper = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1.5rem;
    }

    th,
    td {
        width: 33.333%;
        height: 40px;
        border: 1px solid ${(props) => props.theme.colors.gray06};
        word-break: keep-all;
    }

    th {
        background: #f8fafa;
        color: #4f4f4f;
        font-weight: 500;
    }

    th.current {
        color: ${(props) => props.theme.colors.primary};
    }

    td {
        text-align: center;
    }

    td span {
        display: inline-flex;
        align-items: center;
        height: 30px;
        padding: 0 10px;
        border-radius: 15px;
        color: #fff;
        font-weight: 500;
    }

    td span.uncrowded {
        background: #007aff;
    }

    td span.normal {
        background: #34c759;
    }

    td span.caution {
        background: #ffc500;
    }

    td span.congested {
        background: #ff3b30;
    }

    td span.nothing {
        background: ${(props) => props.theme.colors.gray01};
    }
`;
