import React, { useState, useEffect, useCallback } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import MenuBar from '@/components/menuBar/MenuBar';
import { PageHeader } from '../../components/header/Headers';
import { 
  PageWrapper,
  CustomOverlay,
  StationName,
  StationAddress,
  Confirm,
  Reload
} from './FindWay.style';
import KakaoMapPlaceSearch from './KakaoMapPlaceSearch';
import ReloadIcon from '@/assets/img/current.svg'

const TIMEOUT_DURATION = 20000; // 20초
const DEFAULT_CENTER = { lat: 37.506320759000715, lng: 127.05368251210247 };

const FindWay = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_APP_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
    });
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        const geolocationOptions = {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: TIMEOUT_DURATION
        };
        navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions);
      } else {
        reject(new Error("이 브라우저에서는 위치 정보 기능을 사용할 수 없습니다"));
      }
    });
  }, []);

  const updateUserLocation = useCallback(async () => {
    setIsUserLocationLoading(true);
    try {
      const position = await getCurrentPosition();
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserLocation(newLocation);
      setCenter(newLocation);
    } catch (error) {
      console.error("위치 정보를 가져오는 중 오류 발생:", error.message);
    } finally {
      setIsUserLocationLoading(false);
    }
  }, [getCurrentPosition]);

  useEffect(() => {
    updateUserLocation();
  }, [updateUserLocation]);

  const handleSelectPlace = (place) => {
    setDestination({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name
    });
    setCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x)
    });
    setIsOverlayVisible(true);
  };

  const handleReload = () => {
    updateUserLocation();
  };

  if (!mapLoaded) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <PageWrapper>
      <PageHeader />
      <KakaoMapPlaceSearch onSelectPlace={handleSelectPlace} />
      <Map
        center={center}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={3}
      >
        {userLocation && <MapMarker position={userLocation} />}
        {destination && (
          <>
            <MapMarker
              position={destination}
              clickable={true}
              onClick={() => setIsOverlayVisible(!isOverlayVisible)}
            />
            {isOverlayVisible && (
              <CustomOverlayMap
                position={destination}
                yAnchor={1.55}
              >
                <CustomOverlay>
                  <StationName>{destination.name}</StationName>
                  <StationAddress>{destination.address}</StationAddress>
                  <Confirm>목적지로 설정하기</Confirm>
                </CustomOverlay>
              </CustomOverlayMap>
            )}
          </>
        )}
        <Reload onClick={handleReload}>
          <img src={ReloadIcon} alt='현재위치 새로고침'/>
        </Reload>
      </Map>
      {isUserLocationLoading && <div>사용자 위치를 불러오는 중...</div>}
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWay