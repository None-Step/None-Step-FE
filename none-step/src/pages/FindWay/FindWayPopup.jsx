import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaWalking, FaBicycle, FaSubway, FaExchangeAlt } from 'react-icons/fa';
import Close from '@/assets/img/Close.svg';
import { theme } from '@/styles/Theme'

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
  color: ${(props) => props.theme.colors.gray01};
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

const OverviewItem = styled.div`
  text-align: center;
`;

const OverviewLabel = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray01};
  margin: 0;
`;

const OverviewValue = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 5px 0 0;
`;

const StationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StationItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StationDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color || props.theme.colors.gray03};
  margin-right: 10px;
`;

const StationInfo = styled.div`
  flex: 1;
`;

const StationName = styled.p`
  font-size: 1.4rem;
  margin: 0;
`;

const TransferInfo = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray01};
  margin: 5px 0 0;
`;

const LinePath = styled.div`
  width: 2px;
  height: 30px;
  background-color: ${props => props.color || props.theme.colors.gray03};
  margin-left: 4px;
`;

const SubwayRouteInfo = styled.div`
  margin-top: 20px;
`;

const TabContent = styled.div`
  display: ${(props) => props.$active ? 'block' : 'none'};
`;

const RouteOverview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;


// 호선 색상을 가져오기
const getLineColor = (lineName) => {
  const lineNumber = lineName.replace(/[^0-9]/g, '');
  return theme.capitalLines[`${lineNumber}`] || theme.colors.gray03;
};

// 시간 포맷 (분 -> 시간 분)
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

const formatDistance = (meters) => {
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(2)}km`;
};


const FindWayPopup = ({ routeInfo, onClose, onNavigate }) => {
  console.log('받은 routeInfo 데이터: ', routeInfo);
  const [activeTab, setActiveTab] = useState('도보 및 자전거');

  // 자전거 메시지 설정
  const bikeMessage = routeInfo.bikeTime > 0 
  ? `거리 ${routeInfo.bikeDistance}m` 
  : routeInfo.bikeMessage || "근처에 자전거 보관소가 없습니다.";

  // 자전거 경로 사용 가능 여부 확인
  const isBikeAvailable = routeInfo.bikeTime !== '0분' && routeInfo.bikeDistance !== '0m';

  const handleNavigate = (routeType) => {
    onNavigate(routeType);
  };

  const subwayRoute =  routeInfo.subwayRoute;

  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="닫기 버튼" />
      </CloseButton>
      <TabContainer>
        <Tab $active={activeTab === '도보 및 자전거'} onClick={() => setActiveTab('도보 및 자전거')}>
          도보 및 자전거
        </Tab>
        <Tab $active={activeTab === '지하철 경로'} onClick={() => setActiveTab('지하철 경로')}>
          지하철 경로
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
        {routeInfo.bikeTime !== '0분' && routeInfo.bikeDistance !== '0m' && (
          <RouteOption>
            <RouteInfo>
              <IconContainer>
                <FaWalking />
                <FaBicycle />
                <RouteType>도보 + 자전거 {routeInfo.bikeTotalTime}</RouteType>
              </IconContainer>
              <RouteDetail>
                도보 {routeInfo.bikeWalkDistance} ({routeInfo.bikeWalkTime}) + 
                자전거 {routeInfo.bikeRideDistance} ({routeInfo.bikeRideTime})
              </RouteDetail>
              <RouteDetail>{routeInfo.bikeMessage}</RouteDetail>
            </RouteInfo>
            <Button onClick={() => onNavigate('bike')}>
              <FaArrowRight />
            </Button>
          </RouteOption>
        )}
      </TabContent>

      <TabContent $active={activeTab === '지하철 경로'}>
        {subwayRoute ? (
          <SubwayRouteInfo>
            <RouteOverview>
              <OverviewItem>
                <OverviewLabel>총 소요시간</OverviewLabel>
                <OverviewValue>{formatTime(subwayRoute.globalTravelTime)}</OverviewValue>
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>환승 횟수</OverviewLabel>
                <OverviewValue>{subwayRoute.exChangeInfoSet?.exChangeInfo?.length || 0}</OverviewValue>
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>요금</OverviewLabel>
                <OverviewValue>{subwayRoute.fare}원</OverviewValue>
              </OverviewItem>
              <OverviewItem>
                <OverviewLabel>총 거리</OverviewLabel>
                <OverviewValue>{subwayRoute.globalDistance?.toFixed(1)}km</OverviewValue>
              </OverviewItem>
            </RouteOverview>

            <StationList>
              {subwayRoute.stationSet?.stations?.map((station, index) => {
                const isTransfer = subwayRoute.exChangeInfoSet?.exChangeInfo?.find(
                  transfer => transfer.exName === station.endName
                );
                const lineColor = getLineColor(subwayRoute.driveInfoSet?.driveInfo[0]?.laneName);

                return (
                  <React.Fragment key={index}>
                    <StationItem>
                      <StationDot color={lineColor} />
                      <StationInfo>
                        <StationName>{station.startName}</StationName>
                        {index === 0 && <TransferInfo>출발</TransferInfo>}
                      </StationInfo>
                    </StationItem>
                    <LinePath color={lineColor} />
                    {isTransfer && (
                      <StationItem>
                        <StationDot color={lineColor} />
                        <StationInfo>
                          <StationName>{station.endName}</StationName>
                          <TransferInfo>
                            <FaExchangeAlt /> {isTransfer.laneName}으로 환승
                            (열차 {isTransfer.fastTrain}-{isTransfer.fastDoor}, 도보 {isTransfer.exWalkTime}초)
                          </TransferInfo>
                        </StationInfo>
                      </StationItem>
                    )}
                    {index === subwayRoute.stationSet.stations.length - 1 && (
                      <StationItem>
                        <StationDot color={lineColor} />
                        <StationInfo>
                          <StationName>{station.endName}</StationName>
                          <TransferInfo>도착</TransferInfo>
                        </StationInfo>
                      </StationItem>
                    )}
                  </React.Fragment>
                );
              })}
            </StationList>
            <Button onClick={() => onNavigate('subway')}>
              <FaArrowRight />
            </Button>
          </SubwayRouteInfo>
        ) : (
          <RouteDetail>이용 가능한 지하철 경로가 없습니다.</RouteDetail>
        )}
      </TabContent>
    </PopupContainer>
  );
};

export default FindWayPopup;