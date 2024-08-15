import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageWrapper } from './FindWay.style'
import { PageHeader } from '../../components/header/Headers'
import MenuBar from '../../components/menuBar/MenuBar'
import { ArrowButton, ContentWrapper, LocationInfo, LocationText, RouteDetail, RouteInfo, RouteOption, RouteType } from './FindWayConfirm.style'
import RightIcon from '@/assets/img/rightIcon.svg'
import axiosInstance from '../../apis/axiosInstance'

const FindWayConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { origin, destination } = location.state || {};
  const [routeData, setRouteData] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoute = () => {
      if (!destination || !destination.lat || !destination.lng) {
        setError('목적지 정보가 없습니다.');
        setIsLoading(false);
        return;
      }
      
      // 1. 목적지 위치(Region), 역명 받아오기
      axiosInstance
        .get(`/nonestep/subway/now-station?latitude=${destination.lat}&longitude=${destination.lng}`)
        .then(response => {
          const { region, station } = response.data;
          // 2. 현재 위치 위/경도, 목적지 주소 보내고 경로 받기
          return axiosInstance.post('nonestep/road/go-station', {
            currentLatitude: origin.lat,
            currentLongitude: origin.lng,
            goRegion: region,
            goStation: station
          });
        })
        .then(response => {
          const { features } = response.data;
          setRouteData(response.data);  // 전체 응답 데이터 저장
          if (features && features.length > 0) {
            const totalDistance = features.reduce((sum, feature) => sum + feature.properties.distance, 0);
            const totalTime = features.reduce((sum, feature) => sum + feature.properties.time, 0);
            setRouteInfo({
              distance: Math.round(totalDistance),  // m 단위로 반올림
              time: Math.round(totalTime / 60)  // 분 단위로 변환 후 반올림
            });
          } else {
            setError('경로를 찾을 수 없습니다.');
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error('API 호출 오류:', error);
          setError('데이터를 가져오는데 실패했습니다.');
          setIsLoading(false);
        });
    };

    if (destination) {
      fetchRoute();
    } else {
      setError('목적지 정보가 없습니다.');
      setIsLoading(false);
    }
  }, [destination, origin]);

  const handleRouteSelect = () => {
    navigate('/findway/navigate', { state: { origin, destination, routeData } });
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <PageWrapper>
      <PageHeader title="길찾기" />
      <ContentWrapper>
        <LocationInfo>
          <LocationText>출발지 : {origin?.name || '현위치'}</LocationText>
          <LocationText>도착지 : {destination?.name || '목적지 미설정'}</LocationText>
        </LocationInfo>
      </ContentWrapper>
      {error ? (
        <RouteOption>
          <RouteInfo>
            <RouteType>경로를 찾을 수 없습니다.</RouteType>
            <RouteDetail>{error}</RouteDetail>
          </RouteInfo>
        </RouteOption>
      ) : routeInfo && (
        <RouteOption onClick={handleRouteSelect}>
          <RouteInfo>
            <RouteType>도보 {routeInfo.time}분</RouteType>
            <RouteDetail>도보 길이 {routeInfo.distance}m</RouteDetail>
          </RouteInfo>
          <ArrowButton>
            <img src={RightIcon} alt='경로 안내 바로가기'/>
          </ArrowButton>
        </RouteOption>
      )}
      <MenuBar />
    </PageWrapper>
  )
}

export default FindWayConfirm