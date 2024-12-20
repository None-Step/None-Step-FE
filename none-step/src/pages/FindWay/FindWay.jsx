import React, { useState, useEffect, useCallback } from "react";
import {
    Map,
    MapMarker,
    CustomOverlayMap,
    Polyline,
} from "react-kakao-maps-sdk";
import {
    PageWrapper,
    Reload,
    CustomOverlay,
    StationName,
    UserLocationStart,
    StationAddress,
    ButtonContainer,
    Button,
    BookmarkBtn,
    BookmarkSpan,
    BookmarkIcon,
    MapItemsWrapper,
    MapItemsContainer,
} from "./FindWay.style";
import { PageHeader } from "@/components/header/Headers";
import MenuBar from "@/components/menuBar/MenuBar";
import ReloadIcon from "@/assets/img/current.svg";
import KakaoMapPlaceSearch from "./KakaoMapPlaceSearch";
import FindWayPopup from "./popup/FindWayPopup";
import axiosInstance from "@/apis/axiosInstance";
import QuickRoute from "./buttons/QuickRoute";
import BicycleMarker from "@/assets/img/bicycle-marker.svg";
import OriginMarker from "@/assets/img/origin-marker.svg";
import DestinationMarker from "@/assets/img/destination-marker.svg";
import Loading from "@/components/Loading";
import emptyStar from "@/assets/img/gray-star.svg";
import yellowStar from "@/assets/img/yellow-star.svg";
import BookmarkModal from "./modal/BookmarkModal";
import BookmarkPathBtn from "./buttons/BookmarkPathBtn";
import { InfoWrapper, Warning } from "./weather/Weather.style";
import WarningIcon from "./weather/icons/warning.svg";
import { WeatherPopup, WeatherPreview } from "./weather/Weather";
import WeatherErrorModal from "./weather/WeatherErrorModal";

const TIMEOUT_DURATION = 4000;
const DEFAULT_CENTER = { lat: 37.56682420267543, lng: 126.978652258823 };
const DEFAULT_LEVEL = 3;

const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}분`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
};

const formatDistance = (meters) => {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(2)}km`;
};

