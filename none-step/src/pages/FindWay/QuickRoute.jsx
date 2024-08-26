import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/apis/axiosInstance';
import styled from 'styled-components';
import { 
  ModalBG, 
  WithdrawContainer, 
  Title, 
  Notice, 
  ButWrap, 
  SeconBut, 
  But 
} from '../MyPage/MyPage.style'; // 경로는 실제 파일 위치에 맞게 조정해주세요

const QuickRouteButton = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50px;
  height: 32px;
  padding: 6px 12px;
  font-size: 1.4rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.colors.shadow200};
  position: absolute;
  top: 160px;
  left: 1rem;
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickRoute = ({ userLocation }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 가장 가까운 지하철역 찾기
  const findNearestStation = (lat, lng) => {
    return axiosInstance.get(`/nonestep/subway/now-station?latitude=${lat}&longitude=${lng}`)
      .then(response => response.data)
      .catch(error => {
        console.error('가장 가까운 지하철역 찾기 실패:', error);
        throw new Error('가장 가까운 지하철역을 찾는데 실패했습니다.');
      });
  };

  // 현재 위치에서 지하철역까지의 경로 계산하기
  const calculateRoute = (currentLat, currentLng, region, station) => {
    return axiosInstance.post('nonestep/road/go-station', {
      currentLatitude: currentLat,
      currentLongitude: currentLng,
      goRegion: region,
      goStation: station
    })
      .then(response => response.data)
      .catch(error => {
        console.error('경로 계산 실패:', error);
        throw new Error('경로를 계산하는데 실패했습니다.');
      });
  };

  const handleQuickRoute = () => {
    if (!userLocation) {
      alert('현재 위치를 불러올 수 없습니다. 위치 정보 접근을 허용해주세요.');
      return;
    }

    setShowModal(true); // 모달 표시
  };

  const handleConfirm = () => {
    setShowModal(false); // 모달 닫기

    // 1. 가장 가까운 지하철역 찾기
    findNearestStation(userLocation.lat, userLocation.lng)
      .then(stationData => {
        console.log('가장 가까운 지하철역:', stationData);
        const { region, line, station } = stationData;
        
        // 2. 현재 위치에서 찾은 지하철역까지의 경로 계산
        return calculateRoute(userLocation.lat, userLocation.lng, region, station)
          .then(routeData => {
            console.log('계산된 경로:', routeData);
            
            // 3. FindWayNav로 이동하며 경로 데이터 전달
            navigate('/findway/navigate', { 
              state: { 
                origin: {
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                  name: "현재 위치",
                  address: "현재 위치"
                },
                destination: {
                  name: `${station}역`,
                  address: `${region} ${line} ${station}역`
                },
                routeData: routeData
              } 
            });
          });
      })
      .catch(error => {
        console.error('빠른 경로 계산 중 오류 발생:', error);
        alert(error.message || '빠른 경로를 계산하는 데 실패했습니다. 다시 시도해주세요.');
      });
  };

  const handleCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <>
      <QuickRouteButton onClick={handleQuickRoute}>
        가까운 역 바로가기
      </QuickRouteButton>

      {showModal && (
        <>
          <ModalBG onClick={handleCancel} />
          <WithdrawContainer>
            <Title>가까운 역 바로가기 안내</Title>
            <Notice>
              <span>회원님이 검색하신 역의 가장 가까운</span>
              <span>엘리베이터, 에스컬레이터의 위치로</span>
              <span>길 안내를 시작합니다.</span>
            </Notice>
            <ButWrap>
              <SeconBut onClick={handleCancel}>취소</SeconBut>
              <But onClick={handleConfirm}>확인</But>
            </ButWrap>
          </WithdrawContainer>
        </>
      )}
    </>
  );
};

export default QuickRoute;