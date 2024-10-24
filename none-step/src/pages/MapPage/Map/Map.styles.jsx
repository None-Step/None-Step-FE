import styled from "styled-components";

export const MapWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: calc(100vh - 142px);
    margin-top: 70px;
    margin-bottom: 72px;
`;

export const SearchWrapper = styled.div`
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 100%;
    z-index: 10;
`;

export const SearchInputContainer = styled.div`
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 15px;
        height: 15px;
        color: ${(props) => props.theme.colors.gray01};
    }
`;

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px 0 30px;
    border: none;
    border-radius: 4px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    font-size: 1.4rem;
    outline: none;
`;

export const SearchInput = (props) => {
    return <StyledInput {...props} />;
};

export const CategoryWrapper = styled.div`
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 10;
`;

export const CategoryContainer = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 7px;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: mandatory;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    li:first-child {
        margin-left: 5%;
    }

    li:last-child {
        margin-right: 5%;
    }
`;

export const CategoryBtn = styled.button`
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
        background: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.white};
    }

    svg,
    img {
        width: 16px;
        height: 16px;
    }

    span {
        margin-left: 5px;
    }
`;

export const OverlayContainer = styled.div`
    max-width: 370px;
    padding: 5px 10px 5px 7px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    color: #333;

    span {
        font-size: 1.5rem;
    }

    & > p {
        line-height: 2rem;
    }

    p > span:first-child {
        margin-right: 5px;
        vertical-align: middle;
        color: #9ca3af;
    }

    p > span:nth-child(2) {
        color: #4f4f4f;
    }

    p span svg {
        width: 16px;
        height: 16px;
        color: #9ca3af;
    }

    .lift_comment {
        display: block;
        margin-left: 66px;
        margin-bottom: 7px;
    }

    .center_overlay a {
        font-size: 1.5rem;
        color: ${(props) => props.theme.colors.primary};
        text-decoration: underline;
    }
`;

export const OverlayCongestion = styled.div`
    padding: 15px;
    border: 1px solid ${(props) => props.theme.colors.gray05};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    color: #333;
    font-size: 1.6rem;

    .station_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .station_info .station {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    .station_info .station .line {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
        margin-right: 5px;
        padding: 0 6px;
        border-radius: 10px;
        color: #fff;
        font-size: 1.2rem;
    }

    /* capital */
    .station_info .station .capital_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    .station_info .station .capital_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    .station_info .station .capital_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    .station_info .station .capital_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    .station_info .station .capital_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    .station_info .station .capital_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    .station_info .station .capital_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    .station_info .station .capital_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    .station_info .station .capital_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    .station_info .station .capital_suin {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    .station_info .station .capital_shinbundang {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    .station_info .station .capital_gyeongui {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    .station_info .station .capital_gyeongchun {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    .station_info .station .capital_gyeonggang {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    .station_info .station .capital_wooyi {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    .station_info .station .capital_sillim {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    .station_info .station .capital_gimpo {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    .station_info .station .capital_ever {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    .station_info .station .capital_seohae {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    .station_info .station .capital_airport {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    .station_info .station .capital_GTX_A {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    .station_info .station .capital_uijeongbu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    .station_info .station .capital_incheon1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    .station_info .station .capital_incheon2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    .station_info .station .busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    .station_info .station .busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    .station_info .station .busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    .station_info .station .busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    .station_info .station .busan_donghae {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    .station_info .station .busan_gimhae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    .station_info .station .daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    .station_info .station .daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    .station_info .station .daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    .station_info .station .daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    .station_info .station .gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    .station_info .station .station_name {
        font-weight: 600;
    }

    .station_info .more_info {
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.4rem;
        cursor: pointer;
    }

    .congestion_info div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .congestion_info .up_congestion {
        margin-bottom: 10px;
    }

    .congestion_info div .direction {
        margin-right: 20px;
        font-weight: 500;
    }

    .congestion_info div .congestion {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        padding: 0 8px;
        border-radius: 12px;
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
    }

    .congestion_info .congestion.uncrowded {
        background: #007aff;
    }

    .congestion_info .congestion.normal {
        background: #34c759;
    }

    .congestion_info .congestion.caution {
        background: #ffc500;
    }

    .congestion_info .congestion.congested {
        background: #ff3b30;
    }

    .congestion_info .congestion.nothing {
        background: #8e8e93;
    }
`;

export const ZoomControlWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    z-index: 10;
`;

export const ZoomControlContainer = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin: 0 10px;
`;

export const ZoomControlBtnContainer = styled.div`
    position: fixed;
    bottom: 155px;
    width: 36px;
    margin-right: 2px;
    box-shadow: ${(props) => props.theme.colors.shadow200};
`;

export const ZoomControlBtn = styled.button`
    width: 100%;
    height: 36px;
    border: none;
    background: ${(props) => props.theme.colors.white};
    color: #333;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:first-child {
        height: 37px;
        border-radius: 3px 3px 0 0;
        border-bottom: 1px solid #e2e2e2;
    }

    &:last-child {
        border-radius: 0 0 3px 3px;
    }

    &:active {
        background: ${(props) => props.theme.colors.secondary};
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;

export const LocationBtn = styled.button`
    position: fixed;
    bottom: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:active {
        background: ${(props) => props.theme.colors.gray06};
    }

    img {
        width: 20px;
        height: 20px;
        color: ${(props) => props.theme.colors.primary};
    }
`;

export const ToastContainer = styled.div`
    position: fixed;
    bottom: 200px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    transition: opacity 0.2s ease;
    z-index: 999;

    &.opacity {
        opacity: 0;
    }

    p {
        position: absolute;
        top: 0;
        line-height: 2.1rem;
        padding: 12px 18px;
        border-radius: 25px;
        background: rgba(34, 34, 34, 0.9);
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        word-break: keep-all;
    }
`;
