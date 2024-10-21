import React, { useMemo, useState } from 'react';
import Sunny from './icons/sunny.svg';
import Cloudy from './icons/cloudy.svg';
import Lightning from './icons/lightning.svg';
import LittleCloudy from './icons/little-cloudy.svg';
import SnowRainy from './icons/snow-rainy.svg';
import SnowWindy from './icons/snow-windy.svg';
import Snowy from './icons/snowy.svg';
import Windy from './icons/windy.svg';
import Slash from './icons/slash.svg';
import WarningIcon from '../weather/icons/warning.svg';

import {
  IconWrapper,
  InfoWrapper,
  MinWeather,
  PositionWrapper,
  Temperature,
  WeatherImg,
  WeatherInfo,
  WeatherBlue,
  WeatherBlack,
  WeatherBox,
  Warning,
  Flooding,
  Br,
  Hidden,
  FlexCenter,
  ColLeft,
} from './Weather.style';
import {
  CloseButton,
  PopupContainer,
  RouteInfo,
  RouteOption,
  RouteType,
  Tab,
  TabContainer,
  TabContent,
} from '../popup/FindWayPopup.style';
import Close from '@/assets/img/Close.svg';

// FE에서 필요한 형태로 새로운 객체 만들기 ---------------------------------------
// 1. 날씨 API 응답을 시간별로 데이터를 묶어서 객체 형태로 반환
const groupByTime = weatherData => {
  return weatherData.reduce((acc, item) => {
    const { fcstTime } = item;
    if (!acc[fcstTime]) acc[fcstTime] = [];
    acc[fcstTime].push(item);
    return acc;
  }, {});
};

// 2. 1에서 묶은 객체를 카테고리별로 정리하고 카테고리 값에 해당하는 내용으로 치환하기
// [낙뢰 > 강수형태 > 하늘 상태]
const mergeWeatherData = timeData => {
  let category = 'SKY';
  let fcstValue = '맑음';
  let rainFall = null;
  let windSpeed = null;
  let lightning = null;
  let temperature = null;

  timeData.forEach(item => {
    const { category: cat, fcstValue: value } = item;
    switch (cat) {
      case 'LGT':
        if (value !== '0') {
          lightning = `${value}kA`;
          category = 'LGT';
          fcstValue = '낙뢰';
        }
        break;
      case 'PTY':
        if (value !== '0') {
          category = 'PTY';
          fcstValue = getPrecipitationText(value);
        }
        break;
      case 'SKY':
        if (category === 'SKY') {
          fcstValue = getSkyText(value);
        }
        break;
      case 'RN1':
        rainFall = `${value}mm`;
        break;
      case 'WSD':
        windSpeed = `${value}m/s`;
        break;
      case 'T1H':
        temperature = `${value}˚`;
        break;
      default:
        break;
    }
  });

  return { category, fcstValue, rainFall, windSpeed, lightning, temperature };
};

// 하늘 상태 텍스트 변환 함수
const getSkyText = value => {
  switch (value) {
    case '1':
      return '맑음';
    case '3':
      return '구름 많음';
    case '4':
      return '흐림';
    default:
      return '';
  }
};

// 강수 형태 텍스트 변환 함수
const getPrecipitationText = value => {
  switch (value) {
    case '1':
      return '비';
    case '2':
      return '비/눈';
    case '3':
      return '눈';
    case '5':
      return '빗방울';
    case '6':
      return '빗방울/눈날림';
    case '7':
      return '눈날림';
    default:
      return '';
  }
};

const getWeatherIcon = value => {
  switch (value) {
    case '맑음':
      return Sunny;
    case '구름 많음':
      return LittleCloudy;
    case '흐림':
      return Cloudy;
    case '비':
      return LittleCloudy;
    case '비/눈':
      return SnowRainy;
    case '눈':
      return Sunny;
    case '빗방울':
      return Sunny;
    case '빗방울/눈날림':
      return Snowy;
    case '눈날림':
      return SnowWindy;
    case '낙뢰':
      return Lightning;
    default:
      return '';
  }
};

// 3. 정리된 데이터 취합
const processWeatherData = weatherData => {
  const groupedData = groupByTime(weatherData);
  const times = Object.keys(groupedData).sort();
  const firstTime = times[0]; // 첫 번째 시간을 기준으로 설정

  // 첫 번째 시간부터 +1시간씩
  return [
    { time: firstTime, ...mergeWeatherData(groupedData[firstTime]) },
    {
      time: (parseInt(firstTime) + 100).toString().padStart(4, '0'),
      ...mergeWeatherData(
        groupedData[(parseInt(firstTime) + 100).toString().padStart(4, '0')] ||
          []
      ),
    },
    {
      time: (parseInt(firstTime) + 200).toString().padStart(4, '0'),
      ...mergeWeatherData(
        groupedData[(parseInt(firstTime) + 200).toString().padStart(4, '0')] ||
          []
      ),
    },
  ];
};

