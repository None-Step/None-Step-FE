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
    OverlayContainer,
    SearchInput,
    SearchInputContainer,
    SearchWrapper,
    ZoomControlBtn,
    ZoomControlContainer,
} from "./Map.styles";
import locationIcon from "../icons/location-icon.svg";
import subwayIcon from "../icons/subway-icon.svg";
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
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";
import { IoSearchOutline, IoTime } from "react-icons/io5";
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import axiosInstance from "@apis/axiosInstance";
import StationInfo from "./StationInfo";

const KakaoMap = () => {
    const { kakao } = window;

    const scrollRef = useRef(null);

    const [map, setMap] = useState();
    const [mapLevel, setMapLevel] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [markers, setMarkers] = useState([]);
    const [stationDetailInfo, setStationDetailInfo] = useState({});
    const [isStationInfoOpen, setIsStationInfoOpen] = useState(false);
    const [liftInfo, setLiftInfo] = useState({});
    const [isLiftInfoOpen, setIsLiftInfoOpen] = useState(false);
    const [center, setCenter] = useState({
        lat: 37.566792668332525,
        lng: 126.97865509758526,
    });
    const [userLocation, setUserLocation] = useState();

    useEffect(() => {
        getLocation();
        getUserLocation();
        setSelectedCategory("location");
    }, []);

    const getLocation = () => {
        const geoSuccess = (position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        };

        const geoError = () => {
            alert("위치를 불러오는 데에 실패했습니다.");
        };

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
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
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                radius = 1400;
                break;
            default:
                radius = 400;
        }

        if (selectedCategory && center) {
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
        }
    }, [selectedCategory, center, mapLevel]);

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
        if (!map) return;

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
        setIsLiftInfoOpen(false);
    };

    const handleSearchBlur = () => {
        document.activeElement.blur();
    };

    const handleScrollCategory = () => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 5,
                    behavior: "smooth",
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    };

    const handleClickStationInfo = () => {
        setSelectedCategory("location");
        setIsLiftInfoOpen(false);
    };

    const handleClickElevator = () => {
        setSelectedCategory("elevator");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickEscalator = () => {
        setSelectedCategory("escal");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickWheelchairLift = () => {
        setSelectedCategory("lift");
        setIsStationInfoOpen(false);
    };

    const handleClickToliet = () => {
        setSelectedCategory("toilet");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickDifToliet = () => {
        setSelectedCategory("dif-toilet");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickNursing = () => {
        setSelectedCategory("nursing-room");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickAtm = () => {
        setSelectedCategory("atm");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickAed = () => {
        setSelectedCategory("aed");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickWheelchairCharge = () => {
        setSelectedCategory("charger");
        setIsStationInfoOpen(false);
        setIsLiftInfoOpen(false);
    };

    const handleClickServiceCenter = () => {
        setSelectedCategory("center");
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
                setIsStationInfoOpen(true);
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "상세정보를 불러오는 데에 실패했습니다.\n 다시 시도해 주세요."
                );
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
                                onClick={handleClickStationInfo}
                            >
                                <img src={subwayIcon} alt="elevator-icon" />
                                <span>역 정보</span>
                            </CategoryBtn>
                        </li>
                        <li className="elevator">
                            <CategoryBtn
                                className={
                                    selectedCategory === "elevator"
                                        ? "selected"
                                        : ""
                                }
                                onClick={handleClickElevator}
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
                                onClick={handleClickEscalator}
                            >
                                <img src={escalatorIcon} alt="elevator-icon" />
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
                                onClick={handleClickWheelchairLift}
                            >
                                <img
                                    src={wheelchairLiftIcon}
                                    alt="elevator-icon"
                                />
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
                                onClick={handleClickToliet}
                            >
                                <img src={toiletIcon} alt="elevator-icon" />
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
                                onClick={handleClickDifToliet}
                            >
                                <img src={difToiletIcon} alt="elevator-icon" />
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
                                onClick={handleClickNursing}
                            >
                                <img
                                    src={nursingRoomIcon}
                                    alt="elevator-icon"
                                />
                                <span>수유실</span>
                            </CategoryBtn>
                        </li>
                        <li className="atm">
                            <CategoryBtn
                                className={
                                    selectedCategory === "atm" ? "selected" : ""
                                }
                                onClick={handleClickAtm}
                            >
                                <img src={atmIcon} alt="elevator-icon" />
                                <span>ATM</span>
                            </CategoryBtn>
                        </li>
                        <li className="aed">
                            <CategoryBtn
                                className={
                                    selectedCategory === "aed" ? "selected" : ""
                                }
                                onClick={handleClickAed}
                            >
                                <img src={aedIcon} alt="elevator-icon" />
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
                                onClick={handleClickWheelchairCharge}
                            >
                                <img
                                    src={wheelchairChargerIcon}
                                    alt="elevator-icon"
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
                                onClick={handleClickServiceCenter}
                            >
                                <img
                                    src={customerServiceIcon}
                                    alt="elevator-icon"
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
                                        width: 35,
                                        height: 49,
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
                            {mapLevel < 5 && isStationInfoOpen && (
                                <StationInfo
                                    stationInfo={stationDetailInfo}
                                    handleClose={() =>
                                        setIsStationInfoOpen(false)
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={2.5}
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
                                        width: 35,
                                        height: 49,
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
                                    yAnchor={1.65}
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
                                            <span>
                                                {marker.centerTel === ""
                                                    ? "-"
                                                    : marker.centerTel}
                                            </span>
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
                <ZoomControlContainer>
                    <ZoomControlBtn onClick={handleZoomIn}>
                        <FaPlus />
                    </ZoomControlBtn>
                    <ZoomControlBtn onClick={handleZoomOut}>
                        <FaMinus />
                    </ZoomControlBtn>
                </ZoomControlContainer>
                <MapTypeControl position={"BOTTOMLEFT"} />
            </Map>
            <LocationBtn onClick={handleMovecenter}>
                <img src={locationIcon} alt="location-icon" />
            </LocationBtn>
        </MapWrapper>
    );
};

export default KakaoMap;
