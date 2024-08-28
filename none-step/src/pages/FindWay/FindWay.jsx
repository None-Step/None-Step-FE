import React, { useState, useEffect, useCallback } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline, Circle } from 'react-kakao-maps-sdk';
import { PageWrapper, Reload, CustomOverlay, StationName, UserLocationStart, StationAddress, ButtonContainer, Button } from './FindWay.style';
import { PageHeader } from '@/components/header/Headers';
import MenuBar from '@/components/menuBar/MenuBar';
import ReloadIcon from '@/assets/img/current.svg';
import KakaoMapPlaceSearch from './KakaoMapPlaceSearch';
import FindWayPopup from './FindWayPopup';
import axiosInstance from '@/apis/axiosInstance';
import QuickRoute from './QuickRoute';
import BicycleMarker from '@/assets/img/bicycle-marker.svg';
import OriginMarker from '@/assets/img/origin-marker.svg';
import DestinationMarker from '@/assets/img/destination-marker.svg';

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

  // const isStation = useCallback((place) => place && place.isStation, []);
  const getStationInfo = useCallback(async (lat, lng) => {
    try {
      const requestData = { latitude: lat, longitude: lng };
      console.log('now-station 요청 데이터:', requestData);
      const response = await axiosInstance.get(`/nonestep/subway/now-station`, { params: requestData });
      console.log('now-station 응답 데이터:', response.data);
      return response.data;
    } catch (error) {
      console.error('역 정보 조회 실패:', error);
      console.log('now-station 오류 응답:', error.response?.data);
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
  
    if (type === 'bike') {
      // 하나의 features 내에서 도보 -> 자전거 보관소, 보관소 -> 목적지 배열이 이어진 형태
      // lineIndex : 0 - lineIndex : n / lineIndex : 0 - lineIndex : n 구조임
      // 두 번째 lineIndex: 0을 찾아 자전거 경로의 시작점으로 설정
      startIndex = data.features.findIndex((feature, index) => 
        index > 0 && feature.properties.lineIndex === 0
      );
      if (startIndex === -1) startIndex = 0; // 못 찾으면 전체를 자전거 경로로 간주
    } else if (type === 'walk') {
      // 두 번째 lineIndex: 0 전까지를 도보 경로로 설정
      endIndex = data.features.findIndex((feature, index) => 
        index > 0 && feature.properties.lineIndex === 0
      );
      if (endIndex === -1) endIndex = data.features.length; // 못 찾으면 전체를 도보 경로로 간주
    }
  
    return data.features.slice(startIndex, endIndex).reduce((acc, feature) => {
      const coordinates = feature.geometry?.coordinates || [];
      const transformedCoordinates = coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));
      return acc.concat(transformedCoordinates);
    }, []);
  }, []);

  // 1. 버튼 위치용 화면 크기 측정
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. 사용자 실시간 위치 추적
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

  // 7. 사용자가 지도 이동시 상태 업데이트
  const handleCenterChanged = useCallback((map) => {
    setMapLevel(map.getLevel());
    if (isTracking) {
      setIsTracking(false);
    }
  }, [isTracking]);

  // 8. 지도 리로드 (지도의 중심좌표를 사용자의 현재 위치로 / 다른 오버레이를 숨김)
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

  // 2. KakaoMapPlaceSearch 컴포넌트로 받은 출발지 정보 처리
  const handleSelectOrigin = useCallback((place) => {
    const newOrigin = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name,
      isStation: place.isStation
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
      isStation: place.isStation
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
        const response = await axiosInstance.get(`/nonestep/road/bike-marker?latitude=${latitude}&longitude=${longitude}`);
        return response.data;
      } catch (error) {
        console.error('자전거 보관소 위치 조회 실패:', error);
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
      const destinationStation = await getStationInfo(destination.lat, destination.lng);
  
      let isStationToStation = originStation.station && destinationStation.station;
  
      try {
              // 도보 경로 계산
      // 출발지가 역이고 목적지가 역이 아닌 경우 -> go-road API 호출
      if (origin.isStation && !destination.isStation) {
        const requestData = {
          goLatitude: destination.lat,
          goLongitude: destination.lng,
          currentRegion: originStation.region,
          currentStation: originStation.station
        };
        
        console.log('go-road API 호출 데이터:', requestData);
        walkResponse = await axiosInstance.post('/nonestep/road/go-road', requestData);
        console.log('go-road API 응답 데이터:', walkResponse.data);      
    
      // 출발지와 목적지 둘 다 역이 아닌 경우 -> walk API 호출
      } else if (!origin.isStation && !destination.isStation) {
        const requestData = {
          currentLatitude: origin.lat,
          currentLongitude: origin.lng,
          goLatitude: destination.lat,
          goLongitude: destination.lng
        };
  
        console.log('walk API 호출 데이터:', requestData);
        walkResponse = await axiosInstance.post('/nonestep/road/walk', requestData);
        console.log('walk API 응답 데이터:', walkResponse.data);

        // 출발지와 목적지 둘 중 하나라도 역인 경우 -> go-station API 호출
      } else {
        const requestData = {
          currentLatitude: origin.lat,
          currentLongitude: origin.lng,
          goRegion: destinationStation.region,
          goStation: destinationStation.station
        };
  
        console.log('go-station API 호출 데이터:', requestData);
        console.log('go-station API 호출 destinationStation.station:', requestData);
  
        walkResponse = await axiosInstance.post('/nonestep/road/go-station', requestData);
        console.log('go-station API 응답 데이터:', walkResponse.data);
      }
  
      // 도보 경로 API 응답 처리
      if (walkResponse?.data?.features) {
        walkRouteInfo = walkResponse.data.features.reduce((acc, feature) => {
          acc.time += feature.properties.time || 0;
          acc.distance += feature.properties.distance || 0;
          return acc;
        }, { time: 0, distance: 0 });
      }
      // 최종 도보 경로 정보 처리
      setRouteInfo((prevRouteInfo) => ({
        ...prevRouteInfo,
        walkTime: formatTime(Math.round(walkRouteInfo.time / 60)),
        walkDistance: formatDistance(walkRouteInfo.distance)
      }));

      } catch (error) {
        console.error('도보 경로 계산 중 오류 발생:', error);
        walkRouteInfo = {
          time: 0,
          distance: 0,
          isOverDistance: false,
          message: "도보 경로를 계산할 수 없습니다."
        };
      }
  
      // 자전거 경로 계산
      try {
        if (!walkRouteInfo.isOverDistance) {
          if (originStation.region === '수도권' || originStation.region === '대전') {
            const bikeApiEndpoint = originStation.region === '수도권' ? '/nonestep/road/seoul-bike' : '/nonestep/road/daejeon-bike';
            const bikeRequestData = {
              currentLatitude: origin.lat,
              currentLongitude: origin.lng,
              goLatitude: destination.lat,
              goLongitude: destination.lng
            };
    
            console.log('자전거 경로 요청 데이터:', bikeRequestData);
            bikeResponse = await axiosInstance.post(bikeApiEndpoint, bikeRequestData);
            console.log('자전거 경로 응답 데이터:', bikeResponse.data);
  
            if (bikeResponse.status !== 200) {
              throw new Error(`자전거 경로 API 요청 실패: ${bikeResponse.statusText}`);
            }
    
            if (bikeResponse.data && bikeResponse.data.features && bikeResponse.data.features.length > 0) {
              // 자전거 보관소 위치 조회
              const bikeStationLocation = await getBikeStationLocation(origin.lat, origin.lng);
              
              if (bikeStationLocation) {
                // 도보 부분과 자전거 부분을 구분
                const walkIndex = bikeResponse.data.features.findIndex(feature => feature.properties.lineIndex === 0);
                const bikeIndex = bikeResponse.data.features.findIndex((feature, index) => index > walkIndex && feature.properties.lineIndex === 0);
            
                const walkToBikeFeature = {
                  properties: {
                    time: 0,
                    distance: 0
                  }
                };
                const bikeToDestionationFeature = {
                  properties: {
                    time: 0,
                    distance: 0
                  }
                };
            
                // 도보 부분 계산
                for (let i = 0; i < bikeIndex; i++) {
                  walkToBikeFeature.properties.time += bikeResponse.data.features[i].properties.time || 0;
                  walkToBikeFeature.properties.distance += bikeResponse.data.features[i].properties.distance || 0;
                }
            
                // 자전거 부분 계산
                for (let i = bikeIndex; i < bikeResponse.data.features.length; i++) {
                  bikeToDestionationFeature.properties.time += bikeResponse.data.features[i].properties.time/4 || 0;
                  bikeToDestionationFeature.properties.distance += bikeResponse.data.features[i].properties.distance || 0;
                }
            
                // 총 시간과 총 거리 계산
                const totalTime = walkToBikeFeature.properties.time + bikeToDestionationFeature.properties.time;
                const totalDistance = walkToBikeFeature.properties.distance + bikeToDestionationFeature.properties.distance;
            
                bikeRouteInfo = {
                  bikeStation: { lat: bikeStationLocation.latitude, lng: bikeStationLocation.longitude },
                  walkTime: walkToBikeFeature.properties.time,
                  walkDistance: walkToBikeFeature.properties.distance,
                  bikeTime: bikeToDestionationFeature.properties.time,
                  bikeDistance: bikeToDestionationFeature.properties.distance,
                  totalTime: totalTime,
                  totalDistance: totalDistance,
                  message: `출발지에서 ${formatDistance(walkToBikeFeature.properties.distance)} 걸어서 자전거 보관소로 이동 후, ${formatDistance(bikeToDestionationFeature.properties.distance)} 자전거 이용`
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
                  message: "가까운 거리에 이용 가능한 자전거 보관소가 없습니다."
                };
              }
            } else {
              throw new Error("가까운 거리에 이용 가능한 자전거 보관소가 없습니다.");
            }
          }
        }
  
      } catch (error) {
        console.error('자전거 경로 계산 중 오류 발생:', error);
        bikeRouteInfo = {
          bikeStation: null,
          walkTime: 0,
          walkDistance: 0,
          bikeTime: 0,
          bikeDistance: 0,
          totalTime: 0,
          totalDistance: 0,
          message: "자전거 경로를 조회할 수 없습니다."
        };
      }
      
      try {
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
      } catch (error) {
        console.error('지하철 경로 계산 중 오류 발생:', error);
        subwayRouteInfo = {
          globalTravelTime: 0,
          globalDistance: 0,
          message: "지하철 경로를 조회할 수 없습니다."
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
        isStationToStation: isStationToStation
      };

      console.log('routeInfo 데이터 : ', routeInfo);
      console.log('bikeRouteInfo 데이터 : ', bikeRouteInfo);
      console.log('자전거 보관소 위치: ', routeInfo.bikeStation);

      // 경로 정보와 상태 업데이트
      setRouteInfo(routeInfo);
      const walkData = walkRouteInfo.isOverDistance ? null : walkResponse?.data || null;
      const bikeData = bikeResponse?.data || null;

      setRouteData({
        walk: walkData,
        bike: bikeData
      });

      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('경로 계산 중 오류 발생:', error);
      alert('경로를 계산하는 데 실패했습니다.');
      }
      }, [origin, destination, getStationInfo, formatTime, formatDistance, getBikeStationLocation]);



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
              <CustomOverlayMap position={userLocation} yAnchor={1.65}>
                <CustomOverlay>
                  <StationName>현재 위치</StationName>
                    <UserLocationStart onClick={() => handleSetLocation('origin', userLocation)}>출발지로 설정하기</UserLocationStart>
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
              onClick={() => handleMarkerClick('origin')}
              image={{
                src: OriginMarker,
                size: {
                    width: 50,
                    height: 65,
                },
              }}
            />
            {origin && showOriginOverlay && (
              <CustomOverlayMap position={origin} yAnchor={1.62}>
                <CustomOverlay>
                  <StationName>{origin.name}</StationName>
                  <StationAddress>{origin.address}</StationAddress>
                  <ButtonContainer>
                    <Button onClick={() => handleSetLocation('origin', origin)}>출발</Button>
                    <Button onClick={() => handleSetLocation('destination', origin)}>도착</Button>
                  </ButtonContainer>
                </CustomOverlay>
              </CustomOverlayMap>
            )}
          </>
          
        )}
  
        {/* 도착지 마커 */}
        {destination && (
          <>
            <MapMarker 
              position={destination}
              onClick={() => handleMarkerClick('destination')}
              image={{
                src: DestinationMarker,
                size: {
                    width: 50,
                    height: 65,
                },
              }}
            />
            {destination && showDestinationOverlay && (
              <CustomOverlayMap position={destination} yAnchor={1.62}>
                <CustomOverlay>
                  <StationName>{destination.name}</StationName>
                  <StationAddress>{destination.address}</StationAddress>
                  <ButtonContainer>
                    <Button onClick={() => handleSetLocation('origin', destination)}>출발</Button>
                    <Button onClick={() => handleSetLocation('destination', destination)}>도착</Button>
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
            {selectedRoute === 'walk' && routeData.walk && (
              <Polyline
                path={getPolylinePath(routeData.walk, 'walk')}
                strokeWeight={5}
                strokeColor={"#007AFF"}
                strokeOpacity={0.7}
                strokeStyle={"solid"}
              />
            )}

            {/* 도보 + 자전거 경로 */}
            {selectedRoute === 'bike' && routeData.bike && (
              <>
                {/* 도보 부분 (파란색) */}
                <Polyline
                  path={getPolylinePath(routeData.bike, 'walk')}
                  strokeWeight={5}
                  strokeColor={"#007AFF"}
                  strokeOpacity={0.7}
                  strokeStyle={"solid"}
                />
                {/* 자전거 부분 (초록색) */}
                <Polyline
                  path={getPolylinePath(routeData.bike, 'bike')}
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
        {routeInfo?.bikeStation && selectedRoute === 'bike' && (
          <>
            <MapMarker 
              position={routeInfo.bikeStation}
              onClick={() => handleMarkerClick('bikeStation')}
              image={{
                src: BicycleMarker,
                size: {
                    width: 50,
                    height: 65,
                },
              }}
            />
            {routeInfo?.bikeStation && showBikeStationOverlay && (
              <CustomOverlayMap position={routeInfo.bikeStation} yAnchor={1.52}>
                <CustomOverlay>
                  <StationName>자전거 보관소</StationName>
                  <ButtonContainer>
                    <Button onClick={() => handleSetLocation('origin', routeInfo.bikeStation)}>출발</Button>
                    <Button onClick={() => handleSetLocation('destination', routeInfo.bikeStation)}>도착</Button>
                  </ButtonContainer>
                </CustomOverlay>
              </CustomOverlayMap>
            )}
          </>

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