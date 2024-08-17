import React, { useState, useEffect, useCallback } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom';
import MenuBar from '@/components/menuBar/MenuBar';
import { PageHeader } from '@/components/header/Headers';
import { 
  PageWrapper,
  CustomOverlay,
  StationName,
  StationAddress,
  Confirm,
  Reload,
  SearchBox,
  LoadingMessage,
} from './FindWay.style';
import KakaoMapPlaceSearch from './KakaoMapPlaceSearch';
import ReloadIcon from '@/assets/img/current.svg'
import QuickRoute from './QuickRoute';

const TIMEOUT_DURATION = 20000; // 20초
const DEFAULT_CENTER = { lat: 37.56682420267543, lng: 126.978652258823 };

const FindWay = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [mapLevel, setMapLevel] = useState(3);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight); // 뷰포트 길이(위치 새로고침 버튼 위치 맞추기)
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      // 브라우저가 geolocation API를 지원하는지 확인
      if ("geolocation" in navigator) {
        const geolocationOptions = {
          enableHighAccuracy: true, // 가장 정확한 위치 불러오기
          maximumAge: 0, // 캐시 X 항상 새로운 위치 불러오기
          timeout: TIMEOUT_DURATION
        };
        navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions);
      } else {
        reject(new Error("이 브라우저에서는 위치 정보 기능을 사용할 수 없습니다"));
      }
    });
  }, []);

  // 사용자 위치를 업데이트하는 함수
  const updateUserLocation = useCallback(() => {
    setIsUserLocationLoading(true);
    setStatusMessage('사용자 위치를 불러오는 중...');
  
    getCurrentPosition()
      .then((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newLocation);
        setCenter(newLocation);
        setStatusMessage('');
      })
      .catch((error) => {
        console.error("위치 정보를 가져오는 중 오류 발생:", error.message);
        if (error.code === 1) {
          // 사용자가 위치 정보 제공을 거부한 경우
          setStatusMessage('위치 정보 접근이 거부되었습니다. 설정에서 위치 정보 접근을 허용해주세요.');
        } else if (error.code === 2) {
          // 위치를 가져올 수 없는 경우
          setStatusMessage('위치를 가져올 수 없습니다. 네트워크 연결을 확인해주세요.');
        } else {
          // 기타 오류
          setStatusMessage('위치 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
        // 기본 위치로 설정 (현: 서울시청)
        setCenter({ lat: 37.566535, lng: 126.977969 });
      })
      .finally(() => {
        setIsUserLocationLoading(false);
      });
  }, [getCurrentPosition]);

  // 장소 선택 핸들러(=목적지)
  // 좌표값을 newDestination으로 받고, destination에 저장해서 전달
  const handleSelectPlace = (place) => {
    const newDestination = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name
    };
    setDestination(newDestination);
    setCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setIsOverlayVisible(true);
  };

// 목적지 설정 확인 핸들러
const handleConfirm = () => {
  if (origin && destination) {
    navigate('/findway/route', { 
      state: { 
        origin: origin,
        destination: destination,
        selectedDestination: {
          name: destination.name,
          address: destination.address
        }
      } 
    });
  } else {
    alert('출발지와 목적지를 모두 설정해주세요.');
  }
};

  // 현재 위치 새로고침 핸들러
  const handleReload = () => {
    updateUserLocation();
    setMapLevel(3); // 지도 레벨을 3으로 리셋
  };

  // 지도의 중심이 변경될 때 호출되는 핸들러
  const handleCenterChanged = (map) => {
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng()
    });
    setMapLevel(map.getLevel()); // 현재 지도 레벨 업데이트
  };

  // 카카오맵 스크립트 로드(길찾기 페이지 내부에서만 사용)
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_APP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
        setStatusMessage('');
      });
    });
    script.addEventListener('error', () => {
      setStatusMessage('지도를 불러오는데 실패했습니다.');
    });
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // UI 먼저 렌더링 후 사용자 위치를 업데이트 하기
  useEffect(() => {
    updateUserLocation();
  }, [updateUserLocation]);

  // 지도 로딩 중일 때 보여줄 내용
  if (!mapLoaded) {
    return <LoadingMessage>{statusMessage}</LoadingMessage>;
  }

  /// 출발지 선택 핸들러
  const handleSelectOrigin = (place) => {
    const newOrigin = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name
    };
    setOrigin(newOrigin);
    setCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setIsOverlayVisible(true);  // 오버레이 표시
  };

  // 도착지 선택 핸들러
  const handleSelectDestination = (place) => {
    const newDestination = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name
    };
    setDestination(newDestination);
    setCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setIsOverlayVisible(true);  // 오버레이 표시
  };


  return (
    <PageWrapper>
      <PageHeader />
      <KakaoMapPlaceSearch
        onSelectOrigin={handleSelectOrigin}
        onSelectDestination={handleSelectDestination}
      />
      {userLocation && <QuickRoute userLocation={userLocation} />}
      <Map
        center={center}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={mapLevel}
        onCenterChanged={handleCenterChanged}
      >
        {userLocation && <MapMarker position={userLocation} />}
        {origin && (
          <MapMarker
            position={origin}
            clickable={true}
            onClick={() => setIsOverlayVisible(!isOverlayVisible)}
          />
        )}
        {destination && (
          <MapMarker
            position={destination}
            clickable={true}
            onClick={() => setIsOverlayVisible(!isOverlayVisible)}
          />
        )}
        {isOverlayVisible && (origin || destination) && (
          <CustomOverlayMap
            position={origin || destination}
            yAnchor={1.55}
          >
            <CustomOverlay>
              <StationName>{(origin || destination).name}</StationName>
              <StationAddress>{(origin || destination).address}</StationAddress>
              <Confirm onClick={handleConfirm}>
                {origin ? "출발지로 설정하기" : "목적지로 설정하기"}
              </Confirm>
            </CustomOverlay>
          </CustomOverlayMap>
        )}
        <Reload onClick={handleReload} $viewportHeight={viewportHeight}>
          <img src={ReloadIcon} alt='현재위치 새로고침'/>
        </Reload>
      </Map>
      {statusMessage && <LoadingMessage>{statusMessage}</LoadingMessage>}
      <MenuBar />
    </PageWrapper>
  );
}

export default FindWay