export const WeatherPreview = ({ onClick, $viewportHeight, weatherData }) => {
  const currentWeather = useMemo(() => {
    if (!weatherData || weatherData.length === 0) return null;
    const processedData = processWeatherData(weatherData);
    return processedData[0];
  }, [weatherData]);
  // console.log(currentWeather);

  if (!currentWeather) return null;

  return (
    <MinWeather $viewportHeight={$viewportHeight} onClick={onClick}>
      <WeatherImg
        src={getWeatherIcon(currentWeather.fcstValue)}
        alt={currentWeather.fcstValue}
      />
      <WeatherInfo>{currentWeather.fcstValue}</WeatherInfo>
      <Temperature>{currentWeather.temperature}</Temperature>
    </MinWeather>
  );
};

export const WeatherPopup = ({
  onClose,
  weatherData,
  placeName,
  firstTime,
}) => {
  const processedWeatherData = useMemo(() => {
    if (!weatherData) return [];
    return processWeatherData(weatherData);
  }, [weatherData]);

  if (processedWeatherData.length === 0) return null;

  const currentWeather = processedWeatherData[0];

  const validFirstTime = firstTime
    ? firstTime.toString().padStart(4, '0')
    : '0000';

  // 현재 시간 계산 (오전/오후 처리)
  const hour = parseInt(validFirstTime.slice(0, 2), 10); // 시간 부분 추출 후 숫자 변환
  const period = hour >= 12 ? '오후' : '오전'; // 오전/오후 구분
  const displayHour = hour % 12 === 0 ? 12 : hour % 12; // 12시 예외 처리

  const currentTime = `${period} ${displayHour}`;

  // 1시간 뒤, 2시간 뒤 계산 (24시간 형태에서 순환)
  const oneHourLaterHour = (hour + 1) % 24;
  const twoHoursLaterHour = (hour + 2) % 24;

  // 오전/오후와 시 표시
  const oneHourLater = `${oneHourLaterHour >= 12 ? '오후' : '오전'} ${
    oneHourLaterHour % 12 === 0 ? 12 : oneHourLaterHour % 12
  }`;
  const twoHoursLater = `${twoHoursLaterHour >= 12 ? '오후' : '오전'} ${
    twoHoursLaterHour % 12 === 0 ? 12 : twoHoursLaterHour % 12
  }`;

  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="닫기 버튼" />
      </CloseButton>

      <RouteOption>
        <WeatherBox>
          <PositionWrapper>
            <RouteType>{placeName ? placeName : '현재 위치'}</RouteType>
            <WeatherBlue>{currentTime}시 날씨</WeatherBlue>
          </PositionWrapper>
          <PositionWrapper>
            <WeatherBlack>{currentWeather.fcstValue}</WeatherBlack>
            {currentWeather.rainFall && (
              <WeatherBlack>
                강수량 <WeatherInfo>{currentWeather.rainFall}</WeatherInfo>
              </WeatherBlack>
            )}
            {currentWeather.windSpeed && (
              <WeatherBlack>
                풍속 <WeatherInfo>{currentWeather.windSpeed}</WeatherInfo>
              </WeatherBlack>
            )}
            {currentWeather.lightning && (
              <Flooding>
                <Warning>
                  <img src={WarningIcon} alt="경고" />
                  낙뢰 주의
                </Warning>
                낙뢰 발생 가능성이 있습니다.
              </Flooding>
            )}
          </PositionWrapper>
        </WeatherBox>
        <IconWrapper>
          <WeatherImg
            src={getWeatherIcon(currentWeather.fcstValue)}
            alt={currentWeather.fcstValue}
          />
          <img src={Slash} alt="구분선" />
          <Temperature>{currentWeather.temperature}</Temperature>
        </IconWrapper>
      </RouteOption>

      {processedWeatherData.slice(1).map((weather, index) => (
        <RouteOption key={index}>
          <WeatherBox>
            <PositionWrapper>
              <WeatherBlue>
                {index === 0
                  ? `${oneHourLater}시 날씨`
                  : `${twoHoursLater}시 날씨`}
              </WeatherBlue>
            </PositionWrapper>
            <PositionWrapper>
              <WeatherBlack>{weather.fcstValue}</WeatherBlack>
              {weather.rainFall && (
                <WeatherBlack>
                  강수량 <WeatherInfo>{weather.rainFall}</WeatherInfo>
                </WeatherBlack>
              )}
              {weather.windSpeed && (
                <WeatherBlack>
                  풍속 <WeatherInfo>{weather.windSpeed}</WeatherInfo>
                </WeatherBlack>
              )}
            </PositionWrapper>
          </WeatherBox>
          <IconWrapper>
            <WeatherImg
              src={getWeatherIcon(weather.fcstValue)}
              alt={weather.fcstValue}
            />
            <img src={Slash} alt="구분선" />
            <Temperature>{weather.temperature}</Temperature>
          </IconWrapper>
        </RouteOption>
      ))}
    </PopupContainer>
  );
};
