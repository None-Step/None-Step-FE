import styled from "styled-components";

export const ChattingMenuWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - 145px);
    margin-top: 70px;
    margin-bottom: 75px;
    background: #fafafa;
`;

export const ChattingMenuContainer = styled.ul`
    & > li:not(:first-child) > div {
        border-top: 1px solid ${(props) => props.theme.colors.gray06};
    }

    & > li > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 0 25px;
        background: ${(props) => props.theme.colors.white};
        cursor: pointer;
    }

    & > li > div h3 {
        font-size: 2.2rem;
        font-weight: 500;
    }

    & > li > div svg {
        width: 20px;
        height: 20px;
        color: #11152a;
        transition: all 0.2s ease;
        transform: rotate(0deg);
    }

    & > li > div.open svg {
        transition: all 0.2s ease;
        transform: rotate(180deg);
    }
`;

export const ChattingLineContainer = styled.ul`
    position: relative;
    width: 100%;
    height: 0;
    background: #fcfcfc;
    transition: height 0.2s ease;
    overflow: hidden;

    &.open {
        height: auto;
        min-height: 130px;
        padding: 5px 0 30px;
        transition: height 0.2s ease;
    }

    @keyframes slideUpCapital {
        from {
            height: 1235px;
        }
        to {
            height: 0;
        }
    }

    @keyframes slideDownCapital {
        from {
            height: 0;
        }
        to {
            height: 1235px;
        }
    }

    li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 46px;
        padding: 0 40px;
        font-weight: 500;
        cursor: pointer;
    }

    li:not(:first-child) span:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
        margin-right: 7px;
        padding: 0 6px;
        border-radius: 10px;
        color: #fff;
        font-size: 1.2rem;
    }

    li span.capital_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    li span.capital_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    li span.capital_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    li span.capital_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    li span.capital_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    li span.capital_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    li span.capital_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    li span.capital_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    li span.capital_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    li span.capital_suin {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    li span.capital_shinbundang {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    li span.capital_gyeongui {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    li span.capital_gyeongchun {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    li span.capital_gyeonggang {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    li span.capital_wooyi {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    li span.capital_sillim {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    li span.capital_gimpo {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    li span.capital_ever {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    li span.capital_seohae {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    li span.capital_airport {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    li span.capital_GTX_A {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    li span.capital_uijeongbu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    li span.capital_incheon1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    li span.capital_incheon2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    li span.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    li span.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    li span.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    li span.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    li span.busan_donghae {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    li span.busan_gimhae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    li span.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    li span.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    li span.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    li span.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    li span.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    li span {
        font-size: 1.6rem;
    }

    li span.chatting_time {
        margin-left: 8px;
        color: #aaa;
        font-size: 1.2rem;
    }

    img {
        position: absolute;
        bottom: -30px;
        right: -30px;
        width: 40%;
        max-width: 170px;
        opacity: 0.15;
    }
`;
