import React, { useState, useEffect, useRef } from 'react'
import { AccuracyMessage, Br, HomeContainer, InBox, Location, ToggleButton, Notice, Strong, ThisStop, LocationTitle } from './LocationTracker.style'
import { RxDotFilled } from "react-icons/rx";
import axiosInstance from '@/apis/axiosInstance'

const LocationTracker = () => {
  const [nearestStation, setNearestStation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const watchIdRef = useRef(null);

  const TIMEOUT_DURATION = 20000;

  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, []);

  const toggleLocationTracking = () => {
    if (isTracking) {
      stopLocationTracking();
    } else {
      startLocationTracking();
    }
  };

  const startLocationTracking = () => {
    setError(null);
    setAccuracy(null);

    if (!navigator.geolocation) {
      setError('사용하시는 브라우저에서 위치 정보 기능을 지원하지 않습니다.');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: TIMEOUT_DURATION,
      maximumAge: 0
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`위치 업데이트: 위도 ${latitude}, 경도 ${longitude}, 정확도: ${accuracy}미터`);
        setAccuracy(accuracy);
        findNearestStation(latitude, longitude);
      },
      (error) => {
        console.error('위치 추적 오류:', error.message);
        setError('위치 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
        setIsTracking(false);
      },
      options
    );

    setIsTracking(true);
  };

  const stopLocationTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const findNearestStation = (latitude, longitude) => {
    console.log(`가장 가까운 역 조회 시작 : ${latitude} ${longitude}`);
    axiosInstance
      .get(`/nonestep/subway/now-station?latitude=${latitude}&longitude=${longitude}`)
      .then(response => {
        const { region, line, station } = response.data;
        setNearestStation({ region, line, station });
        console.log('가장 가까운 역 조회 성공:', response.data);
      })
      .catch(error => {
        console.error('API 호출 오류:', error);
        setError('가장 가까운 역을 찾는 데 실패했습니다. 다시 시도해 주세요.');
      });
  };

  const renderLocationMessage = () => {
    if (error) {
      return error;
    }
    if (nearestStation) {
      return (
        <>
          이번 역은 &nbsp;
          <ThisStop>{nearestStation.station}</ThisStop>
          &nbsp; 역입니다.
        </>
      );
    }
    return isTracking ? '위치를 추적하고 있습니다...' : '토글 버튼을 눌러 위치 추적을 시작하세요';
  };

  return (
    <HomeContainer>
      <InBox>
        <LocationTitle>이번 역은?</LocationTitle>
        <ToggleButton onClick={toggleLocationTracking} $isActive={isTracking}>
          {isTracking ? '추적 중지' : '추적 시작'}
        </ToggleButton>
      </InBox>
      <Location>
        {renderLocationMessage()}
      </Location>
      <Notice><RxDotFilled /> 회원님의 위치에서 가장 가까운 역을 조회한 결과이므로 <Br/> 실제 역과 차이가 발생할 수 있습니다.</Notice>
      <br/>
      <Notice><RxDotFilled /> 시스템 설정에서 해당 브라우저에 위치 권한을 허용해주세요.</Notice>
      <br/>
      <Notice>(<strong>iOS</strong> 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 &gt; 사용할 브라우저의 '나의 위치 공유' 허용)</Notice>
    </HomeContainer>
  )
}

export default LocationTracker