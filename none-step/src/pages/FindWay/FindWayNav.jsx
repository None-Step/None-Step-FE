import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { useLocation } from 'react-router-dom';
import { PageWrapper } from './FindWay.style'
import { PageHeader } from '../../components/header/Headers'
import MenuBar from '../../components/menuBar/MenuBar'
import { LoadingMessage, Reload } from './FindWay.style';
import ReloadIcon from '@/assets/img/current.svg'
import styled from 'styled-components';

const LoadMessage = styled(LoadingMessage)`
  top: 70px;
`

const TIMEOUT_DURATION = 20000; // 20초
const DEFAULT_CENTER = { lat: 37.506320759000715, lng: 127.05368251210247 };
const DEFAULT_LEVEL = 3;

const FindWayNav = () => {
  const [center, setCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('지도를 불러오는 중...');
  const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
  const [destination, setDestination] = useState(null);
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(true);
  
  const location = useLocation();
  const { origin, routeData } = location.state || {};

  // API 응답 데이터를 Polyline 경로 형식으로 그려주기 + 마지막 좌표를 목적지로 설정
  const { polylinePath, lastCoordinate } = useMemo(() => {
    if (!routeData || !routeData.features || routeData.features.length === 0) {
      return { polylinePath: [], lastCoordinate: null };
    }
    
    const allCoordinates = routeData.features.flatMap(feature => 
      feature.geometry.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }))
    );

    const lastCoord = allCoordinates[allCoordinates.length - 1];
    
    return { 
      polylinePath: allCoordinates,
      lastCoordinate: lastCoord
    };
  }, [routeData]);

  // 목적지 설정
  useEffect(() => {
    if (lastCoordinate) {
      setDestination(lastCoordinate);
    }
  }, [lastCoordinate]);

  // 사용자 위치 추적 함수
  const watchUserPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      setStatusMessage('사용자 위치를 불러오는 중...');
      setIsUserLocationLoading(true);
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          if (!center) {
            setCenter(newLocation);
          }
          setStatusMessage('');
          setIsUserLocationLoading(false);
        },
        (error) => {
          console.error("위치 추적 오류:", error.message);
          setStatusMessage('위치 추적에 실패했습니다.');
          setIsUserLocationLoading(false);
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
      setIsUserLocationLoading(false);
    }
  }, [center]);

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
    const stopWatching = watchUserPosition();
    return stopWatching; // 컴포넌트 언마운트 시 위치 추적 중지
  }, [watchUserPosition]);

  // 지도의 중심이 변경될 때 호출되는 핸들러
  const handleCenterChanged = (map) => {
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng()
    });
    setMapLevel(map.getLevel());
  };

  // 현재 위치로 지도 중심 이동 및 레벨 조정
  const handleReloadLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setMapLevel(DEFAULT_LEVEL);
      setStatusMessage('현재 위치로 이동 중...');
      setTimeout(() => setStatusMessage(''), 1000); // 1초 후 메시지 제거
    } else {
      setStatusMessage('현재 위치를 찾을 수 없습니다.');
    }
  };

  // 지도 또는 사용자 위치 로딩 중일 때 보여줄 내용
  if (!mapLoaded || isUserLocationLoading) {
    return <LoadMessage>{statusMessage}</LoadMessage>;
  }

  return (
    <PageWrapper>
      <PageHeader />
      {center && (
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
          <Reload onClick={handleReloadLocation}>
            <img src={ReloadIcon} alt='현재위치 새로고침'/>
          </Reload>
        </Map>
      )}
      {statusMessage && <LoadMessage>{statusMessage}</LoadMessage>}
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWayNav