import styled from "styled-components";

export const StationInfoWrapper = styled.div`
    position: absolute;
    top: 107px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: calc(100vh - 287px);
    padding: 30px 20px 10px;
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
        height: 100%;
        border: none;
        border-radius: 0;
    }
`;

export const StationInfoCloseBtn = styled.button`
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

export const StationScheduleWrapper = styled.div`
    margin-bottom: 30px;
`;

export const StationScheduleBtnContainer = styled.div`
    button {
        width: 33.333%;
        height: 36px;
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray05};
        background: ${(props) => props.theme.colors.white};
        color: ${(props) => props.theme.colors.gray02};
        font-size: 1.4rem;
        font-weight: 600;
        outline: none;
        cursor: pointer;
    }

    button.selected {
        border-bottom: 1px solid ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.primary};
    }
`;

export const StationScheduleContainer = styled.div`
    margin-top: 10px;
    color: #4f4f4f;

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1.6rem;
    }

    th,
    td {
        width: 50%;
        height: 40px;
        border: 1px solid ${(props) => props.theme.colors.gray06};
    }

    th {
        background: #f8fafa;
        font-weight: 600;
    }

    th svg {
        width: 18px;
        height: 18px;
        margin-right: 3px;
        vertical-align: bottom;
    }

    th svg.sun_icon {
        color: #ffc421;
    }

    th svg.moon_icon {
        color: #8ec8ff;
    }

    td {
        text-align: center;
    }
`;

export const StationInfoContainer = styled.div`
    height: calc(100% - 280px);
    overflow-y: auto;

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
`;

export const StationContainer = styled.div`
    .transfer_station {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .transfer_station h2 {
        display: inline-block;
        margin-bottom: 0;
    }

    .transfer_station_line {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
        padding: 0 5px;
        margin-left: 8px;
        border-radius: 10px;
        color: #fff;
        font-size: 1.2rem;
    }

    /* capital */
    .transfer_station_line.capital_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    .transfer_station_line.capital_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    .transfer_station_line.capital_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    .transfer_station_line.capital_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    .transfer_station_line.capital_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    .transfer_station_line.capital_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    .transfer_station_line.capital_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    .transfer_station_line.capital_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    .transfer_station_line.capital_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    .transfer_station_line.capital_suin {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    .transfer_station_line.capital_shinbundang {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    .transfer_station_line.capital_gyeongui {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    .transfer_station_line.capital_gyeongchun {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    .transfer_station_line.capital_gyeonggang {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    .transfer_station_line.capital_wooyi {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    .transfer_station_line.capital_sillim {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    .transfer_station_line.capital_gimpo {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    .transfer_station_line.capital_ever {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    .transfer_station_line.capital_seohae {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    .transfer_station_line.capital_airport {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    .transfer_station_line.capital_GTX_A {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    .transfer_station_line.capital_uijeongbu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    .transfer_station_line.capital_incheon1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    .transfer_station_line.capital_incheon2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    .transfer_station_line.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    .transfer_station_line.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    .transfer_station_line.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    .transfer_station_line.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    .transfer_station_line.busan_donghae {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    .transfer_station_line.busan_gimhae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    .transfer_station_line.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    .transfer_station_line.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    .transfer_station_line.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    .transfer_station_line.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    .transfer_station_line.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    .info_title {
        font-size: 1.6rem;
        margin-bottom: 20px;
    }

    .info:not(:last-child) {
        margin-bottom: 15px;
    }

    .info span,
    p {
        font-size: 1.5rem;
        color: #4f4f4f;
    }

    .info > span:nth-child(2) {
        font-weight: 400;
        color: #8f8f8f;
    }

    .info span svg,
    img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        color: #9ca3af;
        vertical-align: top;
    }

    .detail_info {
        margin-top: 7px;
        margin-left: 23px;
    }

    .station_address {
        margin-top: 0;
        margin-left: 7px;
        display: inline-block;
    }

    .elevators_info span,
    .escalator_info span {
        line-height: 1.5;
        display: inline-block;
    }

    .detail_info > span:not(:last-child) {
        margin-right: 10px;
    }

    .detail_info p {
        line-height: 1.5;
    }

    .lift_info p > span:first-child {
        margin-right: 7px;
    }
`;
