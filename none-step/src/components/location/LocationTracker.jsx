import React, { useState, useEffect, useRef } from 'react'
import { Title } from '@/pages/MyPage/MyPage.style'
import { AccuracyMessage, Br, HomeContainer, InBox, Location, LocationBut, Notice, Strong, ThisStop } from './LocationTracker.style'
import LocationIcon from '@/assets/img/MapPin.svg'
import axiosInstance from '@/apis/axiosInstance'
import { RxDotFilled } from "react-icons/rx";

const LocationTracker = () => {
  // 상태 관리를 위한 useState 훅 사용
  const [nearestStation, setNearestStation] = useState(null); // 가장 가까운 역 정보
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [hasSearched, setHasSearched] = useState(false); // 검색 시도 여부
  const [accuracy, setAccuracy] = useState(null); // 위치 정확도
  const timeoutRef = useRef(null); // 타임아웃 참조를 위한 useRef 훅
  const TIMEOUT_DURATION = 20000; // 타임아웃 시간 설정 (20초)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 현재 위치 가져오기 함수
  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setAccuracy(null); // 새 위치 요청 시 정확도 초기화
    console.log('위치 조회 시작');

    // 브라우저의 geolocation 지원 여부 확인
    if (!navigator.geolocation) {
      setError('사용하시는 브라우저에서 위치 정보 기능을 지원하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 타임아웃 설정
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setError('위치 조회 시간이 초과되었습니다. 다시 시도해 주세요.');
      console.log('위치 조회 시간 초과');
    }, TIMEOUT_DURATION);

    // Geolocation API 옵션
    const options = {
      enableHighAccuracy: true, // 높은 정확도 요청
      timeout: TIMEOUT_DURATION,
      maximumAge: 0 // 캐시된 위치 정보를 사용하지 않음(= 새로 불러오기)
    };

    // geolocation API 사용해서 사용자의 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutRef.current);
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`위치 조회 성공: 위도 ${latitude}, 경도 ${longitude}, 정확도: ${accuracy}미터`);
        setAccuracy(accuracy);
        findNearestStation(latitude, longitude);
      },
      (error) => {
        clearTimeout(timeoutRef.current);
        setError('위치 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
        setIsLoading(false);
        console.log('위치 조회 실패:', error.message);
      },
      options
    );
  };

  // 가장 가까운 역 찾기 함수
  const findNearestStation = (latitude, longitude) => {
    console.log(`가장 가까운 역 조회 시작 : ${latitude} ${longitude}`);
    axiosInstance
      .get(`/nonestep/subway/now-station?latitude=${latitude}&longitude=${longitude}`)
      .then(response => {
        const { region, line, station } = response.data;
        setNearestStation({ region, line, station });
        setIsLoading(false);
        console.log('가장 가까운 역 조회 성공:', response.data);
      })
      .catch(error => {
        console.error('API 호출 오류:', error);
        setError('가장 가까운 역을 찾는 데 실패했습니다. 다시 시도해 주세요.');
        setIsLoading(false);
      });
  };

  // 현재 상태에 따른 메시지 렌더링 함수
  const renderLocationMessage = () => {
    if (isLoading) {
      return '위치를 조회 중입니다...';
    }
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
    if (hasSearched) {
      return '주변에 지하철 역을 찾을 수 없습니다.';
    }
    return '버튼을 눌러 현재 위치를 불러오세요';
  };

  // 위치 정확도
  // const getAccuracyInfo = (accuracy) => {
  //   if (accuracy <= 500) return { message: "높음", color: "#28a745" };
  //   if (accuracy <= 1000) return { message: "보통", color: "#ffa500" };
  //   if (accuracy <= 2000) return { message: "낮음", color: "#dc3545" };
  //   return { message: "매우 낮음", color: "#800020" };
  // };

  // 컴포넌트 렌더링
  return (
    <HomeContainer>
      <InBox>
        <Title>이번 역은?</Title>
        <LocationBut onClick={getCurrentLocation} disabled={isLoading}>
          <img src={LocationIcon} alt='현재 위치 불러오기' />
        </LocationBut>
      </InBox>
      <Location>
        {renderLocationMessage()}
      </Location>
      {/* {accuracy && 
        <AccuracyMessage>
          위치 정확도 : &nbsp; <Strong color={getAccuracyInfo(accuracy).color}>{getAccuracyInfo(accuracy).message}</Strong> 
        </AccuracyMessage>
      } */}

      <Notice><RxDotFilled /> 회원님의 위치에서 가장 가까운 역을 조회한 결과이므로 <Br/> 실제 역과 차이가 발생할 수 있습니다.</Notice>
      <br/>
      <Notice><RxDotFilled /> 시스템 설정에서 해당 브라우저에 위치 권한을 허용해주세요.</Notice>
      <br/>
      <Notice>(<strong>iOS</strong> 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 &gt; 사용할 브라우저의 '나의 위치 공유' 허용)</Notice>

    </HomeContainer>
  )
}

export default LocationTracker