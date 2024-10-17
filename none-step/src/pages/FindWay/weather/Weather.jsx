import React, { useState } from 'react';
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

export const WeatherPreview = ({ onClick, $viewportHeight }) => {
  return (
    <MinWeather $viewportHeight={$viewportHeight} onClick={onClick}>
      <WeatherImg src={Sunny} alt={Sunny} />
      <WeatherInfo>{'맑음'}</WeatherInfo>
      <Temperature>{'25˚'}</Temperature>
    </MinWeather>
  );
};

export const WeatherPopup = ({ onClose }) => {
  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="닫기 버튼" />
      </CloseButton>

      <RouteOption>
            <WeatherBox>
              <PositionWrapper>
                <RouteType>현재 위치</RouteType>
                <WeatherBlue>현재 날씨</WeatherBlue>
              </PositionWrapper>
              <PositionWrapper>
                <WeatherBlack>{'맑음'}</WeatherBlack>
                <WeatherBlack>
                  {'강수량'} &nbsp;
                  <WeatherInfo>{`100mm`}</WeatherInfo>
                </WeatherBlack>
                <WeatherBlack>
                  {'풍속'} &nbsp;
                  <WeatherInfo>{`10m/s`}</WeatherInfo>
                </WeatherBlack>
              </PositionWrapper>
          {/* {isFlooding && ( */}
          <Flooding>
            <Warning>
              <img src={WarningIcon} alt="경고" />
              침수 주의
            </Warning>
            최근 침수 피해가 있었던 지역입니다.
            <Hidden>안전에 유의하세요.</Hidden>
          </Flooding>
          {/* )} */}
            </WeatherBox>

            <IconWrapper>
              <WeatherImg src={Sunny} alt={Sunny} />
              <img src={Slash} alt={Slash} />
              <Temperature>{'25˚'}</Temperature>
            </IconWrapper>

      </RouteOption>

      <RouteOption>
        <FlexCenter>
          <WeatherBlue>1시간 뒤</WeatherBlue>

          <PositionWrapper>
            <IconWrapper>
              <WeatherImg src={Sunny} alt={Sunny} />
              <img src={Slash} alt={Slash} />
              <Temperature>{'25˚'}</Temperature>
            </IconWrapper>

            <ColLeft>
              <WeatherBlack>{'맑음'}</WeatherBlack>
              <WeatherBlack>
                {'강수량'} &nbsp;
                <WeatherInfo>{`100mm`}</WeatherInfo>
              </WeatherBlack>
              <WeatherBlack>
                {'풍속'} &nbsp;
                <WeatherInfo>{`10m/s`}</WeatherInfo>
              </WeatherBlack>
            </ColLeft>
          </PositionWrapper>
        </FlexCenter>


        <FlexCenter>
          <WeatherBlue>2시간 뒤</WeatherBlue>

          <PositionWrapper>
            <IconWrapper>
              <WeatherImg src={Sunny} alt={Sunny} />
              <img src={Slash} alt={Slash} />
              <Temperature>{'25˚'}</Temperature>
            </IconWrapper>

            <ColLeft>
              <WeatherBlack>{'맑음'}</WeatherBlack>
              <WeatherBlack>
                {'강수량'} &nbsp;
                <WeatherInfo>{`100mm`}</WeatherInfo>
              </WeatherBlack>
              <WeatherBlack>
                {'풍속'} &nbsp;
                <WeatherInfo>{`10m/s`}</WeatherInfo>
              </WeatherBlack>
            </ColLeft>
          </PositionWrapper>
        </FlexCenter>
      </RouteOption>
    </PopupContainer>
  );
};
