import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaWalking, FaBicycle, FaSubway, FaExchangeAlt } from 'react-icons/fa';
import Close from '@/assets/img/Close.svg';
import { theme } from '@/styles/Theme';
import axiosInstance from '@/apis/axiosInstance';
import { useSelector } from 'react-redux';
import BookmarkPathModal from './modal/BookmarkPathModal';

const PopupContainer = styled.div`
  position: absolute;
  top: calc(70px + 76px);
  left: 0;
  right: 0;
  bottom: 72px;
  background-color: white;
  padding: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  font-size: 1.6rem;
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
  flex-grow: 1;
`;

const RouteInfo = styled.div`
  flex-grow: 1;
`;

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
  margin-left: auto;
`;

const BookmarkBtn = styled(Button)`
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.primary};
`

const OverviewItem = styled.div`
  text-align: center;
`;

const OverviewLabel = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.gray01};
  margin: 0;
`;

const OverviewValue = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 5px 0 0;
`;

const StationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
`;

const StationItem = styled.li`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-bottom: 15px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 4px; /* 점의 중앙에 맞추기 위해 조정 */
    bottom: -15px;
    width: 2px;
    background-color: ${(props) => props.color || props.theme.colors.gray03};
    z-index: 0;
  }

  &:last-child:before {
    display: none; /* 마지막 역에서는 선을 표시하지 않음 */
  }
`;

const StationDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color || props.theme.colors.gray03};
  margin-right: 10px;
  z-index: 1; /* 선 위에 점을 표시하기 위해 z-index 조정 */
`;

const StationInfo = styled.div`
  flex: 1;
`;

const StationName = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;

const TransferInfo = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.gray01};
  margin: 5px 0 0;
  display: flex;
  justify-content: left;
  align-items: center;
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
  padding-bottom: 35px;
  border-bottom: 1px solid ${props => props.theme.colors.gray06};
`;

const LaneName = styled.span`
  margin-left: 5px; 
  font-size: 1.2rem;
  padding: 0.25rem 0.6rem;
  color: white;
  border-radius: 50px;
`;


