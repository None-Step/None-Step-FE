import { MainHeader } from "@components/header/Headers";
import {
    CategoryArrowLeft,
    CategoryArrowRight,
    CategoryBtn,
    CategoryContainer,
    CategoryWrapper,
    ChatBtn,
    ChatContainer,
    ChatWrapper,
    FooterContainer,
    FooterWrapper,
    MainSection,
    MainWrapper,
    NoticeWrapper,
    SpinnerBlue,
    WeatherAddress,
    WeatherContainer,
    WeatherRefreshBtn,
    WeatherTitle,
    WeatherWrapper,
} from "./MainPage.styles";
import MenuBar from "@components/menuBar/MenuBar";
import LocationTracker from "@components/location/LocationTracker";
import mainBanner from "@assets/img/main-banner.png";
import mainBanner2 from "@assets/img/mainBanner2.png";
import mainBanner3 from "@assets/img/mainBanner3.png";
import mainBanner4 from "@assets/img/mainBanner4.png";
import play from "@assets/img/play.svg";
import pause from "@assets/img/pause.svg";
import congestionIcon from "@assets/icons/congestion-main-icon.svg";
import elevatorIcon from "@assets/icons/elevator-icon.svg";
import escalatorIcon from "@assets/icons/escalator-icon.svg";
import wheelchairLiftIcon from "@assets/icons/wheelchair-lift-icon.svg";
import toiletIcon from "@assets/icons/toilet-icon.svg";
import difToiletIcon from "@assets/icons/dif-toilet-icon.svg";
import nursingRoomIcon from "@assets/icons/nursing-room-icon.svg";
import atmIcon from "@assets/icons/atm-icon.svg";
import aedIcon from "@assets/icons/aed-icon.svg";
import wheelchairChargerIcon from "@assets/icons/wheelchair-charger-icon.svg";
import customerServiceIcon from "@assets/icons/customer-service-icon.svg";
import sunnyIcon from "./icons/sunny.svg";
import cloudyIcon from "./icons/cloudy.svg";
import lightningIcon from "./icons/lightning.svg";
import littleCloudyIcon from "./icons/little-cloudy.svg";
import snowRainyIcon from "./icons/snow-rainy.svg";
import snowWindyIcon from "./icons/snow-windy.svg";
import snowyIcon from "./icons/snowy.svg";
import rainyIcon from "./icons/rainy.svg";
import raindropIcon from "./icons/raindrop.svg";
import seoulMetroIcon from "@assets/icons/seoul-metro-logo.svg";
import busanMetroIcon from "@assets/icons/busan-transp-corp-logo.svg";
import daejeonMetroIcon from "@assets/icons/daejeon-transp-corp-logo.svg";
import daeguMetroIcon from "@assets/icons/daegu-transp-corp-logo.svg";
import gwangjuMetroIcon from "@assets/icons/gwangju-transp-corp-logo.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedCategory } from "@store/slices/categorySlice";
import { fetchUserInfo } from "@hooks/auth";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import axiosInstance from "@apis/axiosInstance";
import spinnerBlueIcon from "@assets/img/spinner-blue.png";

