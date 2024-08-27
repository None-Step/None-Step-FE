import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom';
import { PageWrapper } from './FindWay.style'
import { PageHeader } from '@/components/header/Headers'
import MenuBar from '@/components/menuBar/MenuBar'
import { Reload } from './FindWay.style';
import ReloadIcon from '@/assets/img/current.svg'
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import OriginMarker from '@/assets/img/origin-marker.svg';
import DestinationMarker from '@/assets/img/destination-marker.svg';

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

const TIMEOUT_DURATION = 8000; // 8초
const DEFAULT_CENTER = { lat: 37.56682420267543, lng: 126.978652258823 };
const DEFAULT_LEVEL = 3;

const FindWayNav = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
  const [isTracking, setIsTracking] = useState(true);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originName, setOriginName] = useState('출발지 미설정');
  const [destinationName, setDestinationName] = useState('도착지 미설정');

  const location = useLocation();
  const { routeData, origin: routeOrigin, destination: routeDestination } = location.state || {};

  // console.log('초기 설정 :', { routeData, routeOrigin, routeDestination });

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // console.log('routeOrigin 값:', routeOrigin);
    if (routeOrigin) {
      setOrigin(routeOrigin);
      setOriginName(routeOrigin.name || '현재 위치');
    }
  }, [routeOrigin]);

  useEffect(() => {
    // console.log('routeDestination 값:', routeDestination);
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
        },
        (error) => {
          console.error("위치 추적 오류:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: TIMEOUT_DURATION,
          maximumAge: 0
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTracking]);

  useEffect(() => {
    const stopWatching = watchUserPosition();
    return stopWatching;
  }, [watchUserPosition]);

  // 지도의 중심이 변경될 때 호출되는 핸들러
  const handleCenterChanged = (map) => {
    setMapLevel(map.getLevel());
    if (isTracking) {
      setIsTracking(false);
    }
  };

  // 현재 위치로 지도 중심 이동 및 레벨 조정
  const handleReloadLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setMapLevel(DEFAULT_LEVEL);
      setIsTracking(true);
    }
  };

  // console.log('Render state:', { origin, destination, originName, destinationName, polylinePath });

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
        {origin &&
          <MapMarker position={origin}
          image={{
            src: OriginMarker,
            size: {
                width: 50,
                height: 65,
            },
          }} />}
        {destination &&
          <MapMarker position={destination}
          image={{
            src: DestinationMarker,
            size: {
                width: 50,
                height: 65,
            },
          }}
           />}
        {polylinePath.length > 0 && (
          <Polyline
            path={[polylinePath]}
            strokeWeight={7}
            strokeColor={"#007AFF"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
          />
        )}
        <Reload onClick={handleReloadLocation} $viewportHeight={viewportHeight}>
          <img src={ReloadIcon} alt='현재위치 새로고침'/>
        </Reload>
      </Map>
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWayNav