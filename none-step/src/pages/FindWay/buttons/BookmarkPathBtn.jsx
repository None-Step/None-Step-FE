import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from "@/apis/axiosInstance";
import { useSelector } from 'react-redux';

const ButWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  position: absolute;
  top: 150px;
  left: ${(props) => (props.isQuickRouteVisible ? '14.5rem' : '1rem')};
  z-index: 2;
  width: calc(100% - 15rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const PathButton = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50px;
  height: 32px;
  padding: 6px 12px;
  font-size: 1.4rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.colors.shadow200};

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;

  flex-shrink: 0;
`;

const Star = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.color || props.theme.colors.gray06};
  margin-right: 0.5rem;
`;


const BookmarkPathBtn = ({ onPathOrigin, onPathDestination, isQuickRouteVisible }) => {
  const [bookmarkPathList, setbookmarkPathList] = useState([]);
  const isAuthorized = useSelector((state) => state.member.isAuthorized); // 로그인 상태 가져오기
  
  const fetchBookmarkPaths = async () => {
    try {
      const response = await axiosInstance.get('nonestep/book-mark/path-list');
      // console.log('API 응답:', response.data);
      setbookmarkPathList(response.data);
    } catch (error) {
      // console.error('즐겨찾기 경로 목록을 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchBookmarkPaths();
    }
  }, [isAuthorized]);

  const handleBookmarkPathClick = (bookmark) => {
    if (onPathOrigin && onPathDestination) {
      // 출발지, 도착지 정보를 받아서 처리
      onPathOrigin({
        place_name: bookmark.pathStartNickName,
        x: bookmark.pathStartLongitude,
        y: bookmark.pathStartLatitude,
      });

      onPathDestination({
        place_name: bookmark.pathEndNickName,
        x: bookmark.pathEndLongitude,
        y: bookmark.pathEndLatitude,
      });
    }
  };

  return (
    <ButWrapper isQuickRouteVisible={isQuickRouteVisible}>
      {bookmarkPathList && bookmarkPathList.length > 0 ? (
        bookmarkPathList.map((bookmark) => (
          <PathButton 
            key={bookmark.pathNo}
            // startLatitude={bookmark.startLatitude}
            // startLongitude={bookmark.startLongitude}
            // endLatitude={bookmark.endLatitude}
            // endLongitude={bookmark.endLongitude}
            onClick={() => handleBookmarkPathClick(bookmark)}
          >
            <Star fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974
              5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342
              7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301
              17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076
              9.33995 15.3622L5.36421 18.2507C4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784
              12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274
              6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z"
              fill={bookmark.pathColor} />
            </Star>
            {bookmark.pathStartNickName} -&gt; {bookmark.pathEndNickName}
          </PathButton>
        ))
      ) : null}
    </ButWrapper>
  )
}

export default BookmarkPathBtn