const MainPage = () => {
    const [noticeTitle, setNoticeTitle] = useState("");
    const [isScrollLeft, setIsScrollLeft] = useState(false);
    const [isScrollRight, setIsScrollRight] = useState(true);
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
    });
    const [locationAddress, setLocationAddress] = useState("");
    const [sky, setSky] = useState(null);
    const [rainy, setRainy] = useState(null);
    const [precipitation, setPrecipitation] = useState(null);
    const [windy, setWindy] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [isLocation, setIsLocation] = useState(null);
    const [isWeather, setIsWeather] = useState(null);

    // 메인 배너 추가 부분
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const banners = [
        { src: mainBanner, alt: "main-banner-01" },
        { src: mainBanner2, alt: "main-banner-02" },
        { src: mainBanner3, alt: "main-banner-03" },
        { src: mainBanner4, alt: "main-banner-04" },
    ];
    // 메인 배너 추가 부분 끝

    const scrollRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 메인 배너 타이머
    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                setCurrentBanner((prev) => (prev + 1) % banners.length);
            }, 5000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, banners.length]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    // 메인 배너 타이머 끝

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (accessToken) {
            fetchUserInfo(dispatch).catch((error) => {
                console.error("MainPage: 사용자 정보 가져오기 실패:", error);
            });
        }

        dispatch(selectedCategory({ category: "", region: "" }));

        axiosInstance
            .get("/nonestep/board/main-notice")
            .then((response) => {
                setNoticeTitle(response.data.boardTitle);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getLocation();
    }, [location.lat, location.lng]);

    const getLocation = () => {
        const geoSuccess = (position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setIsLocation(true);
        };

        const geoError = () => {
            setIsLocation(false);
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

        if (location.lat && location.lng) {
            axiosInstance
                .post("/nonestep/weather/current-weather", {
                    latitude: location.lat,
                    longitude: location.lng,
                })
                .then((response) => {
                    const weatherData = response.data
                        .filter((_, index) => index % 3 === 0)
                        .map((data) => data.fcstValue);

                    setSky(weatherData[0]);
                    setRainy(weatherData[1]);
                    setPrecipitation(weatherData[2]);
                    setWindy(weatherData[4]);
                    setTemperature(weatherData[5]);

                    if (response.status === 200) {
                        setIsWeather(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsWeather(false);
                });

            getAddressFromCoords(location.lat, location.lng);
        }
    };

    const { kakao } = window;

    const getAddressFromCoords = (latitude, longitude) => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const address = result.find(
                    (region) => region.region_type === "H"
                );

                if (address) {
                    setLocationAddress(
                        `${address.region_2depth_name} ${address.region_3depth_name}`
                    );
                }
            } else {
                console.log("주소 변환 실패:", status);
            }
        });
    };

    const handleClickNotice = () => {
        navigate("/notice");
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

            const { scrollLeft, scrollWidth, clientWidth } = scrollElement;

            setIsScrollLeft(0 < scrollLeft - 30);
            setIsScrollRight(scrollLeft < scrollWidth - clientWidth - 30);

            return () => scrollElement.removeEventListener("wheel", onWheel);
        }
    };

    const handleClickLeft = () => {
        if (600 < window.innerWidth) {
            setIsScrollLeft(false);
            scrollRef.current.scrollTo({
                left:
                    scrollRef.current.scrollLeft -
                    scrollRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const handleClickRight = () => {
        if (600 < window.innerWidth) {
            setIsScrollRight(false);
            scrollRef.current.scrollTo({
                left:
                    scrollRef.current.scrollLeft +
                    scrollRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const handleClickMap = (category) => {
        navigate("/map");
        dispatch(selectedCategory({ category: category }));
    };

    const handleClickRefresh = (e) => {
        if (e.target.tagName === "BUTTON") {
            const child = e.target.querySelector("svg");

            child.classList.add("refresh");

            setTimeout(() => {
                child.classList.remove("refresh");
            }, 1000);
        } else if (e.target.tagName === "svg") {
            e.target.classList.add("refresh");

            setTimeout(() => {
                e.target.classList.remove("refresh");
            }, 1000);
        } else if (e.target.tagName === "path") {
            const parent = e.target.parentNode;

            parent.classList.add("refresh");

            setTimeout(() => {
                parent.classList.remove("refresh");
            }, 1000);
        }

        getLocation();
    };

    const getSkyText = (value) => {
        switch (value) {
            case "1":
                return "맑음";
            case "3":
                return "구름많음";
            case "4":
                return "흐림";
            default:
                return "";
        }
    };

    const getPrecipitationText = (value) => {
        switch (value) {
            case "1":
                return "비";
            case "2":
                return "비/눈";
            case "3":
                return "눈";
            case "5":
                return "빗방울";
            case "6":
                return "빗방울/눈날림";
            case "7":
                return "눈날림";
            default:
                return "";
        }
    };

    const getWeatherIcon = (value) => {
        switch (value) {
            case "맑음":
                return sunnyIcon;
            case "구름많음":
                return littleCloudyIcon;
            case "흐림":
                return cloudyIcon;
            case "비":
                return rainyIcon;
            case "비/눈":
                return snowRainyIcon;
            case "눈":
                return snowyIcon;
            case "빗방울":
                return raindropIcon;
            case "빗방울/눈날림":
                return snowRainyIcon;
            case "눈날림":
                return snowWindyIcon;
            case "낙뢰":
                return lightningIcon;
            default:
                return "";
        }
    };

    const handleClickChat = (region) => {
        navigate(`/chat/${region}`);

        if (region === "capital") {
            dispatch(selectedCategory({ category: "seoul", region: "seoul" }));
        } else {
            dispatch(selectedCategory({ category: region, region: region }));
        }
    };

    const { Kakao } = window;

    const kakaoChatting = () => {
        if (Kakao) {
            if (!Kakao.isInitialized()) {
                Kakao.init(`${import.meta.env.VITE_KAKAO_JS_APP_KEY}`);
            }
        }

        Kakao.Channel.chat({
            channelPublicId: "_muxbhn",
        });
    };

    const handleClickLicense = () => {
        navigate("/license");
    };

    return (
        <>
            <MainHeader />
            <MainWrapper>
                <NoticeWrapper onClick={handleClickNotice}>
                    <HiOutlineSpeakerWave />
                    <p>{noticeTitle}</p>
                </NoticeWrapper>
                <MainSection>
                    <div
                        className="banner-container"
                        style={{
                            transform: `translateX(-${currentBanner * 25}%)`,
                        }}
                    >
                        {banners.map((banner, index) => (
                            <div key={index} className="banner-wrapper">
                                <img
                                    loading={index === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                    src={banner.src}
                                    alt={banner.alt}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="controller">
                        <button
                            className="play-pause-btn"
                            onClick={togglePlayPause}
                        >
                            <img
                                src={isPlaying ? pause : play}
                                alt="play-pause"
                            />
                        </button>
                        <div className="page-indicator">
                            {currentBanner + 1} / {banners.length}
                        </div>
                    </div>
                </MainSection>{" "}
                <CategoryWrapper>
                    <h3>편의시설 바로가기</h3>
                    {isScrollLeft && (
                        <CategoryArrowLeft onClick={handleClickLeft}>
                            <IoIosArrowBack onClick={handleClickLeft} />
                        </CategoryArrowLeft>
                    )}
                    <CategoryContainer
                        ref={scrollRef}
                        onScroll={handleScrollCategory}
                        onWheel={handleScrollCategory}
                    >
                        <li className="congestion">
                            <CategoryBtn
                                onClick={() => handleClickMap("congestion")}
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
                                onClick={() => handleClickMap("elevator")}
                            >
                                <img src={elevatorIcon} alt="elevator-icon" />
                                <span>엘리베이터</span>
                            </CategoryBtn>
                        </li>
                        <li className="escalator">
                            <CategoryBtn
                                onClick={() => handleClickMap("escal")}
                            >
                                <img src={escalatorIcon} alt="escalator-icon" />
                                <span>에스컬레이터</span>
                            </CategoryBtn>
                        </li>
                        <li className="wheelchair_lift">
                            <CategoryBtn onClick={() => handleClickMap("lift")}>
                                <img
                                    src={wheelchairLiftIcon}
                                    alt="wheelchair-lift-icon"
                                />
                                <span>휠체어리프트</span>
                            </CategoryBtn>
                        </li>
                        <li className="toilet">
                            <CategoryBtn
                                onClick={() => handleClickMap("toilet")}
                            >
                                <img src={toiletIcon} alt="toilet-icon" />
                                <span>화장실</span>
                            </CategoryBtn>
                        </li>
                        <li className="dif_toilet">
                            <CategoryBtn
                                onClick={() => handleClickMap("dif-toilet")}
                            >
                                <img
                                    src={difToiletIcon}
                                    alt="dif-toilet-icon"
                                />
                                <span>장애인 화장실</span>
                            </CategoryBtn>
                        </li>
                        <li className="nursing_room">
                            <CategoryBtn
                                onClick={() => handleClickMap("nursing-room")}
                            >
                                <img
                                    src={nursingRoomIcon}
                                    alt="nursing-room-icon"
                                />
                                <span>수유실</span>
                            </CategoryBtn>
                        </li>
                        <li className="atm">
                            <CategoryBtn onClick={() => handleClickMap("atm")}>
                                <img src={atmIcon} alt="atm-icon" />
                                <span>ATM</span>
                            </CategoryBtn>
                        </li>
                        <li className="aed">
                            <CategoryBtn onClick={() => handleClickMap("aed")}>
                                <img src={aedIcon} alt="aed-icon" />
                                <span>제세동기</span>
                            </CategoryBtn>
                        </li>
                        <li className="wheelchair_charger">
                            <CategoryBtn
                                onClick={() => handleClickMap("charger")}
                            >
                                <img
                                    src={wheelchairChargerIcon}
                                    alt="wheelchair-charger-icon"
                                />
                                <span>전동휠체어 충전</span>
                            </CategoryBtn>
                        </li>
                        <li className="customer_service">
                            <CategoryBtn
                                onClick={() => handleClickMap("center")}
                            >
                                <img
                                    src={customerServiceIcon}
                                    alt="customer-service-icon"
                                />
                                <span>고객센터</span>
                            </CategoryBtn>
                        </li>
                    </CategoryContainer>
                    {isScrollRight && (
                        <CategoryArrowRight onClick={handleClickRight}>
                            <IoIosArrowForward />
                        </CategoryArrowRight>
                    )}
                </CategoryWrapper>
                <LocationTracker />
                <WeatherWrapper>
                    <WeatherTitle>
                        <h3>현재 위치 날씨</h3>
                        <WeatherRefreshBtn onClick={handleClickRefresh}>
                            <IoRefresh onClick={handleClickRefresh} />
                        </WeatherRefreshBtn>
                    </WeatherTitle>
                    {isLocation && isWeather && (
                        <WeatherAddress>
                            <FaMapMarkerAlt />
                            <span className="address">{locationAddress}</span>
                        </WeatherAddress>
                    )}
                    <WeatherContainer>
                        {isLocation && isWeather && (
                            <>
                                <div className="location_weather">
                                    <div className="weather_icon">
                                        <img
                                            src={getWeatherIcon(
                                                precipitation !== "0"
                                                    ? getPrecipitationText(
                                                          precipitation
                                                      )
                                                    : getSkyText(sky)
                                            )}
                                            alt="weather_icon"
                                        />
                                        <div className="weather">
                                            <span>
                                                {temperature}
                                                &#186;
                                            </span>
                                            <span>
                                                {precipitation !== "0"
                                                    ? getPrecipitationText(
                                                          precipitation
                                                      )
                                                    : getSkyText(sky)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="weather_info">
                                    <div className="precipitation">
                                        <span>강수량</span>
                                        <span>
                                            {rainy === "강수없음"
                                                ? "강수없음"
                                                : rainy}
                                        </span>
                                    </div>
                                    <div className="wind">
                                        <span>풍속</span>
                                        <span>{windy}m/s</span>
                                    </div>
                                </div>
                            </>
                        )}
                        {(isLocation === false || isWeather === false) && (
                            <div className="no_weather">
                                <p>현재 위치의 날씨를 불러올 수 없습니다.</p>
                            </div>
                        )}
                        {isLocation == null && isWeather == null && (
                            <div className="no_weather">
                                <SpinnerBlue
                                    src={spinnerBlueIcon}
                                    alt="loading_icon"
                                />
                            </div>
                        )}
                    </WeatherContainer>
                </WeatherWrapper>
                <ChatWrapper>
                    <h3>채팅 바로가기</h3>
                    <ChatContainer>
                        <li className="capital_chat">
                            <ChatBtn onClick={() => handleClickChat("capital")}>
                                <span>수도권</span>
                                <img
                                    src={seoulMetroIcon}
                                    alt="seoul-metro-icon"
                                />
                            </ChatBtn>
                        </li>
                        <li className="busan_chat">
                            <ChatBtn onClick={() => handleClickChat("busan")}>
                                <span>부산</span>
                                <img
                                    src={busanMetroIcon}
                                    alt="busan-metro-icon"
                                />
                            </ChatBtn>
                        </li>
                        <li className="daejeon_chat">
                            <ChatBtn onClick={() => handleClickChat("daejeon")}>
                                <span>대전</span>
                                <img
                                    src={daejeonMetroIcon}
                                    alt="daejeon-metro-icon"
                                />
                            </ChatBtn>
                        </li>
                        <li className="daegu_chat">
                            <ChatBtn onClick={() => handleClickChat("daegu")}>
                                <span>대구</span>
                                <img
                                    src={daeguMetroIcon}
                                    alt="daegu-metro-icon"
                                />
                            </ChatBtn>
                        </li>
                        <li className="gwangju_chat">
                            <ChatBtn onClick={() => handleClickChat("gwangju")}>
                                <span>광주</span>
                                <img
                                    src={gwangjuMetroIcon}
                                    alt="gwangju-metro-icon"
                                />
                            </ChatBtn>
                        </li>
                    </ChatContainer>
                </ChatWrapper>
                <FooterWrapper>
                    <FooterContainer>
                        <p className="qna">
                            <span>문의하기</span>
                            <span onClick={kakaoChatting}>
                                카카오톡 1:1 채팅
                            </span>
                        </p>
                        <p className="license">
                            <span>라이선스</span>
                            <span onClick={handleClickLicense}>
                                오픈소스 라이선스
                            </span>
                        </p>
                        <p>&#169;이번역 All Rights Reserved.</p>
                    </FooterContainer>
                </FooterWrapper>
            </MainWrapper>
            <MenuBar />
        </>
    );
};

export default MainPage;
