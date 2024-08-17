import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom';
import { PageWrapper } from './FindWay.style'
import { PageHeader } from '@/components/header/Headers'
import MenuBar from '@/components/menuBar/MenuBar'
import { LoadingMessage, Reload } from './FindWay.style';
import ReloadIcon from '@/assets/img/current.svg'
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';

const LoadMessage = styled(LoadingMessage)`
  top: 70px;
`;

const RouteInfoBar = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const LocationText = styled.span`
  font-size: 14px;
  color: #333;
`;

const ArrowIcon = styled(FaArrowRight)`
  width: 1.5rem;
  height: 1.5rem;
  color: #333;
`;

const TIMEOUT_DURATION = 20000; // 20초
const DEFAULT_CENTER = { lat: 37.56682420267543, lng: 126.978652258823 };
const DEFAULT_LEVEL = 3;

const FindWayNav = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('지도를 불러오는 중...');
  const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
  const [isTracking, setIsTracking] = useState(true);  // 사용자 위치 추적 상태
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originName, setOriginName] = useState('출발지 미설정');
  const [destinationName, setDestinationName] = useState('도착지 미설정');
  
  const location = useLocation();
  const { routeData, origin: routeOrigin, destination: routeDestination } = location.state || {};

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (routeOrigin) {
      setOrigin(routeOrigin);
      setOriginName(routeOrigin.name || '현재 위치');
    }
  }, [routeOrigin]);

  useEffect(() => {
    if (routeDestination) {
      setDestination(routeDestination);
      setDestinationName(routeDestination.name || '도착지 미설정');
    }
  }, [routeDestination]);

  // API 응답 데이터를 Polyline 경로 형식으로 그려주기
  const polylinePath = useMemo(() => {
    if (!routeData || !routeData.features || routeData.features.length === 0) {
      return [];
    }
    
    return routeData.features.flatMap(feature => 
      feature.geometry.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }))
    );
  }, [routeData]);

  // 사용자 위치 추적 함수
  const watchUserPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      setStatusMessage('사용자 위치를 불러오는 중...');
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          if (isTracking) {
            setCenter(newLocation);
          }
          setStatusMessage('');
        },
        (error) => {
          console.error("위치 추적 오류:", error.message);
          setStatusMessage('위치 추적에 실패했습니다.');
        },
        {
          enableHighAccuracy: true,
          timeout: TIMEOUT_DURATION,
          maximumAge: 0
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setStatusMessage('이 브라우저에서는 위치 추적을 사용할 수 없습니다.');
    }
  }, [isTracking]);

  // 카카오맵 스크립트 로드
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

  // 사용자 위치 추적 시작
  useEffect(() => {
    if (mapLoaded) {
      const stopWatching = watchUserPosition();
      return stopWatching; // 컴포넌트 언마운트 시 위치 추적 중지
    }
  }, [mapLoaded, watchUserPosition]);

  // 지도의 중심이 변경될 때 호출되는 핸들러
  const handleCenterChanged = (map) => {
    setMapLevel(map.getLevel());
    // 사용자가 지도를 수동으로 이동시킬 때 추적 모드 해제
    if (isTracking) {
      setIsTracking(false);
    }
  };

  // 현재 위치로 지도 중심 이동 및 레벨 조정
  const handleReloadLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setMapLevel(DEFAULT_LEVEL);
      setIsTracking(true);  // 현재 위치로 이동 시 추적 모드 활성화
    }
  };

  // 지도 로딩 중일 때 보여줄 내용
  if (!mapLoaded) {
    return <LoadMessage>{statusMessage}</LoadMessage>;
  }

  return (
    <PageWrapper>
      <PageHeader />
      <RouteInfoBar>
        <LocationText>{originName}</LocationText>
        <ArrowIcon />
        <LocationText>{destinationName}</LocationText>
      </RouteInfoBar>
      <Map
        center={center}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={mapLevel}
        onCenterChanged={handleCenterChanged}
      >
        {origin && <MapMarker position={origin} />}
        {destination && <MapMarker position={destination} />}
        {polylinePath.length > 0 && (
          <Polyline
            path={[polylinePath]}
            strokeWeight={8}
            strokeColor={"#007AFF"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
          />
        )}
        <Reload onClick={handleReloadLocation} $viewportHeight={viewportHeight}>
          <img src={ReloadIcon} alt='현재위치 새로고침'/>
        </Reload>
      </Map>
      {statusMessage && <LoadMessage>{statusMessage}</LoadMessage>}
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWayNav