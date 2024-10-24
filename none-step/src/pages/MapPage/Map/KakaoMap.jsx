import {
    CustomOverlayMap,
    Map,
    MapMarker,
    MapTypeControl,
} from "react-kakao-maps-sdk";
import {
    CategoryBtn,
    CategoryContainer,
    CategoryWrapper,
    LocationBtn,
    MapWrapper,
    OverlayCongestion,
    OverlayContainer,
    SearchInput,
    SearchInputContainer,
    SearchWrapper,
    ToastContainer,
    ZoomControlBtn,
    ZoomControlBtnContainer,
    ZoomControlContainer,
    ZoomControlWrapper,
} from "./Map.styles";
import locationIcon from "../icons/location-icon.svg";
import subwayIcon from "../icons/subway-icon.svg";
import congestionIcon from "../icons/congestion-icon.svg";
import elevatorIcon from "../icons/elevator-icon.svg";
import escalatorIcon from "../icons/escalator-icon.svg";
import wheelchairLiftIcon from "../icons/wheelchair-lift-icon.svg";
import toiletIcon from "../icons/toilet-icon.svg";
import difToiletIcon from "../icons/dif-toilet-icon.svg";
import nursingRoomIcon from "../icons/nursing-room-icon.svg";
import atmIcon from "../icons/atm-icon.svg";
import aedIcon from "../icons/aed-icon.svg";
import wheelchairChargerIcon from "../icons/wheelchair-charger-icon.svg";
import customerServiceIcon from "../icons/customer-service-icon.svg";
import stationMarkerIcon from "../markers/station-marker-icon.svg";
import congestionMarkerIcon from "../markers/congestion-marker-icon.svg";
import elevatorMarkerIcon from "../markers/elevator-marker-icon.svg";
import escalatorMarkerIcon from "../markers/escalator-marker-icon.svg";
import wheelchairLiftMarkerIcon from "../markers/wheelchair-lift-marker-icon.svg";
import toiletMarkerIcon from "../markers/toilet-marker-icon.svg";
import difToiletMarkerIcon from "../markers/dif-toilet-marker-icon.svg";
import nursingRoomMarkerIcon from "../markers/nursing-room-marker-icon.svg";
import atmMarkerIcon from "../markers/atm-marker-icon.svg";
import aedMarkerIcon from "../markers/aed-marker-icon.svg";
import wheelchairChargerMarkerIcon from "../markers/wheelchair-charger-marker-icon.svg";
import customerServiceMarkerIcon from "../markers/customer-service-marker-icon.svg";
import userLocationIcon from "../icons/user-location-icon.svg";
import { useEffect, useRef, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPlus, HiMinus } from "react-icons/hi";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { IoSearchOutline, IoTime } from "react-icons/io5";
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import axiosInstance from "@apis/axiosInstance";
import StationInfo from "./StationInfo";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CongestionInfo from "../Congestion/CongestionInfo";

