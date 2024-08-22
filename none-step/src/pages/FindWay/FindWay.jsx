import React, { useState, useEffect, useCallback } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline, Circle } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, Reload, CustomOverlay, StationName, StationAddress, ButtonContainer, Button } from './FindWay.style';
import { PageHeader } from '@/components/header/Headers';
import MenuBar from '@/components/menuBar/MenuBar';
import ReloadIcon from '@/assets/img/current.svg';
import KakaoMapPlaceSearch from './KakaoMapPlaceSearch';
import FindWayPopup from './FindWayPopup';
import axiosInstance from '@/apis/axiosInstance';
import QuickRoute from './QuickRoute';

const TIMEOUT_DURATION = 8000;
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
  const [showUserLocationOverlay, setShowUserLocationOverlay] = useState(false);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [showBikeStationOverlay, setShowBikeStationOverlay] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('walk'); // 경로 선택

  const navigate = useNavigate();

  const isStation = useCallback((place) => place && place.isStation, []);
  const getStationInfo = useCallback(async (lat, lng) => {
    try {
      const requestData = { latitude: lat, longitude: lng };
      console.log('getStationInfo 요청 데이터:', requestData);
      const response = await axiosInstance.get(`/nonestep/subway/now-station`, { params: requestData });
      console.log('getStationInfo 응답 데이터:', response.data);
      return response.data;
    } catch (error) {
      console.error('역 정보 조회 실패:', error);
      console.log('getStationInfo 오류 응답:', error.response?.data);
      throw error;
    }
  }, []);

  const getPolylinePath = useCallback((data) => {
    if (!data || !data.features || data.features.length === 0) {
      return [];
    }
    
    return data.features.reduce((acc, feature) => {
      const coordinates = feature.geometry?.coordinates || [];
      const transformedCoordinates = coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));
      return acc.concat(transformedCoordinates);
    }, []);
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            setShowUserLocationOverlay(true);
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

  const handleCenterChanged = useCallback((map) => {
    setMapLevel(map.getLevel());
    if (isTracking) {
      setIsTracking(false);
    }
  }, [isTracking]);

  const handleReloadLocation = useCallback(() => {
    if (userLocation) {
      setCenter(userLocation);
      setMapLevel(DEFAULT_LEVEL);
      setIsTracking(true);
      setShowUserLocationOverlay(true);
      setShowOriginOverlay(false);
      setShowDestinationOverlay(false);
    }
  }, [userLocation]);

  const handleSetLocation = useCallback((type, marker) => {
    const newLocation = {
      ...marker,
      name: marker.name || '현재 위치',
      address: marker.address || '현재 위치'
    };

    if (type === 'origin') {
      setOrigin(newLocation);
      setOriginInput(newLocation.name);
      if (JSON.stringify(destination) === JSON.stringify(newLocation)) {
        setDestination(null);
        setDestinationInput('');
      }
    } else {
      setDestination(newLocation);
      setDestinationInput(newLocation.name);
      if (JSON.stringify(origin) === JSON.stringify(newLocation)) {
        setOrigin(null);
        setOriginInput('');
      }
    }
  }, [destination, origin]);

  const handleSelectOrigin = useCallback((place) => {
    const newOrigin = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name,
      isStation: place.category_group_code === 'SW8'
    };
    setOrigin(newOrigin);
    setOriginInput(place.place_name);
    setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setShowOriginOverlay(true);
    setShowDestinationOverlay(false);
  }, []);

  const handleSelectDestination = useCallback((place) => {
    const newDestination = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name,
      isStation: place.category_group_code === 'SW8'
    };
    setDestination(newDestination);
    setDestinationInput(place.place_name);
    setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setShowDestinationOverlay(true);
    setShowOriginOverlay(false);
  }, []);

  const calculateRoute = useCallback(async () => {
    if (!origin || !destination) return;
  
    setIsRouteCalculated(false);
  
    try {
      let walkRouteInfo = { time: 0, distance: 0 };
      let bikeRouteInfo = null;
      let subwayRouteInfo = null;
      let bikeResponse = null;
  
      const originStation = await getStationInfo(origin.lat, origin.lng);
      const destinationStation = await getStationInfo(destination.lat, destination.lng);
  
      // 도보 경로 계산
      const walkRequestData = {
        currentLatitude: origin.lat,
        currentLongitude: origin.lng,
        goRegion: destinationStation.region,
        goStation: destinationStation.station
      };
      console.log('도보 경로 요청 데이터:', walkRequestData);
      const walkResponse = await axiosInstance.post('/nonestep/road/go-station', walkRequestData);
      console.log('도보 경로 응답 데이터:', walkResponse.data);
  
      if (walkResponse.data && walkResponse.data.features) {
        walkRouteInfo = walkResponse.data.features.reduce((acc, feature) => {
          acc.time += feature.properties.time || 0;
          acc.distance += feature.properties.distance || 0;
          return acc;
        }, { time: 0, distance: 0 });
      }
  
      // 자전거 경로 계산
      if (originStation.region === '수도권' || originStation.region === '대전') {
        const bikeApiEndpoint = originStation.region === '수도권' ? '/nonestep/road/seoul-bike' : '/nonestep/road/daejeon-bike';
        const bikeRequestData = {
          currentLatitude: origin.lat,
          currentLongitude: origin.lng,
          goRegion: destinationStation.region,
          goStation: destinationStation.station
        };
  
        console.log('자전거 경로 요청 데이터:', bikeRequestData);
        const bikeResponse = await axiosInstance.post(bikeApiEndpoint, bikeRequestData);
        console.log('자전거 경로 응답 데이터:', bikeResponse.data);
  
        if (bikeResponse.data && bikeResponse.data.features && bikeResponse.data.features.length > 0) {
          // 1. 출발지에서 자전거 보관소까지의 도보 경로
          const walkToBikeFeature = bikeResponse.data.features[0];
          const walkToBikeInfo = {
            time: walkToBikeFeature.properties.time || 0,
            distance: walkToBikeFeature.properties.distance || 0
          };
  
          // 2. 자전거 보관소에서 목적지까지의 자전거 경로
          const bikeStation = walkToBikeFeature.geometry.coordinates[walkToBikeFeature.geometry.coordinates.length - 1];
          let bikeToDestinationInfo;
  
          if (destination.isStation) {
            // 목적지가 역인 경우

            const goStationResponse = await axiosInstance.post('/nonestep/road/go-station', {
              currentLatitude: bikeStation[1],
              currentLongitude: bikeStation[0],
              goRegion: destinationStation.region,
              goStation: destinationStation.station
            });
            
            bikeToDestinationInfo = goStationResponse.data.features.reduce((acc, feature) => {
              acc.time += feature.properties.time || 0;
              acc.distance += feature.properties.distance || 0;
              return acc;
            }, { time: 0, distance: 0 });
          } else {
            // 목적지가 역이 아닌 경우
            const goRoadResponse = await axiosInstance.post('/nonestep/road/go-road', {
              currentLatitude: bikeStation[1],
              currentLongitude: bikeStation[0],
              goLatitude: destination.lat,
              goLongitude: destination.lng
            });
            bikeToDestinationInfo = goRoadResponse.data.features.reduce((acc, feature) => {
              acc.time += feature.properties.time || 0;
              acc.distance += feature.properties.distance || 0;
              return acc;
            }, { time: 0, distance: 0 });
          }
  
          // 자전거 이동 시간 조정 (도보 속도의 1.5배로 가정)
          bikeToDestinationInfo.time = Math.round(bikeToDestinationInfo.time * 0.67);
  
          bikeRouteInfo = {
            bikeStation: { lat: bikeStation[1], lng: bikeStation[0] }, // 자전거 보관소 위치 저장 (마커 표시용)
            walkTime: walkToBikeInfo.time,
            walkDistance: walkToBikeInfo.distance,
            bikeTime: bikeToDestinationInfo.time,
            bikeDistance: bikeToDestinationInfo.distance,
            totalTime: walkToBikeInfo.time + bikeToDestinationInfo.time,
            totalDistance: walkToBikeInfo.distance + bikeToDestinationInfo.distance,
            message: `출발지에서 ${formatDistance(walkToBikeInfo.distance)} 걸어서 자전거 보관소로 이동 후, ${formatDistance(bikeToDestinationInfo.distance)} 자전거 이용`
          };
        } else {
          bikeRouteInfo = { 
            bikeStation: null, // 자전거 보관소가 없는 경우 (마커 표시용)
            walkTime: 0, 
            walkDistance: 0, 
            bikeTime: 0, 
            bikeDistance: 0, 
            totalTime: 0,
            totalDistance: 0,
            message: "가까운 거리에 이용 가능한 자전거 보관소가 없습니다." 
          };
        }
      }
  
      // 지하철 경로 계산
      const subwayRequestData = {
        region: originStation.region,
        startLine: originStation.line,
        startStation: originStation.station,
        endLine: destinationStation.line,
        endStation: destinationStation.station
      };
      console.log('지하철 경로 요청 데이터:', subwayRequestData);
      const subwayResponse = await axiosInstance.post('/nonestep/road/subway-path', subwayRequestData);
      console.log('지하철 경로 응답 데이터:', subwayResponse.data);
  
      if (subwayResponse.data && subwayResponse.data.result) {
        subwayRouteInfo = subwayResponse.data.result;
      }
  
      const routeInfo = {
        bikeStation: bikeRouteInfo ? bikeRouteInfo.bikeStation : null, // 자전거 보관소 위치 (마커용)

        // 도보 경로
        walkTime: formatTime(Math.round(walkRouteInfo.time / 60)), // 도보 경로의 총 소요 시간
        walkDistance: formatDistance(walkRouteInfo.distance), // 도보 경로의 총 거리
      
        // 도보 + 자전거 경로
        bikeWalkTime: bikeRouteInfo ? formatTime(Math.round(bikeRouteInfo.walkTime / 60)) : '0분', // 1. 출발지 -> 자전거 보관소(도보) 소요 시간(분)
        bikeWalkDistance: bikeRouteInfo ? formatDistance(bikeRouteInfo.walkDistance) : '0m', // 1. 출발지 -> 자전거 보관소(도보) 거리(m,km)

        bikeRideTime: bikeRouteInfo ? formatTime(Math.round(bikeRouteInfo.bikeTime / 60)) : '0분', // 2. 자전거 보관소 -> 목적지(자전거) 소요 시간(분)
        bikeRideDistance: bikeRouteInfo ? formatDistance(bikeRouteInfo.bikeDistance) : '0m', // 2. 자전거 보관소 -> 목적지(자전거) 거리(m,km)

        bikeTotalTime: bikeRouteInfo ? formatTime(Math.round(bikeRouteInfo.totalTime / 60)) : '0분', // 1+2의 총 소요 시간
        bikeTotalDistance: bikeRouteInfo ? formatDistance(bikeRouteInfo.totalDistance) : '0m', // 1+2의 총 거리
        bikeMessage: bikeRouteInfo ? bikeRouteInfo.message : '자전거 경로를 이용할 수 없습니다.', // 경로 설명 및 자전거 보관소 없음 메시지
      
        // 지하철 경로
        subwayRoute: subwayRouteInfo, // 지하철 경로 정보 전체 (API 응답에서 받은 데이터)
        subwayTime: subwayRouteInfo ? formatTime(subwayRouteInfo.globalTravelTime) : '0분', // 지하철 경로의 총 소요 시간 (응답 데이터 기본 단위 : 분)
        subwayDistance: subwayRouteInfo ? formatDistance(subwayRouteInfo.globalDistance * 1000) : '0m', // 지하철 경로의 총 거리 (응답 데이터 기본 단위 : km)
      };
      console.log('bikeRouteInfo 데이터 : ',bikeRouteInfo)

  
      setRouteInfo(routeInfo);
      setRouteData({
        walk: walkResponse.data,
        bike: bikeResponse?.data
      });
      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('경로 계산 중 오류 발생:', error);
      alert('경로를 계산하는 데 실패했습니다.');
    }
  }, [origin, destination, getStationInfo, formatTime, formatDistance]);

  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination, calculateRoute]);

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

  // 마커 클릭 핸들러 (각 마커 클릭시 인포윈도우 온오프)
  const handleMarkerClick = useCallback((type) => {
    if (isNavigating) return;
  
    setShowUserLocationOverlay(false);
    setShowOriginOverlay(false);
    setShowDestinationOverlay(false);
    setShowBikeStationOverlay(false);
  
    switch(type) {
      case 'userLocation':
        setShowUserLocationOverlay(prev => !prev);
        setCenter(userLocation);
        break;
      case 'origin':
        setShowOriginOverlay(true);
        break;
      case 'destination':
        setShowDestinationOverlay(true);
        break;
      case 'bikeStation':
        setShowBikeStationOverlay(true);
        break;
      default:
        break;
    }
  }, [isNavigating, userLocation, setCenter]);


  return (
    <PageWrapper>
      <PageHeader />
  
      <KakaoMapPlaceSearch 
        onSelectOrigin={handleSelectOrigin}
        onSelectDestination={handleSelectDestination}
        originName={originInput}
        destinationName={destinationInput}
        setOriginName={setOriginInput}
        setDestinationName={setDestinationInput}
      />
  
      <Map
        center={center}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={mapLevel}
        onCenterChanged={handleCenterChanged}
      >
        {/* 사용자 위치 마커 및 오버레이 */}
        {userLocation && (
          <>
            <MapMarker 
              position={userLocation} 
              onClick={() => handleMarkerClick('userLocation')}
            />
            {showUserLocationOverlay && !origin && !destination && !isNavigating && (
              <CustomOverlayMap position={userLocation} yAnchor={1.52}>
                <CustomOverlay>
                  <StationName>현재 위치</StationName>
                  <ButtonContainer>
                    <Button onClick={() => handleSetLocation('origin', userLocation)}>출발</Button>
                    <Button onClick={() => handleSetLocation('destination', userLocation)}>도착</Button>
                  </ButtonContainer>
                </CustomOverlay>
              </CustomOverlayMap>
            )}
          </>
        )}
        
        {/* 출발지 마커 */}
        {origin && (
          <MapMarker 
            position={origin}
            onClick={() => handleMarkerClick('origin')}
          />
        )}
  
        {/* 도착지 마커 */}
        {destination && (
          <MapMarker 
            position={destination}
            onClick={() => handleMarkerClick('destination')}
          />
        )}
  
        {/* 경로 렌더링 */}
        {isRouteCalculated && routeData && (
          <>
            {/* 선택된 경로에 따라 조건부 렌더링 */}
            {/* 도보 경로 (파란색) */}
            {(selectedRoute === 'walk' || selectedRoute === 'bike') && routeData.walk && routeData.walk.features && (
              <Polyline
                path={getPolylinePath(routeData.walk)}
                strokeWeight={5}
                strokeColor={"#007AFF"}
                strokeOpacity={0.7}
                strokeStyle={"solid"}
              />
            )}
  
            {/* 자전거 경로 (초록색) */}
            {selectedRoute === 'bike' && routeData.bike && routeData.bike.features && (
              <Polyline
                path={getPolylinePath(routeData.bike)}
                strokeWeight={5}
                strokeColor={"#00FF00"}
                strokeOpacity={0.7}
                strokeStyle={"solid"}
              />
            )}
          </>
        )}
  
        {/* 자전거 보관소 마커 */}
        {routeInfo?.bikeStation && (
          <MapMarker 
            position={routeInfo.bikeStation}
            onClick={() => handleMarkerClick('bikeStation')}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              size: {
                width: 64,
                height: 69
              },
            }}
          />
        )}
  
        {/* 현재 위치로 이동 버튼 */}
        <Reload onClick={handleReloadLocation} $viewportHeight={viewportHeight}>
          <img src={ReloadIcon} alt='현재위치 새로고침'/>
        </Reload>
      </Map>
  
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
          origin={origin ? origin.name : ''}
          destination={destination ? destination.name : ''}
        />
      )}
  
      {/* 빠른 경로 버튼 */}
      {!isNavigating && <QuickRoute userLocation={userLocation} />}
      <MenuBar />
    </PageWrapper>
  );};

export default FindWay;