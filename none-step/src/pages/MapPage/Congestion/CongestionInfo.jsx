/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
    CongestionInfoWrapper,
    CongestionInfoCloseBtn,
    StationNameWrapper,
    StationNameContainer,
    DirectionContainer,
    DirectionButton,
    CongestionInfoContainer,
    CongestionContainer,
    DistanceContainer,
} from "./CongestionInfo.styles";
import { IoClose } from "react-icons/io5";
import stairIcon from "../icons/stair-icon-gray.svg";
import { TbEscalator } from "react-icons/tb";
import { PiElevatorFill } from "react-icons/pi";
import { FaWheelchair } from "react-icons/fa";
import CongestionDetailInfo from "./CongestionDetailInfo";
import CongestionTime from "./CongestionTime";
import DistanceDetailInfo from "./DistanceDetailInfo";

const CongestionInfo = ({
    stationInfo,
    upCongestion,
    downCongestion,
    upDistanceInfo,
    downDistanceInfo,
    handleClose,
}) => {
    const [stationLine, setStationLine] = useState("");
    const [lineColor, setLineColor] = useState("");
    const [direction, setDirection] = useState("up");
    const [isCongestionInfoOpen, setIsCongestionInfoOpen] = useState(false);
    const [isDistanceInfoOpen, setIsDistanceInfoOpen] = useState(false);

    useEffect(() => {
        switch (stationInfo.line) {
            case "1호선":
                setStationLine("1");
                break;
            case "2호선":
                setStationLine("2");
                break;
            case "3호선":
                setStationLine("3");
                break;
            case "4호선":
                setStationLine("4");
                break;
            case "5호선":
                setStationLine("5");
                break;
            case "6호선":
                setStationLine("6");
                break;
            case "7호선":
                setStationLine("7");
                break;
            case "8호선":
                setStationLine("8");
                break;
            case "9호선":
                setStationLine("9");
                break;
            case "수인분당선":
                setStationLine("수인분당");
                break;
            case "신분당선":
                setStationLine("신분당");
                break;
            case "경의중앙선":
                setStationLine("경의중앙");
                break;
            case "경춘선":
                setStationLine("경춘");
                break;
            case "경강선":
                setStationLine("경강");
                break;
            case "우의신설선":
                setStationLine("우의신설");
                break;
            case "신림선":
                setStationLine("신림");
                break;
            case "김포골드라인":
                setStationLine("김포골드");
                break;
            case "에버라인":
                setStationLine("에버라인");
                break;
            case "서해선":
                setStationLine("서해");
                break;
            case "공항철도":
                setStationLine("공항");
                break;
            case "GTX-A":
                setStationLine("GTX-A");
                break;
            case "의정부경전철":
                setStationLine("의정부");
                break;
            case "인천1호선":
                setStationLine("인천1");
                break;
            case "인천2호선":
                setStationLine("인천2");
                break;
            case "동해선":
                setStationLine("동해");
                break;
            case "부산김해경전철":
                setStationLine("부산김해");
                break;
        }
    }, [stationInfo]);

    useEffect(() => {
        if (stationInfo.region === "수도권") {
            switch (stationInfo.line) {
                case "1호선":
                    setLineColor("capital_line1");
                    break;
                case "2호선":
                    setLineColor("capital_line2");
                    break;
                case "3호선":
                    setLineColor("capital_line3");
                    break;
                case "4호선":
                    setLineColor("capital_line4");
                    break;
                case "5호선":
                    setLineColor("capital_line5");
                    break;
                case "6호선":
                    setLineColor("capital_line6");
                    break;
                case "7호선":
                    setLineColor("capital_line7");
                    break;
                case "8호선":
                    setLineColor("capital_line8");
                    break;
                case "9호선":
                    setLineColor("capital_line9");
                    break;
                case "수인분당선":
                    setLineColor("capital_suin");
                    break;
                case "신분당선":
                    setLineColor("capital_shinbundang");
                    break;
                case "경의중앙선":
                    setLineColor("capital_gyeongui");
                    break;
                case "경춘선":
                    setLineColor("capital_gyeongchun");
                    break;
                case "경강선":
                    setLineColor("capital_gyeonggang");
                    break;
                case "우의신설선":
                    setLineColor("capital_wooyi");
                    break;
                case "신림선":
                    setLineColor("capital_sillim");
                    break;
                case "김포골드라인":
                    setLineColor("capital_gimpo");
                    break;
                case "에버라인":
                    setLineColor("capital_ever");
                    break;
                case "서해선":
                    setLineColor("capital_seohae");
                    break;
                case "공항철도":
                    setLineColor("capital_airport");
                    break;
                case "GTX-A":
                    setLineColor("capital_GTX_A");
                    break;
                case "의정부경전철":
                    setLineColor("capital_uijeongbu");
                    break;
                case "인천1호선":
                    setLineColor("capital_incheon1");
                    break;
                case "인천2호선":
                    setLineColor("capital_incheon2");
                    break;
            }
        } else if (stationInfo.region === "부산") {
            switch (stationInfo.line) {
                case "1호선":
                    setLineColor("busan_line1");
                    break;
                case "2호선":
                    setLineColor("busan_line2");
                    break;
                case "3호선":
                    setLineColor("busan_line3");
                    break;
                case "4호선":
                    setLineColor("busan_line4");
                    break;
                case "동해선":
                    setLineColor("busan_donghae");
                    break;
                case "부산김해경전철":
                    setLineColor("busan_gimhae");
                    break;
            }
        } else if (stationInfo.region === "대구") {
            switch (stationInfo.line) {
                case "1호선":
                    setLineColor("daegu_line1");
                    break;
                case "2호선":
                    setLineColor("daegu_line2");
                    break;
                case "3호선":
                    setLineColor("daegu_line3");
                    break;
            }
        } else if (stationInfo.region === "대전") {
            setLineColor("daejeon_line1");
        } else if (stationInfo.region === "광주") {
            setLineColor("gwangju_line1");
        }
    }, [stationInfo.line, stationInfo.region]);

    const stationName = (station) => {
        return station.replace(",", "·");
    };

    const handleClickDirection = (currentDirection) => {
        setDirection(currentDirection);
    };

    const handleClickCongestionInfo = () => {
        setIsCongestionInfoOpen(true);
    };

    const handleClickDistanceInfo = () => {
        setIsDistanceInfoOpen(true);
    };

    const congestion = (congest) => {
        switch (congest) {
            case "여유":
                return "uncrowded";

            case "보통":
                return "normal";

            case "주의":
                return "caution";

            case "혼잡":
                return "congested";
            default:
                return "nothing";
        }
    };

    const separationDistance = (distance) => {
        switch (distance) {
            case "안전":
                return "safe";
            case "주의":
                return "caution";
            case "위험":
                return "danger";
            default:
                return "nothing";
        }
    };

    return (
        <>
            <CongestionInfoWrapper>
                {!isCongestionInfoOpen && !isDistanceInfoOpen && (
                    <CongestionInfoCloseBtn onClick={handleClose}>
                        <IoClose />
                    </CongestionInfoCloseBtn>
                )}
                <StationNameWrapper className={lineColor}>
                    <StationNameContainer className={lineColor}>
                        <div className={`station_line ${lineColor}`}>
                            <span>{stationLine}</span>
                        </div>
                        <h2 className="station_name">
                            {stationName(stationInfo.station)}
                        </h2>
                    </StationNameContainer>
                </StationNameWrapper>
                <DirectionContainer>
                    <DirectionButton
                        className={direction === "up" ? "selected" : ""}
                        onClick={() => handleClickDirection("up")}
                    >
                        {upCongestion.nextStation === ""
                            ? `${stationName(stationInfo.station)} 방향(종점)`
                            : upCongestion.nextStation}
                    </DirectionButton>
                    <DirectionButton
                        className={direction === "down" ? "selected" : ""}
                        onClick={() => handleClickDirection("down")}
                    >
                        {downCongestion.nextStation === ""
                            ? `${stationName(stationInfo.station)} 방향(종점)`
                            : downCongestion.nextStation}
                    </DirectionButton>
                </DirectionContainer>
                <CongestionInfoContainer>
                    <CongestionContainer>
                        <div className="info_title_container">
                            <div>
                                <h3 className="info_title">지하철혼잡도</h3>
                                <button
                                    className="info_detail"
                                    onClick={handleClickCongestionInfo}
                                >
                                    <span>i</span>
                                </button>
                            </div>
                            <span className="time_info">
                                시간표 시간 기준 예상 혼잡도 입니다.
                            </span>
                        </div>
                        {direction === "up" && (
                            <CongestionTime
                                currentTime={upCongestion.currentTime}
                                after30={upCongestion.after30}
                                after60={upCongestion.after60}
                            />
                        )}
                        {direction === "down" && (
                            <CongestionTime
                                currentTime={downCongestion.currentTime}
                                after30={downCongestion.after30}
                                after60={downCongestion.after60}
                            />
                        )}
                    </CongestionContainer>
                    <DistanceContainer>
                        <div className="info_title_container">
                            <h3 className="info_title">이격거리 및 편의정보</h3>
                            <button
                                className="info_detail"
                                onClick={handleClickDistanceInfo}
                            >
                                <span>i</span>
                            </button>
                        </div>
                        <div className="distance_info_container">
                            <div className="distance_info">
                                {direction === "up" && (
                                    <>
                                        <div className="train">
                                            {upDistanceInfo.map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={
                                                        `car ` +
                                                        congestion(
                                                            upCongestion.currentTime
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="distance">
                                            {upDistanceInfo.map(
                                                (info, index) => (
                                                    <span
                                                        key={index}
                                                        className={separationDistance(
                                                            info.state
                                                        )}
                                                    ></span>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                                {direction === "down" && (
                                    <>
                                        <div className="train">
                                            {downDistanceInfo.map(
                                                (_, index) => (
                                                    <span
                                                        key={index}
                                                        className={
                                                            `car ` +
                                                            congestion(
                                                                downCongestion.currentTime
                                                            )
                                                        }
                                                    >
                                                        {index + 1}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <div className="distance">
                                            {downDistanceInfo.map(
                                                (info, index) => (
                                                    <span
                                                        key={index}
                                                        className={separationDistance(
                                                            info.state
                                                        )}
                                                    ></span>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="convenience_info">
                                <div className="stair_info">
                                    <span>
                                        <img src={stairIcon} alt="stair-icon" />
                                    </span>
                                    {direction === "up" &&
                                        upDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.stair}
                                            </span>
                                        ))}
                                    {direction === "down" &&
                                        downDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.stair}
                                            </span>
                                        ))}
                                </div>
                                <div className="elevator_info">
                                    <span>
                                        <PiElevatorFill />
                                    </span>
                                    {direction === "up" &&
                                        upDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.elevator}
                                            </span>
                                        ))}
                                    {direction === "down" &&
                                        downDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.elevator}
                                            </span>
                                        ))}
                                </div>
                                <div className="escalator_info">
                                    <span>
                                        <TbEscalator />
                                    </span>
                                    {direction === "up" &&
                                        upDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.escal}
                                            </span>
                                        ))}
                                    {direction === "down" &&
                                        downDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.escal}
                                            </span>
                                        ))}
                                </div>
                                <div className="safe_distance_info">
                                    <span>
                                        <FaWheelchair />
                                    </span>
                                    {direction === "up" &&
                                        upDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.best}
                                            </span>
                                        ))}
                                    {direction === "down" &&
                                        downDistanceInfo.map((info, index) => (
                                            <span key={index} className="info">
                                                {info.best}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="distance_step_container">
                            <span className="distance">이격거리</span>
                            <ul className="distance_step">
                                <li className="safe">
                                    <span>안전</span>
                                </li>
                                <li className="caution">
                                    <span>주의</span>
                                </li>
                                <li className="danger">
                                    <span>위험</span>
                                </li>
                                <li className="nothing">
                                    <span>정보없음</span>
                                </li>
                            </ul>
                        </div>
                    </DistanceContainer>
                </CongestionInfoContainer>
            </CongestionInfoWrapper>
            {isCongestionInfoOpen && (
                <CongestionDetailInfo
                    handleCloseInfo={() => setIsCongestionInfoOpen(false)}
                />
            )}
            {isDistanceInfoOpen && (
                <DistanceDetailInfo
                    handleCloseInfo={() => setIsDistanceInfoOpen(false)}
                />
            )}
        </>
    );
};

export default CongestionInfo;