// 호선 색상을 가져오기
const getLineColor = (lineName, region) => {
  if (!lineName || !region) return theme.colors.gray03; // 기본 색상 반환

  // console.log('getLineColor 데이터 / 호선 :', lineName,'지역 :',region);

  // 지역별로 각 라인의 명칭에 맞게 색상을 매칭
  switch(region) {
    case '수도권':
      if (lineName.includes('1호선')) return theme.capitalLines.one;
      if (lineName.includes('2호선')) return theme.capitalLines.two;
      if (lineName.includes('3호선')) return theme.capitalLines.three;
      if (lineName.includes('4호선')) return theme.capitalLines.four;
      if (lineName.includes('5호선')) return theme.capitalLines.five;
      if (lineName.includes('6호선')) return theme.capitalLines.six;
      if (lineName.includes('7호선')) return theme.capitalLines.seven;
      if (lineName.includes('8호선')) return theme.capitalLines.eight;
      if (lineName.includes('9호선')) return theme.capitalLines.nine;
      if (lineName.includes('공항철도')) return theme.capitalLines.airport;
      if (lineName.includes('경의중앙선')) return theme.capitalLines.gyeonguiJungang;
      if (lineName.includes('경춘선')) return theme.capitalLines.gyeongchun;
      if (lineName.includes('수인분당선')) return theme.capitalLines.suinBundang;
      if (lineName.includes('신분당선')) return theme.capitalLines.shinbundang;
      if (lineName.includes('경강선')) return theme.capitalLines.gyeonggang;
      if (lineName.includes('서해선')) return theme.capitalLines.seohae;
      if (lineName.includes('인천1호선')) return theme.capitalLines.incheon1;
      if (lineName.includes('인천2호선')) return theme.capitalLines.incheon2;
      if (lineName.includes('에버라인')) return theme.capitalLines.everline;
      if (lineName.includes('의정부')) return theme.capitalLines.uijeongbu;
      if (lineName.includes('우이.신설선')) return theme.capitalLines.wooyiShinseol;
      if (lineName.includes('김포골드라인')) return theme.capitalLines.gimpoGold;
      if (lineName.includes('신림선')) return theme.capitalLines.sillim;
      if (lineName.includes('GTXA')) return theme.capitalLines.GTXA;
      break;

    case '부산':
      if (lineName.includes('1호선')) return theme.busanLines.one;
      if (lineName.includes('2호선')) return theme.busanLines.two;
      if (lineName.includes('3호선')) return theme.busanLines.three;
      if (lineName.includes('4호선')) return theme.busanLines.four;
      if (lineName.includes('동해선')) return theme.busanLines.donghae;
      if (lineName.includes('김해경전철')) return theme.busanLines.gimhae;
      break;

    case '대구':
      if (lineName.includes('1호선')) return theme.daeguLines.one;
      if (lineName.includes('2호선')) return theme.daeguLines.two;
      if (lineName.includes('3호선')) return theme.daeguLines.three;
      break;

    case '대전':
      if (lineName.includes('1호선')) return theme.daejeonLines.one;
      break;

    case '광주':
      if (lineName.includes('1호선')) return theme.gwangjuLines.one;
      break;

    default:
      return theme.colors.gray03; // 매칭되는 지역이 없는 경우 기본 색상
  }

  return theme.colors.gray03; // 매칭되지 않은 경우 기본 색상
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

// 환승 시간 포맷 함수
const formatTransferTime = (seconds) => {
  if (seconds < 60) return `${seconds}초`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

// 역 이름 예외 처리하기
const stationNameMapping = {
  // '이수'역으로 통일
  '총신대입구(이수)': '이수'
};

// 예외 처리된 역명을 반환하는 함수
const getMappedStationName = (name) => {
  const mappedName = stationNameMapping[name] || name;
  // console.log(`역명 전환: ${name} -> ${mappedName}`);
  return mappedName;
};

const FindWayPopup = ({ routeInfo, onClose, onNavigate, origin, destination }) => {
  // console.log('넘겨 받은 routeInfo 데이터: ', routeInfo);
  // const [activeTab, setActiveTab] = useState(routeInfo.isStationToStation ? '지하철 경로' : '도보 및 자전거'); // 지하철 경로가 존재하는 경우 기본 탭을 지하철 경로로 설정
  const [activeTab, setActiveTab] = useState('도보 및 자전거');
  const [coloredStations, setColoredStations] = useState([]);

  // console.log('routeInfo 데이터 :', routeInfo);

  // 자전거 메시지 설정
  const bikeMessage = routeInfo.bikeTime > 0 
  ? `거리 ${routeInfo.bikeDistance}m` 
  : routeInfo.bikeMessage || "근처에 자전거 보관소가 없습니다.";

  // 1. 카카오 장소 검색 API로 위경도 받아오기
  const fetchCoordinates = useCallback((stationName, lineName) => {
    return new Promise((resolve, reject) => {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(`${stationName} ${lineName}`, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve({ latitude: data[0].y, longitude: data[0].x });
        } else {
          reject('Error fetching coordinates');
        }
      });
    });
  }, []);

  // 2. 받아온 위경도로 now-station API 지역 정보 받아오기
  const fetchStationRegion = useCallback(async (latitude, longitude) => {
    try {
      const response = await axiosInstance.get(`/nonestep/subway/now-station?latitude=${latitude}&longitude=${longitude}`);
      return response.data.region;
    } catch (error) {
      console.error('Error fetching station region:', error);
      return null;
    }
  }, []);

// 노선 색상 적용하기
const applyLineColors = useCallback(async () => {
  if (!routeInfo.subwayRoute?.driveInfoSet?.driveInfo?.length) return [];

  const updatedStations = [];
  let currentColor = null;
  let currentLineName = null;
  let nextLineName = null;

  for (let i = 0; i < routeInfo.subwayRoute.stationSet.stations.length; i++) {
    const station = routeInfo.subwayRoute.stationSet.stations[i];
    const nextStation = routeInfo.subwayRoute.stationSet.stations[i + 1];

    // 현재 역의 노선 정보 찾기 (이름 매핑을 적용하여 비교)
    // 응답 중 노선 정보를 보내주는 부분이 driveInfoSet뿐이므로
    // driveInfoSet에 저장되어 있는 startName과 현재 (저장중인) 역의 startName을 비교
    const currentLine = routeInfo.subwayRoute.driveInfoSet.driveInfo.find(
      info => {
        const mappedInfoName = getMappedStationName(info.startName);
        const mappedStationName = getMappedStationName(station.startName);
        // console.log(`일치 여부 확인: info.startName ${mappedInfoName}, station.startName ${mappedStationName}`);
        return mappedInfoName === mappedStationName;
      }
    );

    // 다음 역의 노선 정보 찾기 (환승 여부 확인용, 이름 매핑을 적용)
    if (nextStation) {
      const nextLine = routeInfo.subwayRoute.driveInfoSet.driveInfo.find(
        info => getMappedStationName(info.startName) === getMappedStationName(nextStation.startName)
      );
      nextLineName = nextLine ? nextLine.laneName : null;
    } else {
      nextLineName = null;
    }

    // console.log('Processing station:', station.startName, 'Current line:', currentLine?.laneName, 'Next line:', nextLineName);

    if (!currentLine) {
      // console.warn(`해당 역의 호선 정보를 찾을 수 없음 : ${station.startName}`);
      // 노선 정보를 찾지 못한 경우(driveInfoSet에 노선 정보는 출발역, 환승역만 있음) = 호선이 변하지 않은 경우
      // 이전에 설정된 호선 색상, 호선 정보 그대로 저장함
      updatedStations.push({...station, color: currentColor, laneName: currentLineName});
      continue;
    }

    // 현재 역의 노선 정보가 변경된 경우(이전 역과 호선이 다른 경우)
    if (currentLineName !== currentLine.laneName) {
      // 호선 정보 업데이트
      currentLineName = currentLine.laneName;
      try {
        // 현재 역 명 + 호선 명 => 현재 역의 위/경도 가져오기
        const coordinates = await fetchCoordinates(station.startName, currentLine.laneName);
        // 위/경도로 지역(Region) 가져오기
        const stationRegion = await fetchStationRegion(coordinates.latitude, coordinates.longitude);
        // 지역 정보로 호선 색상 가져오기
        currentColor = getLineColor(currentLine.laneName, stationRegion);
      } catch (error) {
        console.error(`Error fetching color for station ${station.startName}:`, error);
        currentColor = currentColor || theme.colors.gray03;
      }
    }

    updatedStations.push({ 
      ...station, 
      color: currentColor, 
      laneName: currentLineName,
      isTransfer: currentLineName !== nextLineName
    });
  }

  return updatedStations;
}, [routeInfo.subwayRoute, fetchCoordinates, fetchStationRegion]);

useEffect(() => {
  applyLineColors().then(updatedStations => {
    // console.log('Updated stations:', updatedStations);
    setColoredStations(updatedStations);
  });
}, [applyLineColors]);

const [isBookmarked, setIsBookmarked] = useState(false);

const handleBookmarkModal = () => {
  setIsBookmarked(!isBookmarked);
}

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
      {routeInfo.isOverDistance ? (
        <RouteDetail>{'반경 20km 이상의 거리는 노출되지 않으니 미 노출 시 가까운 역으로 재검색 부탁 드립니다.' || '도보 경로를 제공할 수 없습니다.'}</RouteDetail>
      ) : (
        <>
          <RouteOption>
            <RouteInfo>
              <IconContainer>
                <FaWalking />
                <RouteType>도보 {routeInfo.walkTime}</RouteType>
              </IconContainer>
              {routeInfo.walkTime === '0분' ? (
                <RouteDetail>반경 20km 이상의 거리는 노출되지 않으니 미 노출 시 가까운 역으로 재검색 부탁 드립니다.</RouteDetail>
              ) : (
                <RouteDetail>거리 {routeInfo.walkDistance}</RouteDetail>
              )}
            </RouteInfo>
            {routeInfo.walkTime !== '0분' && (
              <Button onClick={() => onNavigate('walk')}>
                <FaArrowRight />
              </Button>
            )}
          </RouteOption>
        <RouteOption>
          <RouteInfo>
            <IconContainer>
              <FaWalking />
              <FaBicycle />
              <RouteType>도보 + 자전거 {routeInfo.bikeTotalTime}</RouteType>
            </IconContainer>
            <RouteDetail>
              {/* 도보 {routeInfo.bikeWalkDistance} ({routeInfo.bikeWalkTime}) +
              자전거 {routeInfo.bikeRideDistance} ({routeInfo.bikeRideTime}) */}
            </RouteDetail>
            <RouteDetail>{routeInfo.bikeMessage}</RouteDetail>
          </RouteInfo>
          {routeInfo.walkTime !== '0분' && (
            <Button onClick={() => onNavigate('bike')}>
              <FaArrowRight />
            </Button>
          )}
        </RouteOption>
        {/* 길찾기 경로 북마크 버튼 */}
        <RouteOption>
          <RouteInfo>
            <RouteType>해당 경로 즐겨찾기 추가</RouteType>
            <RouteDetail>{origin.name} -&gt; {destination.name}</RouteDetail>
          </RouteInfo>
          {/* 경로 등록 버튼 */}
          <BookmarkBtn onClick={handleBookmarkModal}>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974 5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342 7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301 17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076 9.33995 15.3622L5.36421 18.2507C4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784 12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274 6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z"
          fill="#007AFF"/>
          </svg>
          </BookmarkBtn>
        </RouteOption>
    </>
  )}
</TabContent>

{isBookmarked && (
  <BookmarkPathModal
    onClick={handleBookmarkModal}  // 모달 닫기 함수
    origin={origin}  // 출발지 이름 전달
    destination={destination}  // 도착지 이름 전달
  />
)}

    <TabContent $active={activeTab === '지하철 경로'}>
      {routeInfo.subwayRoute ? (
        <SubwayRouteInfo>
          <RouteOverview>
            <OverviewItem>
              <OverviewLabel>총 소요시간</OverviewLabel>
              <OverviewValue>{formatTime(routeInfo.subwayRoute.globalTravelTime)}</OverviewValue>
            </OverviewItem>
            <OverviewItem>
              <OverviewLabel>환승 횟수</OverviewLabel>
              <OverviewValue>{routeInfo.subwayRoute.exChangeInfoSet?.exChangeInfo?.length || 0}</OverviewValue>
            </OverviewItem>
            <OverviewItem>
              <OverviewLabel>요금</OverviewLabel>
              <OverviewValue>{routeInfo.subwayRoute.fare}원</OverviewValue>
            </OverviewItem>
            <OverviewItem>
              <OverviewLabel>총 거리</OverviewLabel>
              <OverviewValue>{routeInfo.subwayRoute.globalDistance?.toFixed(1)}km</OverviewValue>
            </OverviewItem>
          </RouteOverview>

          <StationList>
            {coloredStations.map((station, index) => {
              const isTransfer = routeInfo.subwayRoute.exChangeInfoSet?.exChangeInfo?.find(
                transfer => getMappedStationName(transfer.exName) === getMappedStationName(station.endName)
              );
              const nextStation = coloredStations[index + 1];
              const isLineChange = station.laneName !== nextStation?.laneName;

              return (
                <React.Fragment key={index}>
                  <StationItem color={station.color}>
                    <StationDot color={station.color} />
                    <StationInfo>
                      <StationName>
                        {station.startName}
                        <LaneName style={{ 
                          backgroundColor: station.color 
                        }}>
                          {station.laneName}
                        </LaneName>
                      </StationName>
                      {index === 0 && <TransferInfo>출발</TransferInfo>}
                    </StationInfo>
                  </StationItem>
                  <LinePath color={station.color} />
                  {isTransfer && (
                    <StationItem>
                      <StationDot color={nextStation?.color || theme.colors.gray03} />
                      <StationInfo>
                        <StationName>{station.endName}</StationName>
                        <TransferInfo>
                          <FaExchangeAlt style={{ marginRight: '8px' }} /> 
                          {nextStation?.laneName || '다음 호선'}으로 환승
                          {isTransfer.fastTrain && isTransfer.fastDoor && (
                            <>(빠른환승 {isTransfer.fastTrain}-{isTransfer.fastDoor})</>
                          )}
                          {isTransfer.exWalkTime && (
                            <>, 도보 {formatTransferTime(isTransfer.exWalkTime)}</>
                          )}
                        </TransferInfo>
                      </StationInfo>
                    </StationItem>
                  )}
                  {index === coloredStations.length - 1 && (
                    <StationItem>
                      <StationDot color={station.color} />
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
        </SubwayRouteInfo>
      ) : (
        <RouteDetail>이용 가능한 지하철 경로가 없습니다.</RouteDetail>
      )}
    </TabContent>
  </PopupContainer>
);
};

export default FindWayPopup;