const FindWay = () => {
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState(DEFAULT_CENTER);
    const [userLocation, setUserLocation] = useState(null);
    const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
    const [isTracking, setIsTracking] = useState(true);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [isRouteCalculated, setIsRouteCalculated] = useState(false);
    const [routeData, setRouteData] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [showRoutePopup, setShowRoutePopup] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [showOriginOverlay, setShowOriginOverlay] = useState(false);
    const [showDestinationOverlay, setShowDestinationOverlay] = useState(false);
    const [showUserLocationOverlay, setShowUserLocationOverlay] =
        useState(false);
    const [originInput, setOriginInput] = useState("");
    const [destinationInput, setDestinationInput] = useState("");
    const [showBikeStationOverlay, setShowBikeStationOverlay] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState("walk"); // 경로 선택

    // 즐겨찾기 관련 ----------------------------------------------------------------
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkPlaceName, setBookmarkPlaceName] = useState("");
    const [bookmarkPlaceAddress, setBookmarkPlaceAddress] = useState("");
    const [bookmarkLat, setBookmarkLat] = useState("");
    const [bookmarkLng, setBookmarkLng] = useState("");
    const handleBookmarkClick = (placeName, placeAddress, lat, lng) => {
        setBookmarkPlaceName(placeName);
        setBookmarkPlaceAddress(placeAddress);
        setBookmarkLat(lat);
        setBookmarkLng(lng);
        setIsBookmarked(!isBookmarked);
    };
    const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);
    const [pathOrigin, setPathOrigin] = useState(null);
    const [pathDestination, setPathDestination] = useState(null);

    // 날씨 관련 ------------------------------------------------------------------
    // const [isFlooding, setIsFlooding] = useState(false);
    const [userLocationFlooding, setUserLocationFlooding] = useState(false);
    const [originFlooding, setOriginFlooding] = useState(false);
    const [destinationFlooding, setDestinationFlooding] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(""); // 모달 종류를 저장하는 상태
    // 1. 침수 상태를 위치별로 관리하는 상태 추가
    const [floodingStatus, setFloodingStatus] = useState({
        userLocation: false,
        origin: false,
        destination: false,
    });

    // 3분 동안 팝업 제한 시간 설정
    const MODAL_TIMER = 3 * 60 * 1000;

    // 모달 닫기 핸들러 (위치 + 날씨 UI 공유)
    const handleCloseModal = () => {
        setIsModalVisible(false);
        const now = Date.now();

        // 각 모달 타입에 따라 다른 시간을 저장
        if (modalType === "locationError") {
            localStorage.setItem("locationErrorDismissed", now);
        } else if (modalType === "weatherError") {
            localStorage.setItem("weatherErrorDismissed", now);
        }

        setModalType("");
    };

    // 위치 접근 오류 모달 표시 여부를 판단하는 함수
    const handleLocationError = () => {
        const lastDismissed = localStorage.getItem("locationErrorDismissed");
        const now = Date.now();

        if (!lastDismissed || now - lastDismissed > MODAL_TIMER) {
            setIsModalVisible(true);
            setModalType("locationError");
        }
    };

    // 날씨 정보 오류 모달 표시 여부를 판단하는 함수
    const handleWeatherError = () => {
        const lastDismissed = localStorage.getItem("weatherErrorDismissed");
        const now = Date.now();

        if (!lastDismissed || now - lastDismissed > MODAL_TIMER) {
            setIsModalVisible(true);
            setModalType("weatherError");
        }
    };

    const handlePathOrigin = (origin) => {
        setPathOrigin(origin);
    };

    const handlePathDestination = (destination) => {
        setPathDestination(destination);
    };

    // 날씨 팝업
    const handleWeatherPopup = useCallback(() => {
        setIsClicked((prevIsClicked) => !prevIsClicked);
    }, []);

    // 즐겨찾기 목록 조회
    useEffect(() => {
        const fetchBookmarkedPlaces = async () => {
            try {
                const response = await axiosInstance.get(
                    "/nonestep/book-mark/place-list"
                );
                setBookmarkedPlaces(response.data); // 데이터를 상태에 저장
            } catch (error) {
                // console.error('즐겨찾기 목록 조회 실패:', error);
            }
        };

        fetchBookmarkedPlaces();
    }, []);

    // 해당 장소가 북마크 된 장소인지 확인 ---------------------------
    let isOriginBookmarked = false;

    for (let i = 0; i < bookmarkedPlaces.length; i++) {
        if (
            bookmarkedPlaces[i].placeLatitude === origin?.lat &&
            bookmarkedPlaces[i].placeLongitude === origin?.lng
        ) {
            isOriginBookmarked = true;
            break;
        }

        // console.log(bookmarkedPlaces[i].placeLatitude, bookmarkedPlaces[i].placeLongitude)
        // console.log(origin.lat, origin.lng)
    }

    let isDestinationBookmarked = false;

    for (let i = 0; i < bookmarkedPlaces.length; i++) {
        if (
            bookmarkedPlaces[i].placeLatitude === destination?.lat &&
            bookmarkedPlaces[i].placeLongitude === destination?.lng
        ) {
            isDestinationBookmarked = true;
            break;
        }
    }
    // ------------------------------------------------------

    // 역 정보 조회
    const getStationInfo = useCallback(async (lat, lng) => {
        try {
            const requestData = { latitude: lat, longitude: lng };
            // console.log('now-station 요청 데이터:', requestData);
            const response = await axiosInstance.get(
                `/nonestep/subway/now-station`,
                {
                    params: requestData,
                }
            );
            // console.log('now-station 응답 데이터:', response.data);
            return response.data;
        } catch (error) {
            // console.error('역 정보 조회 실패:', error);
            // console.log('now-station 오류 응답:', error.response?.data);
            throw error;
        }
    }, []);

    // 경로(폴리라인) 저장 함수
    const getPolylinePath = useCallback((data, type) => {
        if (!data || !data.features || data.features.length === 0) {
            return [];
        }

        let startIndex = 0;
        let endIndex = data.features.length;

        if (type === "bike") {
            // 하나의 features 내에서 도보 -> 자전거 보관소, 보관소 -> 목적지 배열이 이어진 형태
            // lineIndex : 0 - lineIndex : n / lineIndex : 0 - lineIndex : n 구조임
            // 두 번째 lineIndex: 0을 찾아 자전거 경로의 시작점으로 설정
            startIndex = data.features.findIndex(
                (feature, index) =>
                    index > 0 && feature.properties.lineIndex === 0
            );
            if (startIndex === -1) startIndex = 0; // 못 찾으면 전체를 자전거 경로로 간주
        } else if (type === "walk") {
            // 두 번째 lineIndex: 0 전까지를 도보 경로로 설정
            endIndex = data.features.findIndex(
                (feature, index) =>
                    index > 0 && feature.properties.lineIndex === 0
            );
            if (endIndex === -1) endIndex = data.features.length; // 못 찾으면 전체를 도보 경로로 간주
        }

        return data.features
            .slice(startIndex, endIndex)
            .reduce((acc, feature) => {
                const coordinates = feature.geometry?.coordinates || [];
                const transformedCoordinates = coordinates.map((coord) => ({
                    lat: coord[1],
                    lng: coord[0],
                }));
                return acc.concat(transformedCoordinates);
            }, []);
    }, []);

    // 1. 버튼 위치용 화면 크기 측정
    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 1. 사용자 실시간 위치 추적
    const getAddressFromCoords = (lat, lng) => {
        return new Promise((resolve, reject) => {
            const geocoder = new kakao.maps.services.Geocoder();

            geocoder.coord2Address(lng, lat, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const address = result[0].address.address_name;
                    resolve(address);
                } else {
                    reject(new Error("주소를 찾을 수 없습니다."));
                }
            });
        });
    };

    const watchUserPosition = useCallback(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    try {
                        const address = await getAddressFromCoords(lat, lng);
                        const newLocation = { lat, lng, address };
                        setUserLocation(newLocation);
                        if (isTracking) {
                            setCenter(newLocation);
                            setShowUserLocationOverlay(true);
                        }
                    } catch (error) {
                        console.error("주소 변환 실패:", error);
                        // 주소 변환에 실패해도 위치 정보 저장하기
                        setUserLocation({ lat, lng, address: "주소 불명" });
                    }
                },
                (error) => {
                    console.error("위치 추적 오류:", error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: TIMEOUT_DURATION,
                    maximumAge: 3 * 60 * 1000,
                }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [isTracking]);

    useEffect(() => {
        const stopWatching = watchUserPosition();
        return stopWatching;
    }, [watchUserPosition]);

    // 7. 사용자가 지도 이동시 상태 업데이트
    const handleCenterChanged = useCallback(
        (map) => {
            setMapLevel(map.getLevel());
            if (isTracking) {
                setIsTracking(false);
            }
        },
        [isTracking]
    );

    // 8. 지도 리로드 (지도의 중심좌표를 사용자의 현재 위치로 / 다른 오버레이를 숨김)
    const handleReloadLocation = useCallback(() => {
        if (!navigator.geolocation) {
            handleLocationError(); // 위치 정보 사용 불가능한 경우
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (userLocation) {
                    setCenter(userLocation);
                    setMapLevel(DEFAULT_LEVEL);
                    setIsTracking(true);
                    setShowUserLocationOverlay(true);
                    setShowOriginOverlay(false);
                    setShowDestinationOverlay(false);
                } else {
                    handleLocationError(); // 위치 정보는 있지만 userLocation이 없는 경우
                }
            },
            (error) => {
                console.error("위치 정보 가져오기 실패:", error);
                handleLocationError(); // 위치 정보 가져오기 실패한 경우
            }
        );
    }, [userLocation]);
    // 날씨 : 침수 여부 확인 API -----
    // 10.26. checkFlooding 함수 수정 - 침수 여부를 반환만 하고 상태 업데이트는 하지 않음
    const checkFlooding = useCallback(
        (lat, lng, locationType) => {
            return getStationInfo(lat, lng)
                .then((stationInfo) => {
                    const { region, line, station } = stationInfo;
                    return axiosInstance.get(
                        `/nonestep/subway/flooding?region=${region}&line=${line}&station=${station}`
                    );
                })
                .then((response) => {
                    const isFlooded = response.data.isFlooding === "y";
                    setFloodingStatus((prev) => ({
                        ...prev,
                        [locationType]: isFlooded,
                    }));
                    return isFlooded;
                })
                .catch((error) => {
                    console.error("침수 여부 확인 실패:", error);
                    return false;
                });
        },
        [getStationInfo]
    );

    // 현재 위치 침수 여부 확인
    useEffect(() => {
        if (userLocation) {
            checkFlooding(userLocation.lat, userLocation.lng, "userLocation");
        }
    }, [userLocation, checkFlooding]);

    useEffect(() => {
        if (origin) {
            checkFlooding(origin.lat, origin.lng, "origin");
        } else {
            // 출발지가 삭제되면 해당 침수 상태도 초기화
            setFloodingStatus((prev) => ({ ...prev, origin: false }));
        }
    }, [origin, checkFlooding]);

    useEffect(() => {
        if (destination) {
            checkFlooding(destination.lat, destination.lng, "destination");
        } else {
            // 목적지가 삭제되면 해당 침수 상태도 초기화
            setFloodingStatus((prev) => ({ ...prev, destination: false }));
        }
    }, [destination, checkFlooding]);

    // 초단기 날씨 조회 ---------------------------------------------------

    // fetchWeather 함수 수정 - 위경도 직접 전달
    const fetchWeather = useCallback((latitude, longitude) => {
        return axiosInstance
            .post("/nonestep/weather/current-weather", {
                latitude: latitude,
                longitude: longitude,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                handleWeatherError(); // 날씨 오류 모달 표시
                throw error;
            });
    }, []);

    const updateWeather = useCallback(
        (location) => {
            if (!location || !location.lat || !location.lng) {
                return;
            }

            fetchWeather(location.lat, location.lng)
                .then((data) => {
                    setWeatherData(data);
                })
                .catch((error) => {
                    console.error("날씨 데이터 가져오기 오류:", error);
                });
        },
        [fetchWeather]
    );

    useEffect(() => {
        const locationToUse = destination || origin || userLocation;
        if (locationToUse && locationToUse.address) {
            updateWeather(locationToUse);
        } else {
            console.log("유효한 위치 정보가 없습니다");
        }
    }, [destination, origin, userLocation, updateWeather]);

    const handleSetLocation = useCallback(
        (type, marker) => {
            const newLocation = {
                ...marker,
                name: marker.name || "현재 위치",
                address: marker.address || "현재 위치",
            };

            if (type === "origin") {
                setOrigin(newLocation);
                setOriginInput(newLocation.name);
                updateWeather(newLocation);
                checkFlooding(newLocation.lat, newLocation.lng, "origin");

                if (
                    JSON.stringify(destination) === JSON.stringify(newLocation)
                ) {
                    setDestination(null);
                    setDestinationInput("");
                    // 목적지 제거시 해당 침수 상태도 초기화
                    setFloodingStatus((prev) => ({
                        ...prev,
                        destination: false,
                    }));
                }
            } else {
                setDestination(newLocation);
                setDestinationInput(newLocation.name);
                updateWeather(newLocation);
                checkFlooding(newLocation.lat, newLocation.lng, "destination");

                if (JSON.stringify(origin) === JSON.stringify(newLocation)) {
                    setOrigin(null);
                    setOriginInput("");
                    // 출발지 제거시 해당 침수 상태도 초기화
                    setFloodingStatus((prev) => ({ ...prev, origin: false }));
                }
            }
        },
        [destination, origin, updateWeather, checkFlooding]
    );

    // 2. KakaoMapPlaceSearch 컴포넌트로 받은 출발지 정보 처리
    const handleSelectOrigin = useCallback((place) => {
        const newOrigin = {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
            name: place.place_name,
            address: place.address_name,
            isStation: place.isStation,
        };
        setOrigin(newOrigin);
        setOriginInput(place.place_name);
        setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
        setShowOriginOverlay(true);
        setShowDestinationOverlay(false);
    }, []);

    // 2. KakaoMapPlaceSearch 컴포넌트로 받은 목적지 정보 처리
    const handleSelectDestination = useCallback((place) => {
        const newDestination = {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
            name: place.place_name,
            address: place.address_name,
            isStation: place.isStation,
        };
        setDestination(newDestination);
        setDestinationInput(place.place_name);
        setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
        setShowDestinationOverlay(true);
        setShowOriginOverlay(false);
    }, []);

    // 자전고 보관소 위치 호출 함수
    const getBikeStationLocation = useCallback(async (latitude, longitude) => {
        try {
            const response = await axiosInstance.get(
                `/nonestep/road/bike-marker?latitude=${latitude}&longitude=${longitude}`
            );
            return response.data;
        } catch (error) {
            // console.error('자전거 보관소 위치 조회 실패:', error);
            return null;
        }
    }, []);

    // 3. 경로 계산
    // 3-1.	출발지와 도착지의 지하철역 정보를 가져오기 위해 getStationInfo 함수를 호출(now-station) => 해당 위치의 지하철역 정보 반환(지역, 호선, 역명)
    // 3-2.	반환된 역 정보를 사용해 도보(go-station / go-road / walk), 자전거(seoul-bike / daejeon-bike), 지하철 경로(subway-path) 계산
    // 3-3.	계산된 경로 정보를 바탕으로 routeInfo 객체를 구성하여 상태로 저장
    // 4. 저장 완료 후 FindWayPopup 컴포넌트로 이동 (경로 선택)
    const calculateRoute = useCallback(async () => {
        if (!origin || !destination) return;

        setIsRouteCalculated(false);

        try {
            let walkRouteInfo = { time: 0, distance: 0 };
            let bikeRouteInfo = null;
            let subwayRouteInfo = null;
            let bikeResponse = null;
            let walkResponse = null;

            // 출발지와 도착지의 역 정보를 가져옴
            const originStation = await getStationInfo(origin.lat, origin.lng);
            const destinationStation = await getStationInfo(
                destination.lat,
                destination.lng
            );

            setLoading(true);

            let isStationToStation =
                originStation.station && destinationStation.station;

            try {
                // 도보 경로 계산
                // 출발지가 역이고 목적지가 역이 아닌 경우 -> go-road API 호출
                if (origin.isStation && !destination.isStation) {
                    const requestData = {
                        goLatitude: destination.lat,
                        goLongitude: destination.lng,
                        currentRegion: originStation.region,
                        currentStation: originStation.station,
                    };

                    // console.log('go-road API 호출 데이터:', requestData);
                    walkResponse = await axiosInstance.post(
                        "/nonestep/road/go-road",
                        requestData
                    );
                    // console.log('go-road API 응답 데이터:', walkResponse.data);

                    // 출발지와 목적지 둘 다 역이 아닌 경우 -> walk API 호출
                } else if (!origin.isStation && !destination.isStation) {
                    const requestData = {
                        currentLatitude: origin.lat,
                        currentLongitude: origin.lng,
                        goLatitude: destination.lat,
                        goLongitude: destination.lng,
                    };

                    // console.log('walk API 호출 데이터:', requestData);
                    walkResponse = await axiosInstance.post(
                        "/nonestep/road/walk",
                        requestData
                    );
                    // console.log('walk API 응답 데이터:', walkResponse.data);

                    // 출발지와 목적지 둘 중 하나라도 역인 경우 -> go-station API 호출
                } else {
                    const requestData = {
                        currentLatitude: origin.lat,
                        currentLongitude: origin.lng,
                        goRegion: destinationStation.region,
                        goStation: destinationStation.station,
                    };

                    // console.log('go-station API 호출 데이터:', requestData);
                    // console.log('go-station API 호출 destinationStation.station:', requestData);

                    walkResponse = await axiosInstance.post(
                        "/nonestep/road/go-station",
                        requestData
                    );
                    // console.log('go-station API 응답 데이터:', walkResponse.data);
                }

                // 도보 경로 API 응답 처리
                if (walkResponse?.data?.features) {
                    walkRouteInfo = walkResponse.data.features.reduce(
                        (acc, feature) => {
                            acc.time += feature.properties.time || 0;
                            acc.distance += feature.properties.distance || 0;
                            return acc;
                        },
                        { time: 0, distance: 0 }
                    );
                }
                // 최종 도보 경로 정보 처리
                setRouteInfo((prevRouteInfo) => ({
                    ...prevRouteInfo,
                    walkTime: formatTime(Math.round(walkRouteInfo.time / 60)),
                    walkDistance: formatDistance(walkRouteInfo.distance),
                }));
            } catch (error) {
                console.error("도보 경로 계산 중 오류 발생:", error);
                walkRouteInfo = {
                    time: 0,
                    distance: 0,
                    isOverDistance: false,
                    message: "도보 경로를 계산할 수 없습니다.",
                };
            }

            // 자전거 경로 계산
            try {
                if (!walkRouteInfo.isOverDistance) {
                    if (
                        originStation.region === "수도권" ||
                        originStation.region === "대전"
                    ) {
                        const bikeApiEndpoint =
                            originStation.region === "수도권"
                                ? "/nonestep/road/seoul-bike"
                                : "/nonestep/road/daejeon-bike";
                        const bikeRequestData = {
                            currentLatitude: origin.lat,
                            currentLongitude: origin.lng,
                            goLatitude: destination.lat,
                            goLongitude: destination.lng,
                        };

                        // console.log('자전거 경로 요청 데이터:', bikeRequestData);
                        bikeResponse = await axiosInstance.post(
                            bikeApiEndpoint,
                            bikeRequestData
                        );
                        // console.log('자전거 경로 응답 데이터:', bikeResponse.data);

                        if (bikeResponse.status !== 200) {
                            throw new Error(
                                `자전거 경로 API 요청 실패: ${bikeResponse.statusText}`
                            );
                        }

                        if (
                            bikeResponse.data &&
                            bikeResponse.data.features &&
                            bikeResponse.data.features.length > 0
                        ) {
                            // 자전거 보관소 위치 조회
                            const bikeStationLocation =
                                await getBikeStationLocation(
                                    origin.lat,
                                    origin.lng
                                );

                            if (bikeStationLocation) {
                                // 도보 부분과 자전거 부분을 구분
                                const walkIndex =
                                    bikeResponse.data.features.findIndex(
                                        (feature) =>
                                            feature.properties.lineIndex === 0
                                    );
                                const bikeIndex =
                                    bikeResponse.data.features.findIndex(
                                        (feature, index) =>
                                            index > walkIndex &&
                                            feature.properties.lineIndex === 0
                                    );

                                const walkToBikeFeature = {
                                    properties: {
                                        time: 0,
                                        distance: 0,
                                    },
                                };
                                const bikeToDestionationFeature = {
                                    properties: {
                                        time: 0,
                                        distance: 0,
                                    },
                                };

                                // 도보 부분 계산
                                for (let i = 0; i < bikeIndex; i++) {
                                    walkToBikeFeature.properties.time +=
                                        bikeResponse.data.features[i].properties
                                            .time || 0;
                                    walkToBikeFeature.properties.distance +=
                                        bikeResponse.data.features[i].properties
                                            .distance || 0;
                                }

                                // 자전거 부분 계산
                                for (
                                    let i = bikeIndex;
                                    i < bikeResponse.data.features.length;
                                    i++
                                ) {
                                    bikeToDestionationFeature.properties.time +=
                                        bikeResponse.data.features[i].properties
                                            .time / 4 || 0;
                                    bikeToDestionationFeature.properties.distance +=
                                        bikeResponse.data.features[i].properties
                                            .distance || 0;
                                }

                                // 총 시간과 총 거리 계산
                                const totalTime =
                                    walkToBikeFeature.properties.time +
                                    bikeToDestionationFeature.properties.time;
                                const totalDistance =
                                    walkToBikeFeature.properties.distance +
                                    bikeToDestionationFeature.properties
                                        .distance;

                                bikeRouteInfo = {
                                    bikeStation: {
                                        lat: bikeStationLocation.latitude,
                                        lng: bikeStationLocation.longitude,
                                    },
                                    walkTime: walkToBikeFeature.properties.time,
                                    walkDistance:
                                        walkToBikeFeature.properties.distance,
                                    bikeTime:
                                        bikeToDestionationFeature.properties
                                            .time,
                                    bikeDistance:
                                        bikeToDestionationFeature.properties
                                            .distance,
                                    totalTime: totalTime,
                                    totalDistance: totalDistance,
                                    message: `출발지에서 ${formatDistance(
                                        walkToBikeFeature.properties.distance
                                    )} 걸어서 자전거 보관소로 이동 후, ${formatDistance(
                                        bikeToDestionationFeature.properties
                                            .distance
                                    )} 자전거 이용`,
                                };
                            } else {
                                bikeRouteInfo = {
                                    bikeStation: null,
                                    walkTime: 0,
                                    walkDistance: 0,
                                    bikeTime: 0,
                                    bikeDistance: 0,
                                    totalTime: 0,
                                    totalDistance: 0,
                                    message:
                                        "가까운 거리에 이용 가능한 자전거 보관소가 없습니다.",
                                };
                            }
                        } else {
                            throw new Error(
                                "가까운 거리에 이용 가능한 자전거 보관소가 없습니다."
                            );
                        }
                    }
                }
            } catch (error) {
                console.error("자전거 경로 계산 중 오류 발생:", error);
                bikeRouteInfo = {
                    bikeStation: null,
                    walkTime: 0,
                    walkDistance: 0,
                    bikeTime: 0,
                    bikeDistance: 0,
                    totalTime: 0,
                    totalDistance: 0,
                    message: "자전거 경로를 조회할 수 없습니다.",
                };
            }

            try {
                // 지하철 경로 계산
                const subwayRequestData = {
                    region: originStation.region,
                    startLine: originStation.line,
                    startStation: originStation.station,
                    endLine: destinationStation.line,
                    endStation: destinationStation.station,
                };
                // console.log('지하철 경로 요청 데이터:', subwayRequestData);
                const subwayResponse = await axiosInstance.post(
                    "/nonestep/road/subway-path",
                    subwayRequestData
                );
                // console.log('지하철 경로 응답 데이터:', subwayResponse.data);

                if (subwayResponse.data && subwayResponse.data.result) {
                    subwayRouteInfo = subwayResponse.data.result;
                }
            } catch (error) {
                console.error("지하철 경로 계산 중 오류 발생:", error);
                subwayRouteInfo = {
                    globalTravelTime: 0,
                    globalDistance: 0,
                    message: "지하철 경로를 조회할 수 없습니다.",
                };
            }

            // 최종 경로 정보를 routeInfo 객체에 저장
            const routeInfo = {
                bikeStation: bikeRouteInfo ? bikeRouteInfo.bikeStation : null, // 자전거 보관소 위치 (마커용)

                // 도보 경로
                walkTime: formatTime(Math.round(walkRouteInfo.time / 60)), // 도보 경로의 총 소요 시간
                walkDistance: formatDistance(walkRouteInfo.distance), // 도보 경로의 총 거리
                isOverDistance: walkRouteInfo.isOverDistance,

                // 도보 + 자전거 경로
                bikeWalkTime: bikeRouteInfo
                    ? formatTime(Math.round(bikeRouteInfo.walkTime / 60))
                    : "0분", // 1. 출발지 -> 자전거 보관소(도보) 소요 시간(분)
                bikeWalkDistance: bikeRouteInfo
                    ? formatDistance(bikeRouteInfo.walkDistance)
                    : "0m", // 1. 출발지 -> 자전거 보관소(도보) 거리(m,km)
                bikeRideTime: bikeRouteInfo
                    ? formatTime(Math.round(bikeRouteInfo.bikeTime / 60))
                    : "0분", // 2. 자전거 보관소 -> 목적지(자전거) 소요 시간(분)
                bikeRideDistance: bikeRouteInfo
                    ? formatDistance(bikeRouteInfo.bikeDistance)
                    : "0m", // 2. 자전거 보관소 -> 목적지(자전거) 거리(m,km)
                bikeTotalTime: bikeRouteInfo
                    ? formatTime(Math.round(bikeRouteInfo.totalTime / 60))
                    : "0분", // 1+2의 총 소요 시간
                bikeTotalDistance: bikeRouteInfo
                    ? formatDistance(bikeRouteInfo.totalDistance)
                    : "0m", // 1+2의 총 거리
                bikeMessage: bikeRouteInfo
                    ? bikeRouteInfo.message
                    : "자전거 경로를 이용할 수 없습니다.", // 경로 설명 및 자전거 보관소 없음 메시지

                // 지하철 경로
                subwayRoute: subwayRouteInfo, // 지하철 경로 정보 전체 (API 응답에서 받은 데이터)
                subwayTime: subwayRouteInfo
                    ? formatTime(subwayRouteInfo.globalTravelTime)
                    : "0분", // 지하철 경로의 총 소요 시간 (응답 데이터 기본 단위 : 분)
                subwayDistance: subwayRouteInfo
                    ? formatDistance(subwayRouteInfo.globalDistance * 1000)
                    : "0m", // 지하철 경로의 총 거리 (응답 데이터 기본 단위 : km)
                isStationToStation: isStationToStation,
            };

            // console.log('routeInfo 데이터 : ', routeInfo);
            // console.log('bikeRouteInfo 데이터 : ', bikeRouteInfo);
            // console.log('자전거 보관소 위치: ', routeInfo.bikeStation);

            // 경로 정보와 상태 업데이트
            setRouteInfo(routeInfo);
            const walkData = walkRouteInfo.isOverDistance
                ? null
                : walkResponse?.data || null;
            const bikeData = bikeResponse?.data || null;

            setRouteData({
                walk: walkData,
                bike: bikeData,
            });

            setIsRouteCalculated(true);
            setShowRoutePopup(true);
            setLoading(false);
        } catch (error) {
            // console.error('경로 계산 중 오류 발생:', error);
            alert("경로를 계산하는 데 실패했습니다.");
        }
    }, [
        origin,
        destination,
        getStationInfo,
        formatTime,
        formatDistance,
        getBikeStationLocation,
    ]);

    useEffect(() => {
        if (origin && destination) {
            calculateRoute();
        }
    }, [origin, destination, calculateRoute]);

    // 5. 경로 탐색 모드 (인포윈도우 감추기)
    const handleStartNavigation = useCallback(() => {
        setShowRoutePopup(false);
        setIsNavigating(true);
        setShowOriginOverlay(false);
        setShowDestinationOverlay(false);
    }, []);

    useEffect(() => {
        if (showRoutePopup) {
            setShowUserLocationOverlay(false);
            setShowOriginOverlay(false);
            setShowDestinationOverlay(false);
        }
    }, [showRoutePopup]);

    // 7. 마커 클릭 핸들러 (각 마커 클릭시 인포윈도우 온오프)
    const handleMarkerClick = useCallback(
        (type) => {
            if (isNavigating) return;

            setShowUserLocationOverlay(false);
            setShowOriginOverlay(false);
            setShowDestinationOverlay(false);
            setShowBikeStationOverlay(false);

            switch (type) {
                case "userLocation":
                    setShowUserLocationOverlay((prev) => !prev);
                    setCenter(userLocation);
                    break;
                case "origin":
                    setShowOriginOverlay(true);
                    break;
                case "destination":
                    setShowDestinationOverlay(true);
                    break;
                case "bikeStation":
                    setShowBikeStationOverlay(true);
                    break;
                case "bookmark":
                    handleBookmarkClick(placeName);
                    break;
                default:
                    break;
            }
        },
        [isNavigating, userLocation, setCenter]
    );

    return (
        <>
            <PageHeader />
            <PageWrapper>
                <KakaoMapPlaceSearch
                    onSelectOrigin={handleSelectOrigin}
                    onSelectDestination={handleSelectDestination}
                    originName={originInput}
                    destinationName={destinationInput}
                    setOriginName={setOriginInput}
                    setDestinationName={setDestinationInput}
                    bookmarkedPlaces={bookmarkedPlaces}
                    pathOrigin={pathOrigin}
                    pathDestination={pathDestination}
                />

                {/* 빠른 경로 버튼 */}
                {!isNavigating && <QuickRoute userLocation={userLocation} />}
                <BookmarkPathBtn
                    isQuickRouteVisible={!isNavigating}
                    onPathOrigin={handlePathOrigin}
                    onPathDestination={handlePathDestination}
                />

                <Map
                    center={center}
                    style={{
                        width: "100%",
                        height: "100vh",
                    }}
                    level={mapLevel}
                    onCenterChanged={handleCenterChanged}
                >
                    {/* 사용자 위치 마커 및 오버레이 */}
                    {userLocation &&
                        (!origin ||
                            origin.lat !== userLocation.lat ||
                            origin.lng !== userLocation.lng) && (
                            <>
                                <MapMarker
                                    position={userLocation}
                                    onClick={() =>
                                        handleMarkerClick("userLocation")
                                    }
                                />
                                {showUserLocationOverlay &&
                                    !origin &&
                                    !destination &&
                                    !isNavigating && (
                                        <CustomOverlayMap
                                            position={userLocation}
                                            yAnchor={
                                                floodingStatus.userLocation
                                                    ? 1.4
                                                    : 1.62
                                            }
                                        >
                                            <CustomOverlay>
                                                <StationName>
                                                    현재 위치
                                                </StationName>
                                                {floodingStatus.userLocation && (
                                                    <InfoWrapper>
                                                        <Warning>
                                                            <img
                                                                src={
                                                                    WarningIcon
                                                                }
                                                                alt="경고"
                                                            />
                                                            침수 주의
                                                        </Warning>
                                                    </InfoWrapper>
                                                )}
                                                <UserLocationStart
                                                    onClick={() =>
                                                        handleSetLocation(
                                                            "origin",
                                                            userLocation
                                                        )
                                                    }
                                                >
                                                    출발지로 설정하기
                                                </UserLocationStart>
                                            </CustomOverlay>
                                        </CustomOverlayMap>
                                    )}
                            </>
                        )}

                    {/* 출발지 마커 */}
                    {origin && (
                        <>
                            <MapMarker
                                position={origin}
                                onClick={() => handleMarkerClick("origin")}
                                image={{
                                    src: OriginMarker,
                                    size: {
                                        width: 50,
                                        height: 65,
                                    },
                                }}
                            />
                            {origin && showOriginOverlay && (
                                <CustomOverlayMap
                                    position={origin}
                                    yAnchor={floodingStatus.origin ? 1.4 : 1.65}
                                >
                                    <CustomOverlay>
                                        <BookmarkBtn
                                            onClick={() =>
                                                handleBookmarkClick(
                                                    origin.name,
                                                    origin.address,
                                                    origin.lat,
                                                    origin.lng
                                                )
                                            }
                                        >
                                            <BookmarkIcon
                                                src={
                                                    isOriginBookmarked
                                                        ? yellowStar
                                                        : emptyStar
                                                }
                                                alt="북마크 아이콘"
                                            />
                                            <BookmarkSpan
                                                color={
                                                    isOriginBookmarked
                                                        ? "#007AFF"
                                                        : "#8E8E93"
                                                }
                                            >
                                                즐겨찾기
                                            </BookmarkSpan>
                                        </BookmarkBtn>
                                        <StationName>{origin.name}</StationName>
                                        <StationAddress>
                                            {origin.address}
                                        </StationAddress>
                                        {floodingStatus.origin && (
                                            <InfoWrapper>
                                                <Warning>
                                                    <img
                                                        src={WarningIcon}
                                                        alt="경고"
                                                    />
                                                    침수 주의
                                                </Warning>
                                            </InfoWrapper>
                                        )}
                                        <ButtonContainer>
                                            <Button
                                                onClick={() =>
                                                    handleSetLocation(
                                                        "origin",
                                                        origin
                                                    )
                                                }
                                            >
                                                출발
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleSetLocation(
                                                        "destination",
                                                        origin
                                                    )
                                                }
                                            >
                                                도착
                                            </Button>
                                        </ButtonContainer>
                                    </CustomOverlay>
                                </CustomOverlayMap>
                            )}
                        </>
                    )}

                    {/* 북마크 모달 */}
                    {isBookmarked && (
                        <>
                            <BookmarkModal
                                onClick={handleBookmarkClick}
                                placeName={bookmarkPlaceName}
                                placeAddress={bookmarkPlaceAddress}
                                lat={bookmarkLat}
                                lng={bookmarkLng}
                            />
                        </>
                    )}

                    {/* 도착지 마커 */}
                    {destination && (
                        <>
                            <MapMarker
                                position={destination}
                                onClick={() => handleMarkerClick("destination")}
                                image={{
                                    src: DestinationMarker,
                                    size: {
                                        width: 50,
                                        height: 65,
                                    },
                                }}
                            />
                            {destination && showDestinationOverlay && (
                                <CustomOverlayMap
                                    position={destination}
                                    yAnchor={
                                        floodingStatus.destination ? 1.4 : 1.62
                                    }
                                >
                                    <CustomOverlay>
                                        <BookmarkBtn
                                            onClick={() =>
                                                handleBookmarkClick(
                                                    destination.name,
                                                    destination.address,
                                                    destination.lat,
                                                    destination.lng
                                                )
                                            }
                                        >
                                            <BookmarkIcon
                                                src={
                                                    isDestinationBookmarked
                                                        ? yellowStar
                                                        : emptyStar
                                                }
                                                alt="북마크 아이콘"
                                            />
                                            <BookmarkSpan
                                                color={
                                                    isDestinationBookmarked
                                                        ? "#007AFF"
                                                        : "#8E8E93"
                                                }
                                            >
                                                즐겨찾기
                                            </BookmarkSpan>
                                        </BookmarkBtn>
                                        <StationName>
                                            {destination.name}
                                        </StationName>
                                        <StationAddress>
                                            {destination.address}
                                        </StationAddress>
                                        {floodingStatus.destination && (
                                            <InfoWrapper>
                                                <Warning>
                                                    <img
                                                        src={WarningIcon}
                                                        alt="경고"
                                                    />
                                                    침수 주의
                                                </Warning>
                                            </InfoWrapper>
                                        )}
                                        <ButtonContainer>
                                            <Button
                                                onClick={() =>
                                                    handleSetLocation(
                                                        "origin",
                                                        destination
                                                    )
                                                }
                                            >
                                                출발
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleSetLocation(
                                                        "destination",
                                                        destination
                                                    )
                                                }
                                            >
                                                도착
                                            </Button>
                                        </ButtonContainer>
                                    </CustomOverlay>
                                </CustomOverlayMap>
                            )}
                        </>
                    )}

                    {/* 경로 렌더링 */}
                    {isRouteCalculated && routeData && (
                        <>
                            {/* 도보 경로 (파란색) */}
                            {selectedRoute === "walk" && routeData.walk && (
                                <Polyline
                                    path={getPolylinePath(
                                        routeData.walk,
                                        "walk"
                                    )}
                                    strokeWeight={5}
                                    strokeColor={"#007AFF"}
                                    strokeOpacity={0.7}
                                    strokeStyle={"solid"}
                                />
                            )}

                            {/* 도보 + 자전거 경로 */}
                            {selectedRoute === "bike" && routeData.bike && (
                                <>
                                    {/* 도보 부분 (파란색) */}
                                    <Polyline
                                        path={getPolylinePath(
                                            routeData.bike,
                                            "walk"
                                        )}
                                        strokeWeight={5}
                                        strokeColor={"#007AFF"}
                                        strokeOpacity={0.7}
                                        strokeStyle={"solid"}
                                    />
                                    {/* 자전거 부분 (초록색) */}
                                    <Polyline
                                        path={getPolylinePath(
                                            routeData.bike,
                                            "bike"
                                        )}
                                        strokeWeight={5}
                                        strokeColor={"#00FF00"}
                                        strokeOpacity={0.7}
                                        strokeStyle={"solid"}
                                    />
                                </>
                            )}
                        </>
                    )}

                    {/* 자전거 보관소 마커 */}
                    {routeInfo?.bikeStation && selectedRoute === "bike" && (
                        <>
                            <MapMarker
                                position={routeInfo.bikeStation}
                                onClick={() => handleMarkerClick("bikeStation")}
                                image={{
                                    src: BicycleMarker,
                                    size: {
                                        width: 50,
                                        height: 65,
                                    },
                                }}
                            />
                            {routeInfo?.bikeStation &&
                                showBikeStationOverlay && (
                                    <CustomOverlayMap
                                        position={routeInfo.bikeStation}
                                        yAnchor={1.75}
                                    >
                                        <CustomOverlay>
                                            <StationName>
                                                자전거 보관소
                                            </StationName>
                                            <ButtonContainer>
                                                <Button
                                                    onClick={() =>
                                                        handleSetLocation(
                                                            "origin",
                                                            routeInfo.bikeStation
                                                        )
                                                    }
                                                >
                                                    출발
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleSetLocation(
                                                            "destination",
                                                            routeInfo.bikeStation
                                                        )
                                                    }
                                                >
                                                    도착
                                                </Button>
                                            </ButtonContainer>
                                        </CustomOverlay>
                                    </CustomOverlayMap>
                                )}
                        </>
                    )}
                </Map>
                <MapItemsWrapper>
                    <MapItemsContainer>
                        {/* 날씨 작은 화면 */}
                        {userLocation && (
                            <WeatherPreview
                                $viewportHeight={viewportHeight}
                                onClick={handleWeatherPopup}
                                weatherData={weatherData}
                            />
                        )}

                        {/* 현재 위치로 이동 버튼 */}
                        <Reload
                            onClick={handleReloadLocation}
                            $viewportHeight={viewportHeight}
                        >
                            <img src={ReloadIcon} alt="현재위치 새로고침" />
                        </Reload>
                    </MapItemsContainer>
                </MapItemsWrapper>

                {/* 로딩 중일 때 스피너 표시 */}
                {loading && <Loading />}

                {/* 경로 정보 팝업 */}
                {showRoutePopup && routeInfo && (
                    <FindWayPopup
                        routeInfo={routeInfo}
                        onClose={() => setShowRoutePopup(false)}
                        // 선택된 경로 타입을 전달
                        onNavigate={(routeType) => {
                            setSelectedRoute(routeType);
                            handleStartNavigation();
                        }}
                        origin={origin ? origin : ""}
                        destination={destination ? destination : ""}
                    />
                )}

                {/* 날씨 상세 정보 팝업 */}
                {isClicked && weatherData && (
                    <WeatherPopup
                        isFlooding={
                            destination
                                ? floodingStatus.destination
                                : origin
                                ? floodingStatus.origin
                                : floodingStatus.userLocation
                        }
                        onClose={handleWeatherPopup}
                        weatherData={weatherData}
                        placeName={
                            destination
                                ? destination.name
                                : origin
                                ? origin.name
                                : userLocation
                                ? userLocation.name
                                : "현재 위치"
                        }
                    />
                )}

                {/* 날씨 데이터를 불러올 수 없을 때 or 현재 위치 정보가 없을 때 팝업 표시 */}
                {isModalVisible && (
                    <WeatherErrorModal
                        onClose={handleCloseModal}
                        title={
                            modalType === "locationError"
                                ? "위치 정보"
                                : "날씨 정보"
                        }
                        message={
                            modalType === "locationError"
                                ? `현재 위치를 불러올 수 없습니다.\n위치 정보 접근을 허용해주세요.`
                                : "날씨 정보를 조회하는 데 실패했습니다."
                        }
                    />
                )}
            </PageWrapper>
            <MenuBar />
        </>
    );
};

export default FindWay;