const KakaoMap = () => {
    const { kakao } = window;

    const scrollRef = useRef(null);
    const toastRef = useRef(null);

    const [map, setMap] = useState();
    const [mapLevel, setMapLevel] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [markers, setMarkers] = useState([]);
    const [stationDetailInfo, setStationDetailInfo] = useState({});
    const [stationUpTime, setStationUpTime] = useState([]);
    const [stationDownTime, setStationDownTime] = useState([]);
    const [climateCard, setClimateCard] = useState({});
    const [isStationInfoOpen, setIsStationInfoOpen] = useState(false);
    const [lineList, setLineList] = useState([]);
    const [lineColorList, setLineColorList] = useState([]);
    const [stationList, setStationList] = useState([]);
    const [stationInfo, setStationInfo] = useState({});
    const [upCongestion, setUpCongestion] = useState([]);
    const [downCongestion, setDownCongestion] = useState([]);
    const [upCongestionInfo, setUpCongestionInfo] = useState({});
    const [downCongestionInfo, setDownCongestionInfo] = useState({});
    const [upDistanceInfo, setUpDistanceInfo] = useState([]);
    const [downDistanceInfo, setDownDistanceInfo] = useState([]);
    const [isCongestionOpen, setIsCongestionOpen] = useState(false);
    const [liftInfo, setLiftInfo] = useState({});
    const [isLiftInfoOpen, setIsLiftInfoOpen] = useState(false);
    const [center, setCenter] = useState({
        lat: 37.566792668332525,
        lng: 126.97865509758526,
    });
    const [userLocation, setUserLocation] = useState();

    const location = useLocation();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        if (!location.search) {
            getLocation();
        }
        getUserLocation();
    }, []);

    useEffect(() => {
        if (location.search) {
            setCenter({
                lat: location.search
                    .replace("?", "")
                    .split("&")[0]
                    .replace("lat=", ""),
                lng: location.search
                    .replace("?", "")
                    .split("&")[1]
                    .replace("lng=", ""),
            });
        }
    }, [location.search]);

    useEffect(() => {
        switch (category.category) {
            case "congestion":
                setSelectedCategory("congestion");
                break;
            case "elevator":
                setSelectedCategory("elevator");
                break;
            case "escal":
                setSelectedCategory("escal");
                break;
            case "lift":
                setSelectedCategory("lift");
                break;
            case "toilet":
                setSelectedCategory("toilet");
                break;
            case "dif-toilet":
                setSelectedCategory("dif-toilet");
                break;
            case "nursing-room":
                setSelectedCategory("nursing-room");
                break;
            case "atm":
                setSelectedCategory("atm");
                break;
            case "aed":
                setSelectedCategory("aed");
                break;
            case "charger":
                setSelectedCategory("charger");
                break;
            case "center":
                setSelectedCategory("center");
                break;
            default:
                setSelectedCategory("location");
        }
    }, [category.category]);

    const getLocation = () => {
        const geoSuccess = (position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        };

        const geoError = () => {
            toastPop();
        };

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 1000 * 5,
            maximumAge: 1000 * 3600 * 12,
        };

        navigator.geolocation.getCurrentPosition(
            geoSuccess,
            geoError,
            geoOptions
        );
    };

    const getUserLocation = () => {
        const geoSuccess = (position) => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        };

        navigator.geolocation.watchPosition(geoSuccess);
    };

    useEffect(() => {
        let radius;

        switch (mapLevel) {
            case 1:
            case 2:
            case 3:
                radius = 400;
                break;
            case 4:
                radius = 600;
                break;
            case 5:
                radius = 1400;
                break;
            case 6:
                radius = 2000;
                break;
            case 7:
                radius = 2500;
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                radius = 3000;
                break;
            default:
                radius = 400;
        }

        const nowTime = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");

            return `${hours}${minutes}`;
        };

        const nowWeek = () => {
            const date = new Date();
            const week = date.getDay();
            const weekList = [
                "HOLIDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "SAT",
            ];

            return `${weekList[week]}`;
        };

        if (selectedCategory !== "congestion" && selectedCategory && center) {
            axiosInstance
                .get(
                    `/nonestep/subway/${selectedCategory}?latitude=${center.lat}&longitude=${center.lng}&radius=${radius}`
                )
                .then((response) => {
                    setMarkers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (
            selectedCategory === "congestion" &&
            selectedCategory &&
            center
        ) {
            axiosInstance
                .get(
                    `/nonestep/congestion/subway-marker?latitude=${
                        center.lat
                    }&longitude=${
                        center.lng
                    }&radius=${radius}&time=${nowTime()}&type=${nowWeek()}`
                )
                .then((response) => {
                    setMarkers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedCategory, center, mapLevel]);

    useEffect(() => {
        if (selectedCategory === "congestion") {
            setLineList(
                markers.map((marker) => {
                    switch (marker.line) {
                        case "1호선":
                            return "1";
                        case "2호선":
                            return "2";
                        case "3호선":
                            return "3";
                        case "4호선":
                            return "4";
                        case "5호선":
                            return "5";
                        case "6호선":
                            return "6";
                        case "7호선":
                            return "7";
                        case "8호선":
                            return "8";
                        case "9호선":
                            return "9";
                        case "수인분당선":
                            return "수인분당";
                        case "신분당선":
                            return "신분당";
                        case "경의중앙선":
                            return "경의중앙";
                        case "경춘선":
                            return "경춘";
                        case "경강선":
                            return "경강";
                        case "우의신설선":
                            return "우의신설";
                        case "신림선":
                            return "신림";
                        case "김포골드라인":
                            return "김포골드";
                        case "에버라인":
                            return "에버라인";
                        case "서해선":
                            return "서해";
                        case "공항철도":
                            return "공항";
                        case "GTX-A":
                            return "GTX-A";
                        case "의정부경전철":
                            return "의정부";
                        case "인천1호선":
                            return "인천1";
                        case "인천2호선":
                            return "인천2";
                        case "동해선":
                            return "동해";
                        case "부산김해경전철":
                            return "부산김해";
                    }
                })
            );

            setLineColorList(
                markers.map((marker) => {
                    if (marker.region === "수도권") {
                        switch (marker.line) {
                            case "1호선":
                                return "capital_line1";
                            case "2호선":
                                return "capital_line2";
                            case "3호선":
                                return "capital_line3";
                            case "4호선":
                                return "capital_line4";
                            case "5호선":
                                return "capital_line5";
                            case "6호선":
                                return "capital_line6";
                            case "7호선":
                                return "capital_line7";
                            case "8호선":
                                return "capital_line8";
                            case "9호선":
                                return "capital_line9";
                            case "수인분당선":
                                return "capital_suin";
                            case "신분당선":
                                return "capital_shinbundang";
                            case "경의중앙선":
                                return "capital_gyeongui";
                            case "경춘선":
                                return "capital_gyeongchun";
                            case "경강선":
                                return "capital_gyeonggang";
                            case "우의신설선":
                                return "capital_wooyi";
                            case "신림선":
                                return "capital_sillim";
                            case "김포골드라인":
                                return "capital_gimpo";
                            case "에버라인":
                                return "capital_ever";
                            case "서해선":
                                return "capital_seohae";
                            case "공항철도":
                                return "capital_airport";
                            case "GTX-A":
                                return "capital_GTX_A";
                            case "의정부경전철":
                                return "capital_uijeongbu";
                            case "인천1호선":
                                return "capital_incheon1";
                            case "인천2호선":
                                return "capital_incheon2";
                        }
                    } else if (marker.region === "부산") {
                        switch (marker.line) {
                            case "1호선":
                                return "busan_line1";

                            case "2호선":
                                return "busan_line2";

                            case "3호선":
                                return "busan_line3";

                            case "4호선":
                                return "busan_line4";

                            case "동해선":
                                return "busan_donghae";

                            case "부산김해경전철":
                                return "busan_gimhae";
                        }
                    } else if (marker.region === "대구") {
                        switch (marker.line) {
                            case "1호선":
                                return "daegu_line1";

                            case "2호선":
                                return "daegu_line2";

                            case "3호선":
                                return "daegu_line3";
                        }
                    } else if (marker.region === "대전") {
                        return "daejeon_line1";
                    } else if (marker.region === "광주") {
                        return "gwangju_line1";
                    }
                })
            );

            setUpCongestion(
                markers.map((marker) => {
                    switch (marker.upCongestion) {
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
                })
            );

            setDownCongestion(
                markers.map((marker) => {
                    switch (marker.downCongestion) {
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
                })
            );

            setStationList(
                markers.map((marker) => {
                    return marker.station
                        ? marker.station.replace(",", "·")
                        : marker.station;
                })
            );
        }
    }, [markers, selectedCategory]);

    const getMapLevel = (map) => {
        const level = map.getLevel();
        const center = map.getCenter();

        setMapLevel(level);
        setCenter({ lat: center.getLat(), lng: center.getLng() });
        setIsStationInfoOpen(false);
    };

    const getMapCenter = (map) => {
        const center = map.getCenter();
        setCenter({ lat: center.getLat(), lng: center.getLng() });
        setIsStationInfoOpen(false);
    };

    const handleSearchInfo = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(
            searchKeyword,
            (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const bounds = new kakao.maps.LatLngBounds();
                    const resultData = data.filter((x) =>
                        x.place_name.includes(searchKeyword)
                    );
                    let firstResult;

                    if (resultData.length === 0) {
                        firstResult = data[0];
                    } else {
                        firstResult = resultData[0];
                    }

                    if (firstResult) {
                        const { x, y } = firstResult;
                        let kakaoPosition;

                        axiosInstance
                            .get(
                                `/nonestep/subway/location?latitude=${y}&longitude=${x}&radius=5000`
                            )
                            .then((response) => {
                                const result = response.data.filter((d) =>
                                    d.infoStation.includes(searchKeyword)
                                )[0];

                                if (result) {
                                    kakaoPosition = new kakao.maps.LatLng(
                                        result.infoLatitude,
                                        result.infoLongitude
                                    );

                                    bounds.extend(
                                        new kakao.maps.LatLng(
                                            result.infoLatitude,
                                            result.infoLongitude
                                        )
                                    );

                                    setCenter({
                                        lat: result.infoLatitude,
                                        lng: result.infoLongitude,
                                    });
                                } else {
                                    kakaoPosition = new kakao.maps.LatLng(y, x);
                                    bounds.extend(new kakao.maps.LatLng(y, x));
                                    setCenter({
                                        lat: kakaoPosition.Ma,
                                        lng: kakaoPosition.La,
                                    });
                                }

                                map.setBounds(bounds);
                                map.panTo(kakaoPosition);
                            })
                            .catch((error) => {
                                console.log(error);

                                kakaoPosition = new kakao.maps.LatLng(y, x);
                                bounds.extend(new kakao.maps.LatLng(y, x));
                                setCenter({
                                    lat: kakaoPosition.Ma,
                                    lng: kakaoPosition.La,
                                });

                                map.setBounds(bounds);
                                map.panTo(kakaoPosition);
                            });
                    } else {
                        alert("검색 결과가 존재하지 않습니다.");
                    }
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                    alert("검색 결과가 존재하지 않습니다.");
                } else if (status === kakao.maps.services.Status.ERROR) {
                    alert("검색 결과 중 오류가 발생했습니다.");
                }
            },
            {
                category_group_code: "SW8",
                location: map.getCenter(),
                useMapBounds: true,
            }
        );
    };

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
            handleSearchBlur();
        }
    };

    const handleSearchClick = () => {
        setIsStationInfoOpen(false);
        setIsCongestionOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleSearchBlur = () => {
        document.activeElement.blur();
    };

    const handleScrollCategory = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                scrollElement.scrollTo({
                    left: scrollElement.scrollLeft + e.deltaY * 5,
                    behavior: "smooth",
                });
            };
            scrollElement.addEventListener("wheel", onWheel);
            return () => scrollElement.removeEventListener("wheel", onWheel);
        }
    };

    const handleClickCategory = (category) => {
        setSelectedCategory(category);
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const getStationInfo = (marker) => {
        axiosInstance
            .get(
                `/nonestep/subway/station-info?region=${marker.infoRegion}&line=${marker.infoLine}&station=${marker.infoStation}`
            )
            .then((response) => {
                setStationDetailInfo(response.data);
                if (response.status === 200) setIsStationInfoOpen(true);
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "상세정보를 불러오는 데에 실패했습니다.\n 다시 시도해 주세요."
                );
            });

        axiosInstance
            .get(
                `/nonestep/subway/up-time?region=${marker.infoRegion}&line=${marker.infoLine}&station=${marker.infoStation}`
            )
            .then((response) => {
                setStationUpTime(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(
                `/nonestep/subway/down-time?region=${marker.infoRegion}&line=${marker.infoLine}&station=${marker.infoStation}`
            )
            .then((response) => {
                setStationDownTime(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(
                `/nonestep/subway/climate-card?region=${marker.infoRegion}&line=${marker.infoLine}&station=${marker.infoStation}`
            )
            .then((response) => {
                setClimateCard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCongestionInfo = (marker) => {
        const nowTime = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");

            return `${hours}${minutes}`;
        };

        const nowWeek = () => {
            const date = new Date();
            const week = date.getDay();
            const weekList = [
                "HOLIDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "WEEKDAY",
                "SAT",
            ];

            return `${weekList[week]}`;
        };

        axiosInstance
            .get(
                `/nonestep/congestion/up-time?region=${marker.region}&line=${
                    marker.line
                }&station=${marker.station}&time=${nowTime()}&type=${nowWeek()}`
            )
            .then((response) => {
                setUpCongestionInfo(response.data);
                setIsCongestionOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(
                `/nonestep/congestion/down-time?region=${marker.region}&line=${
                    marker.line
                }&station=${marker.station}&time=${nowTime()}&type=${nowWeek()}`
            )
            .then((response) => {
                setDownCongestionInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(
                `/nonestep/congestion/up-info?region=${marker.region}&line=${marker.line}&station=${marker.station}`
            )
            .then((response) => {
                setUpDistanceInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(
                `/nonestep/congestion/down-info?region=${marker.region}&line=${marker.line}&station=${marker.station}`
            )
            .then((response) => {
                setDownDistanceInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setStationInfo({
            region: marker.region,
            line: marker.line,
            station: marker.station,
        });
    };

    const getLiftInfoOverlay = (index) => {
        setLiftInfo({
            liftIndex: index,
            liftLatitude: markers[index].liftLatitude,
            liftLongitude: markers[index].liftLongitude,
            liftStartFloor: markers[index].liftStartFloor,
            liftStartComment: markers[index].liftStartComment,
            liftEndFloor: markers[index].liftEndFloor,
            liftEndComment: markers[index].liftEndComment,
            liftHeight: markers[index].liftHeight,
            liftWidth: markers[index].liftWidth,
            liftKG: markers[index].liftKG,
        });
    };

    const handleZoomIn = () => {
        map.setLevel(map.getLevel() - 1, { animate: true });
    };

    const handleZoomOut = () => {
        map.setLevel(map.getLevel() + 1, { animate: true });
    };

    const handleMovecenter = () => {
        const userPosition = new kakao.maps.LatLng(
            userLocation.lat,
            userLocation.lng
        );
        map.panTo(userPosition);
    };

    const toastPop = () => {
        if (toastRef.current) {
            toastRef.current.classList.remove("opacity");

            setTimeout(() => {
                toastRef.current.classList.add("opacity");
            }, 2000);
        }
    };

    return (
        <MapWrapper>
            <Map
                center={center}
                isPanto={true}
                level={3}
                style={{ width: "100%", height: "100%" }}
                onCreate={setMap}
                onZoomChanged={(map) => getMapLevel(map)}
                onDragEnd={(map) => getMapCenter(map)}
                onClick={() => {
                    handleSearchBlur();
                    setIsStationInfoOpen(false);
                    setIsLiftInfoOpen(false);
                }}
                onDrag={handleSearchBlur}
            >
                <SearchWrapper>
                    <SearchInputContainer>
                        <label htmlFor="search">
                            <IoSearchOutline />
                        </label>
                        <SearchInput
                            type="search"
                            id="search"
                            name="q"
                            label="검색"
                            value={searchKeyword}
                            placeholder="지하철역 검색"
                            onChange={handleSearchInfo}
                            onKeyPress={handleSearchEnter}
                            onClick={handleSearchClick}
                        />
                    </SearchInputContainer>
                </SearchWrapper>
                <CategoryWrapper>
                    <CategoryContainer
                        ref={scrollRef}
                        onWheel={handleScrollCategory}
                    >
                        <li className="station_info">
                            <CategoryBtn
                                className={
                                    selectedCategory === "location"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("location")}
                            >
                                <img src={subwayIcon} alt="subway-icon" />
                                <span>역정보</span>
                            </CategoryBtn>
                        </li>
                        <li className="congestion">
                            <CategoryBtn
                                className={
                                    selectedCategory === "congestion"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    handleClickCategory("congestion")
                                }
                            >
                                <img
                                    src={congestionIcon}
                                    alt="congestion-icon"
                                />
                                <span>지하철혼잡도</span>
                            </CategoryBtn>
                        </li>
                        <li className="elevator">
                            <CategoryBtn
                                className={
                                    selectedCategory === "elevator"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("elevator")}
                            >
                                <img src={elevatorIcon} alt="elevator-icon" />
                                <span>엘리베이터</span>
                            </CategoryBtn>
                        </li>
                        <li className="escalator">
                            <CategoryBtn
                                className={
                                    selectedCategory === "escal"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("escal")}
                            >
                                <img src={escalatorIcon} alt="escalator-icon" />
                                <span>에스컬레이터</span>
                            </CategoryBtn>
                        </li>
                        <li className="wheelchair_lift">
                            <CategoryBtn
                                className={
                                    selectedCategory === "lift"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("lift")}
                            >
                                <img src={wheelchairLiftIcon} alt="lift-icon" />
                                <span>휠체어리프트</span>
                            </CategoryBtn>
                        </li>
                        <li className="toilet">
                            <CategoryBtn
                                className={
                                    selectedCategory === "toilet"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("toilet")}
                            >
                                <img src={toiletIcon} alt="toilet-icon" />
                                <span>화장실</span>
                            </CategoryBtn>
                        </li>
                        <li className="dif_toilet">
                            <CategoryBtn
                                className={
                                    selectedCategory === "dif-toilet"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    handleClickCategory("dif-toilet")
                                }
                            >
                                <img
                                    src={difToiletIcon}
                                    alt="dif-toilet-icon"
                                />
                                <span>장애인 화장실</span>
                            </CategoryBtn>
                        </li>
                        <li className="nursing">
                            <CategoryBtn
                                className={
                                    selectedCategory === "nursing-room"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    handleClickCategory("nursing-room")
                                }
                            >
                                <img
                                    src={nursingRoomIcon}
                                    alt="nursing-room-icon"
                                />
                                <span>수유실</span>
                            </CategoryBtn>
                        </li>
                        <li className="atm">
                            <CategoryBtn
                                className={
                                    selectedCategory === "atm" ? "selected" : ""
                                }
                                onClick={() => handleClickCategory("atm")}
                            >
                                <img src={atmIcon} alt="atm-icon" />
                                <span>ATM</span>
                            </CategoryBtn>
                        </li>
                        <li className="aed">
                            <CategoryBtn
                                className={
                                    selectedCategory === "aed" ? "selected" : ""
                                }
                                onClick={() => handleClickCategory("aed")}
                            >
                                <img src={aedIcon} alt="aed-icon" />
                                <span>제세동기</span>
                            </CategoryBtn>
                        </li>
                        <li className="wheelchair_charge">
                            <CategoryBtn
                                className={
                                    selectedCategory === "charger"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("charger")}
                            >
                                <img
                                    src={wheelchairChargerIcon}
                                    alt="wheelchair-charger-icon"
                                />
                                <span>전동 휠체어 충전</span>
                            </CategoryBtn>
                        </li>
                        <li className="service_center">
                            <CategoryBtn
                                className={
                                    selectedCategory === "center"
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleClickCategory("center")}
                            >
                                <img
                                    src={customerServiceIcon}
                                    alt="customer-service-icon"
                                />
                                <span>고객센터</span>
                            </CategoryBtn>
                        </li>
                    </CategoryContainer>
                </CategoryWrapper>
                {selectedCategory === "location" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`location-${marker.infoLatitude},${marker.infoLongitude}`}
                                image={{
                                    src: stationMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.infoLatitude,
                                    lng: marker.infoLongitude,
                                }}
                                clickable={true}
                                onClick={() => {
                                    getStationInfo(marker);
                                    handleSearchBlur();
                                }}
                            />
                            {mapLevel < 7 && isStationInfoOpen && (
                                <StationInfo
                                    stationInfo={stationDetailInfo}
                                    stationUpTime={stationUpTime}
                                    stationDownTime={stationDownTime}
                                    climateCard={climateCard}
                                    handleClose={() =>
                                        setIsStationInfoOpen(false)
                                    }
                                />
                            )}
                        </>
                    ))}
                {selectedCategory === "congestion" &&
                    markers.map((marker, index) => (
                        <>
                            <MapMarker
                                key={`location-${marker.latitude},${marker.longitude}`}
                                image={{
                                    src: congestionMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.latitude,
                                    lng: marker.longitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-congestion-${marker.latitude},${marker.longitude}`}
                                    position={{
                                        lat: marker.latitude,
                                        lng: marker.longitude,
                                    }}
                                    yAnchor={1.55}
                                >
                                    <OverlayCongestion>
                                        <div className="station_info">
                                            <span className="station">
                                                <span
                                                    className={`line ${lineColorList[index]}`}
                                                >
                                                    {lineList[index]}
                                                </span>
                                                <span className="station_name">
                                                    {stationList[index]}
                                                </span>
                                            </span>
                                            <span
                                                className="more_info"
                                                onClick={() => {
                                                    getCongestionInfo(marker);
                                                    handleSearchBlur();
                                                }}
                                            >
                                                더보기
                                            </span>
                                        </div>
                                        <div className="congestion_info">
                                            {(marker.line === "6호선" &&
                                                marker.station === "역촌") ||
                                            (marker.line === "6호선" &&
                                                marker.station === "불광") ||
                                            (marker.line === "6호선" &&
                                                marker.station === "독바위") ||
                                            (marker.line === "6호선" &&
                                                marker.station === "연신내") ||
                                            (marker.line === "6호선" &&
                                                marker.station === "구산") ? (
                                                <></>
                                            ) : (
                                                <div className="up_congestion">
                                                    <span className="direction">
                                                        {marker.upNextStation ===
                                                        ""
                                                            ? `${marker.station} 방향`
                                                            : marker.upNextStation}
                                                    </span>
                                                    <span
                                                        className={`congestion ${upCongestion[index]}`}
                                                    >
                                                        {marker.upCongestion
                                                            ? marker.upCongestion
                                                            : "정보없음"}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="down_congestion">
                                                <span className="direction">
                                                    {marker.downNextStation ===
                                                    ""
                                                        ? `${marker.station} 방향`
                                                        : marker.downNextStation}
                                                </span>
                                                <span
                                                    className={`congestion ${downCongestion[index]}`}
                                                >
                                                    {marker.downCongestion
                                                        ? marker.downCongestion
                                                        : "정보없음"}
                                                </span>
                                            </div>
                                        </div>
                                    </OverlayCongestion>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                            {isCongestionOpen && (
                                <CongestionInfo
                                    stationInfo={stationInfo}
                                    upCongestion={upCongestionInfo}
                                    downCongestion={downCongestionInfo}
                                    upDistanceInfo={upDistanceInfo}
                                    downDistanceInfo={downDistanceInfo}
                                    handleClose={() =>
                                        setIsCongestionOpen(false)
                                    }
                                />
                            )}
                        </>
                    ))}
                {selectedCategory === "elevator" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`elevator-${marker.elevatorLatitude},${marker.elevatorLongitude}`}
                                image={{
                                    src: elevatorMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.elevatorLatitude,
                                    lng: marker.elevatorLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-elevator-${marker.elevatorLatitude},${marker.elevatorLongitude}`}
                                    position={{
                                        lat: marker.elevatorLatitude,
                                        lng: marker.elevatorLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="elevator_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>
                                                {marker.elevatorComment}
                                            </span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "escal" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`escalator-${marker.escalLatitude},${marker.escalLongitude}`}
                                image={{
                                    src: escalatorMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.escalLatitude,
                                    lng: marker.escalLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-escalator-${marker.escalLatitude},${marker.escalLongitude}`}
                                    position={{
                                        lat: marker.escalLatitude,
                                        lng: marker.escalLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="escalator_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.escalComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "lift" &&
                    markers.map((marker, index) => (
                        <>
                            <MapMarker
                                key={`wheelchairLift-${marker.liftLatitude},${marker.liftLongitude}`}
                                image={{
                                    src: wheelchairLiftMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.liftLatitude,
                                    lng: marker.liftLongitude,
                                }}
                                clickable={true}
                                onClick={() => {
                                    if (
                                        isLiftInfoOpen &&
                                        liftInfo.liftIndex === index
                                    ) {
                                        setIsLiftInfoOpen(false);
                                        getLiftInfoOverlay(index);
                                    } else if (
                                        !isLiftInfoOpen &&
                                        liftInfo.liftIndex === index
                                    ) {
                                        setIsLiftInfoOpen(true);
                                        getLiftInfoOverlay(index);
                                    } else if (
                                        isLiftInfoOpen &&
                                        liftInfo.liftIndex !== index
                                    ) {
                                        setIsLiftInfoOpen(true);
                                        getLiftInfoOverlay(index);
                                    } else if (
                                        !isLiftInfoOpen &&
                                        liftInfo.liftIndex !== index
                                    ) {
                                        setIsLiftInfoOpen(true);
                                        getLiftInfoOverlay(index);
                                    }

                                    handleSearchBlur();
                                }}
                            />
                        </>
                    ))}
                {selectedCategory === "lift" &&
                mapLevel < 5 &&
                isLiftInfoOpen ? (
                    <CustomOverlayMap
                        key={`overlay-wheelchairLift-${liftInfo.liftLatitude},${liftInfo.liftLongitude}`}
                        position={{
                            lat: liftInfo.liftLatitude,
                            lng: liftInfo.liftLongitude,
                        }}
                        zIndex={10}
                        yAnchor={1.34}
                    >
                        <OverlayContainer>
                            <p className="lift_overlay">
                                <span className="start_icon">
                                    <GoMoveToTop />
                                </span>
                                <span>시작층 : </span>
                                {liftInfo.liftStartFloor === "" &&
                                liftInfo.liftStartComment === "" ? (
                                    <span>-</span>
                                ) : (
                                    <span>
                                        <span>{liftInfo.liftStartFloor}</span>
                                        <span className="lift_comment">
                                            {liftInfo.liftStartComment}
                                        </span>
                                    </span>
                                )}
                            </p>
                            <p className="lift_overlay">
                                <span className="end_icon">
                                    <GoMoveToBottom />
                                </span>
                                <span>종료층 : </span>
                                {liftInfo.liftEndFloor === "" &&
                                liftInfo.liftEndComment === "" ? (
                                    <span>-</span>
                                ) : (
                                    <span>
                                        <span>{liftInfo.liftEndFloor}</span>
                                        <span className="lift_comment">
                                            {liftInfo.liftEndComment}
                                        </span>
                                    </span>
                                )}
                            </p>
                            <p className="lift_overlay">
                                <span className="height_icon">
                                    <TbArrowAutofitHeight />
                                </span>
                                <span>길이 : </span>
                                {liftInfo.liftHeight === "" ? (
                                    <span>-</span>
                                ) : (
                                    <span>{liftInfo.liftHeight}</span>
                                )}
                            </p>
                            <p className="lift_overlay">
                                <span className="width_icon">
                                    <TbArrowAutofitWidth />
                                </span>
                                <span>폭 : </span>
                                {liftInfo.liftWidth === "" ? (
                                    <span>-</span>
                                ) : (
                                    <span>{liftInfo.liftWidth}</span>
                                )}
                            </p>
                            <p className="lift_overlay">
                                <span className="weight_icon">kg</span>
                                <span>한계중량 : </span>
                                {liftInfo.liftKG === "" ? (
                                    <span>-</span>
                                ) : (
                                    <span>{liftInfo.liftKG}</span>
                                )}
                            </p>
                        </OverlayContainer>
                    </CustomOverlayMap>
                ) : (
                    <></>
                )}
                {selectedCategory === "toilet" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`toilet-${marker.toiletLatitude},${marker.toiletLongitude}`}
                                image={{
                                    src: toiletMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.toiletLatitude,
                                    lng: marker.toiletLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-toilet-${marker.toiletLatitude},${marker.toiletLongitude}`}
                                    position={{
                                        lat: marker.toiletLatitude,
                                        lng: marker.toiletLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="toilet_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.toiletComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "dif-toilet" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`difToilet-${marker.difToiletLatitude},${marker.difToiletLongitude}`}
                                image={{
                                    src: difToiletMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.difToiletLatitude,
                                    lng: marker.difToiletLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-difToilet-${marker.difToiletLatitude},${marker.difToiletLongitude}`}
                                    position={{
                                        lat: marker.difToiletLatitude,
                                        lng: marker.difToiletLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="dif_toilet_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>
                                                {marker.difToiletComment}
                                            </span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "nursing-room" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`nursingRoom-${marker.nursingLatitude},${marker.nursingLongitude}`}
                                image={{
                                    src: nursingRoomMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.nursingLatitude,
                                    lng: marker.nursingLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-nursingRoom-${marker.nursingLatitude},${marker.nursingLongitude}`}
                                    position={{
                                        lat: marker.nursingLatitude,
                                        lng: marker.nursingLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="nursing_room_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.nursingComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "atm" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`atm-${marker.atmLatitude},${marker.atmLongitude}`}
                                image={{
                                    src: atmMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.atmLatitude,
                                    lng: marker.atmLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-atm-${marker.atmLatitude},${marker.atmLongitude}`}
                                    position={{
                                        lat: marker.atmLatitude,
                                        lng: marker.atmLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="atm_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.atmComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "aed" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`aed-${marker.aedLatitude},${marker.aedLongitude}`}
                                image={{
                                    src: aedMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.aedLatitude,
                                    lng: marker.aedLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-aed-${marker.aedLatitude},${marker.aedLongitude}`}
                                    position={{
                                        lat: marker.aedLatitude,
                                        lng: marker.aedLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="aed_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.aedComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "charger" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`wheelchairCharger-${marker.chargerLatitude},${marker.chargerLongitude}`}
                                image={{
                                    src: wheelchairChargerMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.chargerLatitude,
                                    lng: marker.chargerLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-wheelchairCharger-${marker.chargerLatitude},${marker.chargerLongitude}`}
                                    position={{
                                        lat: marker.chargerLatitude,
                                        lng: marker.chargerLongitude,
                                    }}
                                    yAnchor={2.8}
                                >
                                    <OverlayContainer>
                                        <p className="charger_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.chargerComment}</span>
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {selectedCategory === "center" &&
                    markers.map((marker) => (
                        <>
                            <MapMarker
                                key={`center-${marker.centerLatitude},${marker.centerLongitude}`}
                                image={{
                                    src: customerServiceMarkerIcon,
                                    size: {
                                        width: 40,
                                        height: 56,
                                    },
                                }}
                                position={{
                                    lat: marker.centerLatitude,
                                    lng: marker.centerLongitude,
                                }}
                                clickable={false}
                            />
                            {mapLevel < 5 ? (
                                <CustomOverlayMap
                                    key={`overlay-center-${marker.centerLatitude},${marker.centerLongitude}`}
                                    position={{
                                        lat: marker.centerLatitude,
                                        lng: marker.centerLongitude,
                                    }}
                                    yAnchor={1.8}
                                >
                                    <OverlayContainer>
                                        <p className="center_overlay">
                                            <span className="marker_icon">
                                                <FaMapMarkerAlt />
                                            </span>
                                            <span>{marker.centerComment}</span>
                                        </p>
                                        <p className="center_overlay">
                                            <span className="time_icon">
                                                <IoTime />
                                            </span>
                                            <span>
                                                {marker.centerHours === ""
                                                    ? "-"
                                                    : marker.centerHours}
                                            </span>
                                        </p>
                                        <p className="center_overlay">
                                            <span className="telephone_icon">
                                                <BsTelephoneFill />
                                            </span>
                                            {marker.centerTel === "" ? (
                                                <p>-</p>
                                            ) : (
                                                <a
                                                    href={`tel:${marker.centerTel}`}
                                                >
                                                    {marker.centerTel}
                                                </a>
                                            )}
                                        </p>
                                    </OverlayContainer>
                                </CustomOverlayMap>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                {userLocation && (
                    <MapMarker
                        image={{
                            src: userLocationIcon,
                            size: {
                                width: 30,
                                height: 30,
                            },
                        }}
                        clickable={false}
                        position={userLocation}
                    />
                )}
                <MapTypeControl position={"BOTTOMLEFT"} />
            </Map>
            <ZoomControlWrapper>
                <ZoomControlContainer>
                    <ZoomControlBtnContainer>
                        <ZoomControlBtn onClick={handleZoomIn}>
                            <HiPlus />
                        </ZoomControlBtn>
                        <ZoomControlBtn onClick={handleZoomOut}>
                            <HiMinus />
                        </ZoomControlBtn>
                    </ZoomControlBtnContainer>
                    <LocationBtn onClick={handleMovecenter}>
                        <img src={locationIcon} alt="location-icon" />
                    </LocationBtn>
                </ZoomControlContainer>
            </ZoomControlWrapper>
            <ToastContainer ref={toastRef} className="opacity">
                <p>위치를 불러오는데 실패했습니다.</p>
            </ToastContainer>
        </MapWrapper>
    );
};

export default KakaoMap;
