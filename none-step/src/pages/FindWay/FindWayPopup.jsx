import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import Close from '@/assets/img/Close.svg'

const PopupContainer = styled.div`
  position: absolute;
  top: calc(70px + 86px); // 헤더 높이
  left: 0;
  right: 0;
  bottom: 80px; // 메뉴바 높이
  background-color: white;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
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
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray06};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray02};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const RouteOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
`;

const RouteInfo = styled.div`
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

const SubwayRouteInfo = styled.div`
  margin-top: 20px;
`;

const StationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StationItem = styled.li`
  margin-bottom: 10px;
`;

const FindWayPopup = ({ routeInfo, onClose, onNavigate, origin, destination, isSubwayRoute }) => {
  const [activeTab, setActiveTab] = useState('도보');

  useEffect(() => {
    if (isSubwayRoute) {
      setActiveTab('지하철');
    }
  }, [isSubwayRoute]);

  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>
        <img src={Close} alt='닫기 버튼'/>
      </CloseButton>
      <TabContainer>
        <Tab $active={activeTab === '도보'} onClick={() => setActiveTab('도보')}>
          도보 및 지하철
        </Tab>
        <Tab $active={activeTab === '지하철'} onClick={() => setActiveTab('지하철')}>
          지하철 노선
        </Tab>
      </TabContainer>
      {activeTab === '도보' && (
        <RouteOption>
          <RouteInfo>
            <RouteType>도보 {routeInfo.time}분</RouteType>
            <RouteDetail>도보 길이 {routeInfo.distance}m</RouteDetail>
          </RouteInfo>
          <Button onClick={onNavigate}>
            <FaArrowRight />
          </Button>
        </RouteOption>
      )}
      {activeTab === '지하철' && (
        <SubwayRouteInfo>
          <RouteType>{origin} → {destination}</RouteType>
          <RouteDetail>총 {routeInfo.time}분 | {routeInfo.distance}km | {routeInfo.fare}원</RouteDetail>
          <StationList>
            {routeInfo.stations.map((station, index) => (
              <StationItem key={index}>
                {station.startName} → {station.endName} ({station.travelTime}분)
              </StationItem>
            ))}
          </StationList>
          {routeInfo.exChangeInfo.map((exchange, index) => (
            <RouteDetail key={index}>
              환승: {exchange.startName}역에서 {exchange.laneName}으로 환승 (도보 {exchange.exWalkTime}초)
            </RouteDetail>
          ))}
        </SubwayRouteInfo>
      )}
    </PopupContainer>
  );
};

export default FindWayPopup;
