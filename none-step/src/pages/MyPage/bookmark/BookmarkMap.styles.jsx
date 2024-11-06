import styled from "styled-components";

export const BookmarkMapContainer = styled.div`
    width: 100%;
    max-width: 600px;
`;

export const BookmarkList = styled.ul`
    li {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
        background-color: ${(props) => props.theme.colors.white};
        cursor: pointer;
    }

    li .bookmark_container {
        display: flex;
        align-items: center;
        width: calc(100% - 44px);
        padding-left: 12px;
    }

    li .bookmark_container svg {
        width: 24px;
        height: 24px;
        color: #ffcc00;
    }

    .bookmark_info {
        display: flex;
        align-items: center;
        margin-left: 14px;
    }

    .bookmark_info .station {
        margin-right: 8px;
        font-size: 1.6rem;
        font-weight: 500;
    }

    .bookmark_info .region {
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.6rem;
    }
`;

export const LineContainer = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 22px;
    height: 22px;
    margin-right: 7px;
    padding: 0 7px;
    border-radius: 14px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;

    /* capital */
    &.capital_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    &.capital_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    &.capital_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    &.capital_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    &.capital_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    &.capital_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    &.capital_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    &.capital_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    &.capital_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    &.capital_suin {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    &.capital_shinbundang {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    &.capital_gyeongui {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    &.capital_gyeongchun {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    &.capital_gyeonggang {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    &.capital_wooyi {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    &.capital_sillim {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    &.capital_gimpo {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    &.capital_ever {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    &.capital_seohae {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    &.capital_airport {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    &.capital_GTX_A {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    &.capital_uijeongbu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    &.capital_incheon1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    &.capital_incheon2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    &.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    &.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    &.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    &.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    &.busan_donghae {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    &.busan_gimhae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    &.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    &.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    &.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    &.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    &.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }
`;

export const DeleteButton = styled.button`
    width: 44px;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const Span = styled.span`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray02};
    display: inline-block;
    padding: 1rem;
`;
