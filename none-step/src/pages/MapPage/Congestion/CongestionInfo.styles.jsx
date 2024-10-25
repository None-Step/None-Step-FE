import styled from "styled-components";

export const CongestionInfoWrapper = styled.div`
    position: absolute;
    top: 107px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: calc(100vh - 277px);
    padding: 30px 0 10px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 7px;
    background: ${(props) => props.theme.colors.white};
    overflow: hidden;
    z-index: 20;

    @media screen and (max-width: 500px) {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(0);
        width: 100%;
        height: calc(100vh - 142px);
        border: none;
        border-radius: 0;
    }
`;

export const CongestionInfoCloseBtn = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    svg {
        width: 22px;
        height: 22px;
        color: ${(props) => props.theme.colors.gray01};
    }
`;

export const StationNameWrapper = styled.div`
    display: flex;
    justify-content: center;

    &::before {
        content: "";
        position: absolute;
        top: 72px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 40px);
        height: 20px;
        border-radius: 10px;
    }

    /* capital */
    &.capital_line1::before {
        background: ${(props) => props.theme.capitalLines.one};
    }

    &.capital_line2::before {
        background: ${(props) => props.theme.capitalLines.two};
    }

    &.capital_line3::before {
        background: ${(props) => props.theme.capitalLines.three};
    }

    &.capital_line4::before {
        background: ${(props) => props.theme.capitalLines.four};
    }

    &.capital_line5::before {
        background: ${(props) => props.theme.capitalLines.five};
    }

    &.capital_line6::before {
        background: ${(props) => props.theme.capitalLines.six};
    }

    &.capital_line7::before {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    &.capital_line8::before {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    &.capital_line9::before {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    &.capital_suin::before {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    &.capital_shinbundang::before {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    &.capital_gyeongui::before {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    &.capital_gyeongchun::before {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    &.capital_gyeonggang::before {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    &.capital_wooyi::before {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    &.capital_sillim::before {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    &.capital_gimpo::before {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    &.capital_ever::before {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    &.capital_seohae::before {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    &.capital_airport::before {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    &.capital_GTX_A::before {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    &.capital_uijeongbu::before {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    &.capital_incheon1::before {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    &.capital_incheon2::before {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    &.busan_line1::before {
        background: ${(props) => props.theme.busanLines.one};
    }

    &.busan_line2::before {
        background: ${(props) => props.theme.busanLines.two};
    }

    &.busan_line3::before {
        background: ${(props) => props.theme.busanLines.three};
    }

    &.busan_line4::before {
        background: ${(props) => props.theme.busanLines.four};
    }

    &.busan_donghae::before {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    &.busan_gimhae::before {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    &.daegu_line1::before {
        background: ${(props) => props.theme.daeguLines.one};
    }

    &.daegu_line2::before {
        background: ${(props) => props.theme.daeguLines.two};
    }

    &.daegu_line3::before {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    &.daejeon_line1::before {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    &.gwangju_line1::before {
        background: ${(props) => props.theme.gwangjuLines.one};
    }
`;

export const StationNameContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    padding: 7px;
    padding-right: 14px;
    border: 3px solid;
    border-radius: 25px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0 1px 6px rgba(12, 12, 13, 0.12),
        0 1px 6px rgba(12, 12, 13, 0.06);
    z-index: 10;

    /* capital */
    &.capital_line1 {
        border-color: ${(props) => props.theme.capitalLines.one};
    }

    &.capital_line2 {
        border-color: ${(props) => props.theme.capitalLines.two};
    }

    &.capital_line3 {
        border-color: ${(props) => props.theme.capitalLines.three};
    }

    &.capital_line4 {
        border-color: ${(props) => props.theme.capitalLines.four};
    }

    &.capital_line5 {
        border-color: ${(props) => props.theme.capitalLines.five};
    }

    &.capital_line6 {
        border-color: ${(props) => props.theme.capitalLines.six};
    }

    &.capital_line7 {
        border-color: ${(props) => props.theme.capitalLines.seven};
    }

    &.capital_line8 {
        border-color: ${(props) => props.theme.capitalLines.eight};
    }

    &.capital_line9 {
        border-color: ${(props) => props.theme.capitalLines.nine};
    }

    &.capital_suin {
        border-color: ${(props) => props.theme.capitalLines.suinBundang};
    }

    &.capital_shinbundang {
        border-color: ${(props) => props.theme.capitalLines.shinbundang};
    }

    &.capital_gyeongui {
        border-color: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    &.capital_gyeongchun {
        border-color: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    &.capital_gyeonggang {
        border-color: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    &.capital_wooyi {
        border-color: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    &.capital_sillim {
        border-color: ${(props) => props.theme.capitalLines.sillim};
    }

    &.capital_gimpo {
        border-color: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    &.capital_ever {
        border-color: ${(props) => props.theme.capitalLines.everline};
    }

    &.capital_seohae {
        border-color: ${(props) => props.theme.capitalLines.seohae};
    }

    &.capital_airport {
        border-color: ${(props) => props.theme.capitalLines.airport};
    }

    &.capital_GTX_A {
        border-color: ${(props) => props.theme.capitalLines.GTXA};
    }

    &.capital_uijeongbu {
        border-color: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    &.capital_incheon1 {
        border-color: ${(props) => props.theme.capitalLines.incheon1};
    }

    &.capital_incheon2 {
        border-color: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    &.busan_line1 {
        border-color: ${(props) => props.theme.busanLines.one};
    }

    &.busan_line2 {
        border-color: ${(props) => props.theme.busanLines.two};
    }

    &.busan_line3 {
        border-color: ${(props) => props.theme.busanLines.three};
    }

    &.busan_line4 {
        border-color: ${(props) => props.theme.busanLines.four};
    }

    &.busan_donghae {
        border-color: ${(props) => props.theme.busanLines.donghae};
    }

    &.busan_gimhae {
        border-color: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    &.daegu_line1 {
        border-color: ${(props) => props.theme.daeguLines.one};
    }

    &.daegu_line2 {
        border-color: ${(props) => props.theme.daeguLines.two};
    }

    &.daegu_line3 {
        border-color: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    &.daejeon_line1 {
        border-color: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    &.gwangju_line1 {
        border-color: ${(props) => props.theme.gwangjuLines.one};
    }

    .station_line {
        display: inline-block;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        padding: 0 7px;
        margin-right: 7px;
        border-radius: 24px;
        color: ${(props) => props.theme.colors.white};
        text-align: center;
        font-size: 1.2rem;
        font-weight: 600;
    }

    /* capital */
    .station_line.capital_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    .station_line.capital_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    .station_line.capital_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    .station_line.capital_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    .station_line.capital_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    .station_line.capital_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    .station_line.capital_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    .station_line.capital_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    .station_line.capital_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    .station_line.capital_suin {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    .station_line.capital_shinbundang {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    .station_line.capital_gyeongui {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    .station_line.capital_gyeongchun {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    .station_line.capital_gyeonggang {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    .station_line.capital_wooyi {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    .station_line.capital_sillim {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    .station_line.capital_gimpo {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    .station_line.capital_ever {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    .station_line.capital_seohae {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    .station_line.capital_airport {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    .station_line.capital_GTX_A {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    .station_line.capital_uijeongbu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    .station_line.capital_incheon1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    .station_line.capital_incheon2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    .station_line.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    .station_line.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    .station_line.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    .station_line.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    .station_line.busan_donghae {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    .station_line.busan_gimhae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    .station_line.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    .station_line.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    .station_line.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    .station_line.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    .station_line.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    .station_name {
        display: inline-block;
        font-size: 2rem;
    }
`;

export const DirectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 0 20px;
`;

export const DirectionButton = styled.button`
    display: inline-flex;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    border: 1px solid ${(props) => props.theme.colors.gray01};
    border-radius: 20px;
    background: transparent;
    color: ${(props) => props.theme.colors.gray01};
    font-size: 1.6rem;
    font-weight: 500;
    outline: none;
    cursor: pointer;

    &.selected {
        border: 1px solid ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.primary};
    }
`;

export const CongestionInfoContainer = styled.div`
    height: calc(100% - 130px);
    padding: 20px;
    overflow-y: auto;

    @media screen and (max-height: 910px) {
        padding-left: 20px;
        padding-right: 6px;
        padding-bottom: 50px;

        &::-webkit-scrollbar {
            width: 14px;
        }

        &::-webkit-scrollbar-thumb {
            height: 40px;
            border: 4px solid transparent;
            border-radius: 10px;
            background-color: #e7e7e7;
            background-clip: padding-box;
        }
    }
`;

export const CongestionContainer = styled.div`
    margin-bottom: 30px;

    .info_title_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .info_title {
        display: inline-block;
        font-size: 1.6rem;
        margin-right: 5px;
    }

    .info_detail {
        width: 16px;
        height: 16px;
        border: 1px solid ${(props) => props.theme.colors.gray01};
        border-radius: 100%;
        background: transparent;
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.2rem;
        font-weight: 500;
        outline: none;
        cursor: pointer;
    }

    .info_title_container .time_info {
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

export const DistanceContainer = styled.div`
    .info_title_container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .info_title {
        display: inline-block;
        font-size: 1.6rem;
        margin-right: 5px;
    }

    .info_detail {
        width: 16px;
        height: 16px;
        border: 1px solid ${(props) => props.theme.colors.gray01};
        border-radius: 100%;
        background: transparent;
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.2rem;
        font-weight: 500;
        outline: none;
        cursor: pointer;
    }

    /* distance */
    .distance_info {
        margin-left: 30px;
    }

    .train,
    .distance {
        display: flex;
        gap: 2px;
    }

    .distance {
        margin-top: 2px;
    }

    .train .car,
    .distance span {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        flex-basis: 30px;
        color: #fff;
        font-size: 1.5rem;
    }

    .train .car {
        height: 30px;
        border-radius: 4px;
        background: ${(props) => props.theme.colors.primary};
    }

    .train .car:first-child {
        border-radius: 20px 4px 4px 4px;
    }

    .distance span {
        height: 10px;
        border-radius: 2px;
    }

    .distance .safe {
        background: #34c759;
    }

    .distance .caution {
        background: #ffc500;
    }

    .distance .danger {
        background: #ff3b30;
    }

    .distance .nothing {
        background: #8e8e93;
    }

    /* convenience info */
    .convenience_info {
        margin-top: 15px;
    }

    .convenience_info div {
        display: flex;
    }

    .convenience_info div img,
    svg {
        width: 24px;
        height: 24px;
        color: #4f4f4f;
        fill: #4f4f4f;
    }

    .convenience_info div:not(:first-child) span {
        border-top: none;
    }

    .convenience_info span:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
    }

    .convenience_info .info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        flex-basis: 30px;
        min-height: 30px;
        padding: 5px 0;
        border: 1px solid ${(props) => props.theme.colors.gray05};
        border-right: none;
        border-collapse: collapse;
        text-align: center;
        font-size: 1.4rem;
        word-break: keep-all;
    }

    .convenience_info .info:last-child {
        border-right: 1px solid ${(props) => props.theme.colors.gray05};
    }

    /* distance step */
    .distance_step_container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }

    .distance_step_container .distance {
        margin-right: 8px;
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.4rem;
    }

    .distance_step {
        display: inline-block;
    }

    .distance_step li {
        display: inline-flex;
        align-items: center;
        height: 30px;
        padding: 0 10px;
        color: #fff;
        font-size: 1.3rem;
        font-weight: 600;
    }

    .distance_step .safe {
        background: #34c759;
    }

    .distance_step .caution {
        background: #ffc500;
    }

    .distance_step .danger {
        background: #ff3b30;
    }

    .distance_step .nothing {
        background: #8e8e93;
    }

    @media screen and (max-width: 500px) {
        .distance_step_container {
            margin-top: 30px;
        }
    }
`;
