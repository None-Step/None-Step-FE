import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaWalking, FaBicycle, FaSubway } from 'react-icons/fa';
import Close from '@/assets/img/Close.svg';

const PopupContainer = styled.div`
  position: absolute;
  top: calc(70px + 86px);
  left: 0;
  right: 0;
  bottom: 80px;
  background-color: white;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.gray06};
  color: ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.gray02};
  font-weight: ${(props) => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const RouteOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
`;

const RouteInfo = styled.div``;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RouteType = styled.h4`
  font-size: 1.6rem;
  margin: 0;
`;

const RouteDetail = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray02};
  margin: 5px 0 0 0;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabContent = styled.div`
  display: ${(props) => props.$active ? 'block' : 'none'};
`;

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


const FindWayPopup = ({ routeInfo, onClose, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('도보 및 자전거');

    // 자전거 메시지 설정
    const bikeMessage = routeInfo.bikeTime > 0 
    ? `거리 ${routeInfo.bikeDistance}m` 
    : routeInfo.bikeMessage || "근처에 자전거 보관소가 없습니다.";


  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="닫기 버튼" />
      </CloseButton>
      <TabContainer>
        <Tab $active={activeTab === '도보 및 자전거'} onClick={() => setActiveTab('도보 및 자전거')}>
          도보 및 자전거
        </Tab>
        <Tab $active={activeTab === '지하철 코스'} onClick={() => setActiveTab('지하철 코스')}>
          지하철 코스
        </Tab>
      </TabContainer>
      <TabContent $active={activeTab === '도보 및 자전거'}>
        <RouteOption>
          <RouteInfo>
            <IconContainer>
              <FaWalking />
              <RouteType>도보 {routeInfo.walkTime}</RouteType>
            </IconContainer>
            <RouteDetail>거리 {routeInfo.walkDistance}</RouteDetail>
          </RouteInfo>
          <Button onClick={() => onNavigate('walk')}>
            <FaArrowRight />
          </Button>
        </RouteOption>
        <RouteOption>
          <RouteInfo>
            <IconContainer>
              <FaWalking />
              <FaBicycle />
              <RouteType>
                도보 + 자전거 {routeInfo.totalTime}
              </RouteType>
            </IconContainer>
            <RouteDetail>도보 {routeInfo.walkDistance} + 자전거 {routeInfo.bikeDistance}</RouteDetail>
            {routeInfo.bikeMessage && <RouteDetail>{routeInfo.bikeMessage}</RouteDetail>}
          </RouteInfo>
            <Button onClick={() => onNavigate('bike')}>
              <FaArrowRight />
            </Button>
        </RouteOption>
      </TabContent>
      <TabContent $active={activeTab === '지하철 코스'}>
        {routeInfo.subwayRoute ? (
          <RouteOption>
            <RouteInfo>
              <IconContainer>
                <FaSubway />
                <RouteType>지하철 {formatTime(routeInfo.subwayRoute.globalTravelTime)}</RouteType>
              </IconContainer>
              <RouteDetail>총 거리 {formatDistance(routeInfo.subwayRoute.globalDistance * 1000)}</RouteDetail>
              <RouteDetail>요금 {routeInfo.subwayRoute.fare}원</RouteDetail>
            </RouteInfo>
            <Button onClick={() => onNavigate('subway')}>
              <FaArrowRight />
            </Button>
          </RouteOption>
        ) : (
          <RouteDetail>이용 가능한 지하철 경로가 없습니다.</RouteDetail>
        )}
      </TabContent>
    </PopupContainer>
  );
};

export default FindWayPopup;