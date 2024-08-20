import styled from "styled-components";

export const ChatCategoryBtn = styled.button`
    display: flex;
    align-items: center;
    height: 32px;
    padding: 6px 12px;
    border: none;
    border-radius: 16px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    font-size: 1.4rem;
    outline: none;
    cursor: pointer;

    &.selected {
        color: ${(props) => props.theme.colors.white};
    }

    /* capital */
    &.capital.selected {
        background: ${(props) => props.theme.colors.primary};
    }

    &.capital_line1.selected {
        background: ${(props) => props.theme.capitalLines.one};
    }

    &.capital_line2.selected {
        background: ${(props) => props.theme.capitalLines.two};
    }

    &.capital_line3.selected {
        background: ${(props) => props.theme.capitalLines.three};
    }

    &.capital_line4.selected {
        background: ${(props) => props.theme.capitalLines.four};
    }

    &.capital_line5.selected {
        background: ${(props) => props.theme.capitalLines.five};
    }

    &.capital_line6.selected {
        background: ${(props) => props.theme.capitalLines.six};
    }

    &.capital_line7.selected {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    &.capital_line8.selected {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    &.capital_line9.selected {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    &.suinbundang.selected {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    &.shinbundang.selected {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    &.gyeonguijungang.selected {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    &.gyeongchun.selected {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    &.gyeonggang.selected {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    &.wooyishinseol.selected {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    &.sillim.selected {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    &.gimpogold.selected {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    &.everline.selected {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    &.seohae.selected {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    &.airport.selected {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    &.GTX_A.selected {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    &.uijeongbu.selected {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    &.incheon1.selected {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    &.incheon2.selected {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    &.busan.selected {
        background: ${(props) => props.theme.colors.primary};
    }

    &.busan_line1.selected {
        background: ${(props) => props.theme.busanLines.one};
    }

    &.busan_line2.selected {
        background: ${(props) => props.theme.busanLines.two};
    }

    &.busan_line3.selected {
        background: ${(props) => props.theme.busanLines.three};
    }

    &.busan_line4.selected {
        background: ${(props) => props.theme.busanLines.four};
    }

    &.donghae.selected {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    &.busan_gimhae.selected {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    &.daegu.selected {
        background: ${(props) => props.theme.colors.primary};
    }

    &.daegu_line1.selected {
        background: ${(props) => props.theme.daeguLines.one};
    }

    &.daegu_line2.selected {
        background: ${(props) => props.theme.daeguLines.two};
    }

    &.daegu_line3.selected {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */

    &.daejeon.selected {
        background: ${(props) => props.theme.colors.primary};
    }

    &.daejeon_line1.selected {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    &.gwangju.selected {
        background: ${(props) => props.theme.colors.primary};
    }

    &.gwangju_line1.selected {
        background: ${(props) => props.theme.gwangjuLines.one};
    }
`;
