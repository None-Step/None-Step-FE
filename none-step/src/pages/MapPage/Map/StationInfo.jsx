/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
    BookmarkContainer,
    StationContainer,
    StationInfoCloseBtn,
    StationInfoContainer,
    StationInfoWrapper,
    StationNameContainer,
    StationNameWrapper,
    StationScheduleBtnContainer,
    StationScheduleContainer,
    StationScheduleWrapper,
    ToastContainer,
} from "./StationInfo.styles";
import difToiletIcon from "../icons/dif-toilet-icon-gray.svg";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaRestroom, FaWheelchair } from "react-icons/fa";
import { FaWonSign, FaHeartPulse } from "react-icons/fa6";
import { IoClose, IoTime, IoMoon } from "react-icons/io5";
import { LuBaby } from "react-icons/lu";
import { MdSunny } from "react-icons/md";
import { PiElevatorFill } from "react-icons/pi";
import { RiBattery2ChargeFill, RiCustomerService2Fill } from "react-icons/ri";
import { TbEscalator } from "react-icons/tb";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import axiosInstance from "@apis/axiosInstance";

const StationInfo = ({
    stationInfo,
    stationUpTime,
    stationDownTime,
    climateCard,
    handleClose,
}) => {
    const toastRef = useRef(null);

    const [stationLine, setStationLine] = useState("");
    const [transferLine, setTransferLine] = useState([]);
    const [lineColor, setLineColor] = useState("");
    const [transferLineColor, setTransferLineColor] = useState([]);
    const [selectedDay, setselectedDay] = useState("weekday");
    const [bookmarkList, setBookmarkList] = useState([]);
    const [isBookmark, setIsBookmark] = useState(false);

    const info = stationInfo;
    const elevators = stationInfo.elevator;
    const escalators = stationInfo.escal;
    const lifts = stationInfo.lift;
    const toilets = stationInfo.toilet;
    const difToilets = stationInfo.difToilet;
    const nursingRooms = stationInfo.nursingRoom;
    const atms = stationInfo.atm;
    const aeds = stationInfo.aed;
    const chargers = stationInfo.charger;
    const centers = stationInfo.center;

    const access = sessionStorage.getItem("accessToken");

    useEffect(() => {
        if (access) {
            axiosInstance
                .get("/nonestep/book-mark/subway-list", {
                    headers: {
                        Authorization: `${access}`,
                    },
                })
                .then((response) => {
                    setBookmarkList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [access]);

    useEffect(() => {
        setIsBookmark(
            bookmarkList.some((bookmark) => {
                return (
                    info.infoRegion === bookmark.region &&
                    info.infoLine === bookmark.line &&
                    info.infoStation === bookmark.station
                );
            })
        );
    }, [bookmarkList]);

    useEffect(() => {
        switch (stationInfo.infoLine) {
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
        let transfers;

        if (stationInfo.infoTransfer.includes(",")) {
            stationInfo.infoTransfer = stationInfo.infoTransfer.replace(
                " ",
                ""
            );
            transfers = stationInfo.infoTransfer.split(",");
        } else {
            transfers = [stationInfo.infoTransfer];
        }

        setTransferLine([]);

        transfers.forEach((transfer) => {
            setTransferLine((prev) => {
                if (!prev.includes(transfer)) {
                    switch (transfer) {
                        case "1호선":
                            return [...prev, "1"];
                        case "2호선":
                            return [...prev, "2"];
                        case "3호선":
                            return [...prev, "3"];
                        case "4호선":
                            return [...prev, "4"];
                        case "5호선":
                            return [...prev, "5"];
                        case "6호선":
                            return [...prev, "6"];
                        case "7호선":
                            return [...prev, "7"];
                        case "8호선":
                            return [...prev, "8"];
                        case "9호선":
                            return [...prev, "9"];
                        case "수인분당선":
                            return [...prev, "수인분당"];
                        case "신분당선":
                            return [...prev, "신분당"];
                        case "경의중앙선":
                            return [...prev, "경의중앙"];
                        case "경춘선":
                            return [...prev, "경춘"];
                        case "경강선":
                            return [...prev, "경강"];
                        case "우의신설선":
                            return [...prev, "우의신설"];
                        case "신림선":
                            return [...prev, "신림"];
                        case "김포골드라인":
                            return [...prev, "김포골드"];
                        case "에버라인":
                            return [...prev, "에버라인"];
                        case "서해선":
                            return [...prev, "서해"];
                        case "공항철도":
                            return [...prev, "공항"];
                        case "GTX-A":
                            return [...prev, "GTX-A"];
                        case "의정부경전철":
                            return [...prev, "의정부"];
                        case "인천1호선":
                            return [...prev, "인천1"];
                        case "인천2호선":
                            return [...prev, "인천2"];
                        case "동해선":
                            return [...prev, "동해"];
                        case "부산김해경전철":
                            return [...prev, "부산김해"];
                        default:
                            return prev;
                    }
                }
                return prev;
            });
        });
    }, [stationInfo]);

    useEffect(() => {
        if (stationInfo.infoRegion === "수도권") {
            switch (stationInfo.infoLine) {
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
        } else if (stationInfo.infoRegion === "부산") {
            switch (stationInfo.infoLine) {
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
        } else if (stationInfo.infoRegion === "대구") {
            switch (stationInfo.infoLine) {
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
        } else if (stationInfo.infoRegion === "대전") {
            setLineColor("daejeon_line1");
        } else if (stationInfo.infoRegion === "광주") {
            setLineColor("gwangju_line1");
        }
    }, [stationInfo.infoLine, stationInfo.infoRegion]);

    useEffect(() => {
        let transfers;

        if (stationInfo.infoTransfer.includes(",")) {
            stationInfo.infoTransfer = stationInfo.infoTransfer.replace(
                " ",
                ""
            );
            transfers = stationInfo.infoTransfer.split(",");
        } else {
            transfers = [stationInfo.infoTransfer];
        }

        setTransferLineColor([]);

        transfers.forEach((transfer) => {
            setTransferLineColor((prev) => {
                if (!prev.includes(transfer)) {
                    if (stationInfo.infoRegion === "수도권") {
                        switch (transfer) {
                            case "1호선":
                                return [...prev, "capital_line1"];
                            case "2호선":
                                return [...prev, "capital_line2"];
                            case "3호선":
                                return [...prev, "capital_line3"];
                            case "4호선":
                                return [...prev, "capital_line4"];
                            case "5호선":
                                return [...prev, "capital_line5"];
                            case "6호선":
                                return [...prev, "capital_line6"];
                            case "7호선":
                                return [...prev, "capital_line7"];
                            case "8호선":
                                return [...prev, "capital_line8"];
                            case "9호선":
                                return [...prev, "capital_line9"];
                            case "수인분당선":
                                return [...prev, "capital_suin"];
                            case "신분당선":
                                return [...prev, "capital_shinbundang"];
                            case "경의중앙선":
                                return [...prev, "capital_gyeongui"];
                            case "경춘선":
                                return [...prev, "capital_gyeongchun"];
                            case "경강선":
                                return [...prev, "capital_gyeonggang"];
                            case "우의신설선":
                                return [...prev, "capital_wooyi"];
                            case "신림선":
                                return [...prev, "capital_sillim"];
                            case "김포골드라인":
                                return [...prev, "capital_gimpo"];
                            case "에버라인":
                                return [...prev, "capital_ever"];
                            case "서해선":
                                return [...prev, "capital_seohae"];
                            case "공항철도":
                                return [...prev, "capital_airport"];
                            case "GTX-A":
                                return [...prev, "capital_GTX_A"];
                            case "의정부경전철":
                                return [...prev, "capital_uijeongbu"];
                            case "인천1호선":
                                return [...prev, "capital_incheon1"];
                            case "인천2호선":
                                return [...prev, "capital_incheon2"];
                        }
                    } else if (stationInfo.infoRegion === "부산") {
                        switch (transfer) {
                            case "1호선":
                                return [...prev, "busan_line1"];
                            case "2호선":
                                return [...prev, "busan_line2"];
                            case "3호선":
                                return [...prev, "busan_line3"];
                            case "4호선":
                                return [...prev, "busan_line4"];
                            case "동해선":
                                return [...prev, "busan_donghae"];
                            case "부산김해경전철":
                                return [...prev, "busan_gimhae"];
                        }
                    } else if (stationInfo.infoRegion === "대구") {
                        switch (transfer) {
                            case "1호선":
                                return [...prev, "daegu_line1"];
                            case "2호선":
                                return [...prev, "daegu_line2"];
                            case "3호선":
                                return [...prev, "daegu_line3"];
                        }
                    } else if (stationInfo.infoRegion === "대전") {
                        return [...prev, "daejeon_line1"];
                    } else if (stationInfo.infoRegion === "광주") {
                        return [...prev, "gwangju_line1"];
                    }
                }
                return prev;
            });
        });
    }, [stationInfo.infoRegion, stationInfo.infoTransfer]);

    const handleClickBookmark = () => {
        if (access && !isBookmark) {
            axiosInstance
                .post(
                    "/nonestep/book-mark/subway-register",
                    {
                        region: info.infoRegion,
                        line: info.infoLine,
                        station: info.infoStation,
                    },
                    {
                        headers: {
                            Authorization: `${access}`,
                        },
                    }
                )
                .then((response) => {
                    setIsBookmark(true);
                })
                .catch((error) => {
                    toastPop();
                });
        } else if (access && isBookmark) {
            axiosInstance
                .delete(
                    `/nonestep/book-mark/subway-delete?region=${info.infoRegion}&line=${info.infoLine}&station=${info.infoStation}`
                )
                .then((response) => {
                    setIsBookmark(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (!access) {
            alert("로그인 후 이용 가능합니다.");
        }
    };

    const toastPop = () => {
        if (toastRef.current) {
            toastRef.current.classList.remove("opacity");

            setTimeout(() => {
                toastRef.current.classList.add("opacity");
            }, 2000);
        }
    };

    const handleClickWeekday = () => {
        setselectedDay("weekday");
    };

    const handleClickWeekend = () => {
        setselectedDay("weekend");
    };

    const handleClickHoliday = () => {
        setselectedDay("holiday");
    };

    const scheduleDirection = (schedule) => {
        if (schedule.length === 2) {
            return (
                schedule[0].direction.replace(" 방향", "/") +
                schedule[1].direction
            );
        } else {
            return schedule[0].direction;
        }
    };

    const scheduleTime = (schedule) => {
        const scheduleData = schedule.split(" ");

        return scheduleData[0];
    };

    const scheduleExpress = (schedule) => {
        const scheduleData = schedule.split(" ");

        return scheduleData[1];
    };

    const scheduleStation = (schedule) => {
        const scheduleData = schedule.split(" ");

        if (scheduleData.length === 2) {
            return scheduleData[1].replace(">", " > ");
        } else {
            return scheduleData[2].replace(">", " > ");
        }
    };

    return (
        <StationInfoWrapper>
            {isBookmark ? (
                <BookmarkContainer
                    className="selected"
                    onClick={handleClickBookmark}
                >
                    <IoIosStar />
                    <span>즐겨찾기</span>
                </BookmarkContainer>
            ) : (
                <BookmarkContainer onClick={handleClickBookmark}>
                    <IoIosStarOutline />
                    <span>즐겨찾기</span>
                </BookmarkContainer>
            )}
            <StationInfoCloseBtn onClick={handleClose}>
                <IoClose />
            </StationInfoCloseBtn>
            <StationNameWrapper className={lineColor}>
                <StationNameContainer className={lineColor}>
                    <div className={`station_line ${lineColor}`}>
                        <span>{stationLine}</span>
                    </div>
                    <h2 className="station_name">{info.infoStation}</h2>
                </StationNameContainer>
            </StationNameWrapper>
            <StationInfoContainer>
                <StationScheduleWrapper>
                    <StationScheduleBtnContainer>
                        <button
                            className={
                                "weekday " +
                                (selectedDay === "weekday" ? "selected" : "")
                            }
                            onClick={handleClickWeekday}
                        >
                            평일
                        </button>
                        <button
                            className={
                                "weekend " +
                                (selectedDay === "weekend" ? "selected" : "")
                            }
                            onClick={handleClickWeekend}
                        >
                            토요일
                        </button>
                        <button
                            className={
                                "holiday " +
                                (selectedDay === "holiday" ? "selected" : "")
                            }
                            onClick={handleClickHoliday}
                        >
                            공휴일
                        </button>
                    </StationScheduleBtnContainer>
                    <StationScheduleContainer>
                        <table className="station_schedule">
                            <thead>
                                <tr>
                                    <th>
                                        <span>
                                            {scheduleDirection(stationUpTime)}
                                        </span>
                                    </th>
                                    <th>
                                        <span>
                                            {scheduleDirection(stationDownTime)}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedDay === "weekday" && (
                                    <>
                                        <tr>
                                            <th colSpan={2}>
                                                <MdSunny className="sun_icon" />
                                                <span>첫차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].weekdayStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].weekdayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .weekdayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].weekdayStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].weekdayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .weekdayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].weekdayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .weekdayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].weekdayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .weekdayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .weekdayStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>
                                                <IoMoon className="moon_icon" />
                                                <span>막차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].weekdayEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].weekdayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .weekdayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].weekdayEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].weekdayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .weekdayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].weekdayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .weekdayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].weekdayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .weekdayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .weekdayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    </>
                                )}
                                {selectedDay === "weekend" && (
                                    <>
                                        <tr>
                                            <th colSpan={2}>
                                                <MdSunny className="sun_icon" />
                                                <span>첫차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].satStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .satStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].satStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .satStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .satStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].satStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .satStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].satStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .satStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .satStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .satStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].satStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .satStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .satStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .satStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].satStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .satStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .satStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>
                                                <IoMoon className="moon_icon" />
                                                <span>막차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].satEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].satEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .satEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].satEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].satEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .satEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].satEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .satEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].satEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .satEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .satEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    </>
                                )}
                                {selectedDay === "holiday" && (
                                    <>
                                        <tr>
                                            <th colSpan={2}>
                                                <MdSunny className="sun_icon" />
                                                <span>첫차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].holidayStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].holidayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .holidayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].holidayStart ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].holidayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .holidayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].holidayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .holidayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].holidayStart.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .holidayStart
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .holidayStart
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <th colSpan={2}>
                                                <IoMoon className="moon_icon" />
                                                <span>막차</span>
                                            </th>
                                        </tr>
                                        <tr className="timeline">
                                            {stationUpTime[0].holidayEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[0]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[0].holidayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[0]
                                                                    .holidayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[0]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                            {stationDownTime[0].holidayEnd ? (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[0]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[0].holidayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[0]
                                                                    .holidayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[0]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="no_train">
                                                    <span>
                                                        열차가 없습니다.
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="timeline">
                                            {1 < stationDownTime.length &&
                                                stationUpTime.length === 1 && (
                                                    <td></td>
                                                )}
                                            {1 < stationUpTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationUpTime[1]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                    {stationUpTime[1].holidayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationUpTime[1]
                                                                    .holidayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationUpTime[1]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                            {1 < stationUpTime.length &&
                                                stationDownTime.length ===
                                                    1 && <td></td>}
                                            {1 < stationDownTime.length && (
                                                <td>
                                                    <span className="time">
                                                        {scheduleTime(
                                                            stationDownTime[1]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                    {stationDownTime[1].holidayEnd.split(
                                                        " "
                                                    ).length === 3 && (
                                                        <span className="express">
                                                            {scheduleExpress(
                                                                stationDownTime[1]
                                                                    .holidayEnd
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="station">
                                                        {scheduleStation(
                                                            stationDownTime[1]
                                                                .holidayEnd
                                                        )}
                                                    </span>
                                                </td>
                                            )}
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </StationScheduleContainer>
                </StationScheduleWrapper>
                <StationContainer>
                    {stationInfo.infoTransfer && (
                        <div className="transfer_station">
                            <h2 className="info_title">환승역</h2>
                            {transferLine.map((transfer, index) => (
                                <div
                                    key={`line_${transfer}`}
                                    className={`transfer_station_line ${transferLineColor[index]}`}
                                >
                                    <span>{transfer}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {climateCard.getOff === "y" &&
                        climateCard.getOn === "y" && (
                            <div className="climate_card">
                                <h2 className="info_title">기후동행카드</h2>
                                <span>승 &#183; 하차 가능</span>
                            </div>
                        )}
                    {climateCard.getOff === "y" &&
                        climateCard.getOn === "n" && (
                            <div className="climate_card">
                                <h2 className="info_title">기후동행카드</h2>
                                <span>하차만 가능</span>
                            </div>
                        )}
                    <h2 className="info_title">상세정보</h2>
                    <div className="info address_container">
                        <span>
                            <FaMapMarkerAlt />
                        </span>
                        <span>주소</span>
                        <div className="detail_info station_address">
                            <span>{info.infoAddress}</span>
                        </div>
                    </div>
                    <div className="info elevators_container">
                        <span>
                            <PiElevatorFill />
                        </span>
                        <span>엘리베이터</span>
                        <div className="detail_info elevators_info">
                            {elevators.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {elevators.map((elevator, index) => (
                                        <span
                                            key={`elevator${index}`}
                                            className="elevator"
                                        >
                                            {elevator.elevatorComment}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info escalators_container">
                        <span>
                            <TbEscalator />
                        </span>
                        <span>에스컬레이터</span>
                        <div className="detail_info escalator_info">
                            {escalators.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {escalators.map((escalator, index) => (
                                        <span
                                            key={`escalator${index}`}
                                            className="escalator"
                                        >
                                            {escalator.escalComment}
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info lifts_container">
                        <span>
                            <FaWheelchair />
                        </span>
                        <span>휠체어리프트</span>
                        <div className="detail_info lift_info">
                            {lifts.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {lifts.map((lift, index) => (
                                        <p
                                            key={`lift${index}`}
                                            className="lift"
                                        >
                                            <span>{lift.liftStartFloor}</span>
                                            <span>{lift.liftStartComment}</span>
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info toilets_container">
                        <span>
                            <FaRestroom />
                        </span>
                        <span>화장실</span>
                        <div className="detail_info toilet_info">
                            {toilets.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {toilets.map((toilet, index) => (
                                        <p
                                            key={`toilet${index}`}
                                            className="toilet"
                                        >
                                            {toilet.toiletComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info dif_toilets_container">
                        <span>
                            <img src={difToiletIcon} alt="dif_toilet_icon" />
                        </span>
                        <span>장애인화장실</span>
                        <div className="detail_info dif_toilet_info">
                            {difToilets.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {difToilets.map((difToilet, index) => (
                                        <p
                                            key={`difToilet${index}`}
                                            className="dif_toilet"
                                        >
                                            {difToilet.difToiletComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info nursing_rooms_container">
                        <span>
                            <LuBaby />
                        </span>
                        <span>수유실</span>
                        <div className="detail_info nursing_room_info">
                            {nursingRooms.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {nursingRooms.map((nursingRoom, index) => (
                                        <p
                                            key={`nursingRoom${index}`}
                                            className="nursing_room"
                                        >
                                            {nursingRoom.nursingRoomComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info atms_container">
                        <span>
                            <FaWonSign />
                        </span>
                        <span>ATM</span>
                        <div className="detail_info atm_info">
                            {atms.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {atms.map((atm, index) => (
                                        <p key={`atm${index}`} className="atm">
                                            {atm.atmComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info aeds_container">
                        <span>
                            <FaHeartPulse />
                        </span>
                        <span>제세동기</span>
                        <div className="detail_info aed_info">
                            {aeds.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {aeds.map((aed, index) => (
                                        <p key={`aed${index}`} className="aed">
                                            {aed.aedComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info chargers_container">
                        <span>
                            <RiBattery2ChargeFill />
                        </span>
                        <span>전동 휠체어 충전</span>
                        <div className="detail_info charger_info">
                            {chargers.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {chargers.map((charger, index) => (
                                        <p
                                            key={`charger${index}`}
                                            className="charger"
                                        >
                                            {charger.chargerComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info centers_container">
                        <span>
                            <RiCustomerService2Fill />
                        </span>
                        <span>고객센터</span>
                        <div className="detail_info center_info">
                            {centers.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {centers.map((center, index) => (
                                        <p
                                            key={`center${index}`}
                                            className="center"
                                        >
                                            {center.centerComment}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info centers_container">
                        <span>
                            <IoTime />
                        </span>
                        <span>운영시간</span>
                        <div className="detail_info center_time_info">
                            {centers.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {centers.map((center, index) => (
                                        <p
                                            key={`centerHours${index}`}
                                            className="center_time"
                                        >
                                            {center.centerHours === ""
                                                ? "-"
                                                : center.centerHours}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info centers_container">
                        <span>
                            <BsTelephoneFill />
                        </span>
                        <span>전화번호</span>
                        <div className="detail_info center_tel_info">
                            {centers.length === 0 ? (
                                <span>-</span>
                            ) : (
                                <>
                                    {centers.map((center, index) =>
                                        center.centerTel === "" ? (
                                            <p key={`centerTel${index}`}>-</p>
                                        ) : (
                                            <a
                                                key={`centerTel${index}`}
                                                href={`tel:${center.centerTel}`}
                                            >
                                                {center.centerTel}
                                            </a>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </StationContainer>
            </StationInfoContainer>
            <ToastContainer ref={toastRef} className="opacity">
                <p>즐겨찾기는 최대 5개까지 등록할 수 있습니다.</p>
            </ToastContainer>
        </StationInfoWrapper>
    );
};

export default StationInfo;
