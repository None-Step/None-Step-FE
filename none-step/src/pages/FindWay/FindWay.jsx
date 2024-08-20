import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom';
import { PageWrapper, Reload, CustomOverlay, StationName, StationAddress, ButtonContainer, Button,
  RouteInfoBar, LocationText, ArrowIcon } from './FindWay.style'
import { PageHeader } from '@/components/header/Headers'
import MenuBar from '@/components/menuBar/MenuBar'
import ReloadIcon from '@/assets/img/current.svg'
import KakaoMapPlaceSearch from './KakaoMapPlaceSearch';
import FindWayPopup from './FindWayPopup';
import axiosInstance from '@/apis/axiosInstance'
import QuickRoute from './QuickRoute';

const TIMEOUT_DURATION = 8000;
const DEFAULT_CENTER = { lat: 37.56682420267543, lng: 126.978652258823 };
const DEFAULT_LEVEL = 3;

const FindWay = () => {
  // 상태 관리 - 지도 중심, 사용자 위치, 지도 레벨 등
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


  const navigate = useNavigate();

  const isStation = (place) => place && place.isStation;

  const getStationInfo = async (lat, lng) => {
    try {
      const response = await axiosInstance.get(`/nonestep/subway/now-station?latitude=${lat}&longitude=${lng}`);
      return response.data;
    } catch (error) {
      console.error('역 정보 조회 실패:', error);
      throw error;
    }
  };

  // 뷰포트 높이 조정하기
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 사용자 위치 추적하기
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

  // 지도 중심 변경 시 처리하기
  const handleCenterChanged = (map) => {
    setMapLevel(map.getLevel());
    if (isTracking) {
      setIsTracking(false);
    }
  };

  // 현재 위치로 지도 중심 이동하기
  const handleReloadLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setMapLevel(DEFAULT_LEVEL);
      setIsTracking(true);
      setShowUserLocationOverlay(true);
      setShowOriginOverlay(false);
      setShowDestinationOverlay(false);
    }
  };

  // 출발지/도착지 설정하기
  const handleSetLocation = (type, marker) => {
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
  };

  // 출발지 선택하기
  const handleSelectOrigin = (place) => {
    const newOrigin = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name,
      isStation: place.category_group_code === 'SW8' // 지하철역 여부 확인
    };
    setOrigin(newOrigin);
    setOriginInput(place.place_name);
    setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setShowOriginOverlay(true);
    setShowDestinationOverlay(false);
  };

  // 도착지 선택하기
  const handleSelectDestination = (place) => {
    const newDestination = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.place_name,
      address: place.address_name,
      isStation: place.category_group_code === 'SW8' // 지하철역 여부 확인
    };
    setDestination(newDestination);
    setDestinationInput(place.place_name);
    setCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setShowDestinationOverlay(true);
    setShowOriginOverlay(false);
  };
  
  useEffect(() => {
    if (origin && destination) {
      setShowRoutePopup(true);
    }
  }, [origin, destination]);

  // 경로 유형 확인하고 적절한 API 호출하기
  const calculateRoute = useCallback(async () => {
    if (!origin || !destination) return;

    setIsRouteCalculated(false);

    try {
      if (isStation(origin) && isStation(destination)) {
        await calculateStationToStation();
      } else if (isStation(origin)) {
        await calculateStationToDestination();
      } else if (isStation(destination)) {
        await calculateOriginToStation();
      } else {
        await calculateFullRoute();
      }
    } catch (error) {
      console.error('경로 계산 중 오류 발생:', error);
      alert('경로를 계산하는 데 실패했습니다.');
    }
  }, [origin, destination]);

  // 역에서 역으로 가는 경로 계산하기
  const calculateStationToStation = useCallback(async () => {
    console.log('역->역 함수 호출 데이터:', { origin, destination });

    try {
      const originInfo = await getStationInfo(origin.lat, origin.lng);
      const destinationInfo = await getStationInfo(destination.lat, destination.lng);

      const requestData = {
        region: originInfo.region,
        startLine: originInfo.line,
        startStation: originInfo.station,
        endLine: destinationInfo.line,
        endStation: destinationInfo.station
      };

      console.log('역->역 API 요청 데이터:', requestData);

      const response = await axiosInstance.post('/nonestep/road/subway-path', requestData);
      console.log('API 응답:', response.data);
      setRouteData(response.data);
      setRouteInfo({
        time: result.globalTravelTime,
        distance: result.globalDistance,
        fare: result.fare,
        stationCount: result.globalStationCount,
        startName: result.globalStartName,
        endName: result.globalEndName,
        driveInfo: result.driveInfoSet.driveInfo,
        exChangeInfo: result.exChangeInfoSet.exChangeInfo,
        stations: result.stationSet.stations,
        isSubwayRoute: true
      });
      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('역 간 경로를 계산하는데 실패했습니다.');
    }
  }, [origin, destination]);

  // 역에서 목적지로 가는 경로 계산하기
  const calculateStationToDestination = useCallback(async () => {
    console.log('역->목적지 함수 호출 데이터:', { origin, destination });
  
    try {
      const originInfo = await getStationInfo(origin.lat, origin.lng);
  
      const requestData = {
        goLatitude: destination.lat,
        goLongitude: destination.lng,
        currentRegion: originInfo.region,
        currentStation: originInfo.station
      };
  
      console.log('역->목적지 API 요청 데이터:', requestData);
  
      const response = await axiosInstance.post('nonestep/road/go-road', requestData);
      console.log('API 응답:', response.data);
  
      if (response.status === 400) {
        alert("15km 이상 거리는 경로를 제공할 수 없습니다.");
        return;
      }
  
      const featureCollection = response.data;
      
      // 총 거리와 시간 계산
      let totalDistance = 0;
      let totalTime = 0;
      featureCollection.features.forEach(feature => {
        totalDistance += feature.properties.distance || 0;
        totalTime += feature.properties.time || 0;
      });
  
      setRouteData(featureCollection);
      setRouteInfo({
        time: Math.round(totalTime / 60), // 분 단위로 변환
        distance: Math.round(totalDistance), // 미터 단위
        startName: origin.name,
        endName: destination.name,
      });
      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('목적지까지의 경로를 계산하는데 실패했습니다.');
    }
  }, [origin, destination]);

  // 출발지에서 역으로 가는 경로 계산하기
  const calculateOriginToStation = useCallback(async () => {
    console.log('출발지->역 함수 호출 데이터:', { origin, destination });

    try {
      const destinationInfo = await getStationInfo(destination.lat, destination.lng);

      const requestData = {
        currentLatitude: origin.lat,
        currentLongitude: origin.lng,
        goRegion: destinationInfo.region,
        goStation: destinationInfo.station
      };

      console.log('출발지->역 API 요청 데이터:', requestData);

      const response = await axiosInstance.post('nonestep/road/go-station', requestData);
      console.log('API 응답:', response.data);
      if (response.status === 400) {
        alert("반경 15km 이상의 거리는 노출되지 않으니 가까운 역으로 재검색 부탁 드립니다.");
        return;
      }
      setRouteData(response.data);
      setRouteInfo({
        time: response.data.result.globalTravelTime,
        distance: response.data.result.globalDistance
      });
      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('역까지의 경로를 계산하는데 실패했습니다.');
    }
  }, [origin, destination]);

  // 출발지에서 목적지까지 전체 경로 계산하기 (역을 경유)
  const calculateFullRoute = useCallback(async () => {
    try {
      const startStation = await getStationInfo(origin.lat, origin.lng);
      const endStation = await getStationInfo(destination.lat, destination.lng);

      const originToStationResponse = await axiosInstance.post('nonestep/road/go-station', {
        currentLatitude: origin.lat,
        currentLongitude: origin.lng,
        goRegion: startStation.region,
        goStation: startStation.station
      });

      const stationToStationResponse = await axiosInstance.post('/nonestep/road/subway-path', {
        region: startStation.region,
        startLine: startStation.line,
        startStation: startStation.station,
        endLine: endStation.line,
        endStation: endStation.station
      });

      const stationToDestinationResponse = await axiosInstance.post('nonestep/road/go-road', {
        goLatitude: destination.lat,
        goLongitude: destination.lng,
        currentRegion: endStation.region,
        currentStation: endStation.station
      });

      const fullRouteData = {
        features: [
          ...(originToStationResponse.data?.features || []),
          ...(stationToStationResponse.data?.features || []),
          ...(stationToDestinationResponse.data?.features || [])
        ]
      };

      setRouteData(fullRouteData);
      setIsRouteCalculated(true);
      setShowRoutePopup(true);
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('전체 경로를 계산하는데 실패했습니다.');
    }
  }, [origin, destination]);
    
  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination, calculateRoute]);

  // 경로 데이터를 Polyline 형식으로 변환하기
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

  // 네비게이션 시작하기
  const handleStartNavigation = () => {
    setShowRoutePopup(false);
    setIsNavigating(true);
    setShowOriginOverlay(false);
    setShowDestinationOverlay(false);
  };

  useEffect(() => {
    if (showRoutePopup) {
      setShowUserLocationOverlay(false);
      setShowOriginOverlay(false);
      setShowDestinationOverlay(false);
    }
  }, [showRoutePopup]);

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
              onClick={() => {
                if (!isNavigating) {
                  setShowUserLocationOverlay(!showUserLocationOverlay);
                  setShowOriginOverlay(false);
                  setShowDestinationOverlay(false);
                  setCenter(userLocation);
                }
              }}
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
        {/* 출발지 마커 및 오버레이 */}
        {origin && !isNavigating && (
          <>
            <MapMarker 
              position={origin} 
              onClick={() => setShowOriginOverlay(!showOriginOverlay)}
            />
            {showOriginOverlay && (
              <CustomOverlayMap position={origin} yAnchor={1.52}>
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
        {/* 도착지 마커 및 오버레이 */}
        {destination && !isNavigating && (
          <>
            <MapMarker 
              position={destination} 
              onClick={() => setShowDestinationOverlay(!showDestinationOverlay)}
            />
            {showDestinationOverlay && (
              <CustomOverlayMap position={destination} yAnchor={1.52}>
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
        {/* 경로 그리기 */}
        {isRouteCalculated && (
          <Polyline
            path={[polylinePath]}
            strokeWeight={7}
            strokeColor={"#007AFF"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
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
          onNavigate={handleStartNavigation}
          origin={origin ? origin.name : ''}
          destination={destination ? destination.name : ''}
          isSubwayRoute={routeInfo.isSubwayRoute} 
        />
      )}
      {/* 빠른 경로 버튼 */}
      {!isNavigating && <QuickRoute userLocation={userLocation} />}
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWay