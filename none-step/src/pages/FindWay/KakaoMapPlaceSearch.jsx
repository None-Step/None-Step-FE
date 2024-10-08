import React, { useState, useEffect, useRef } from 'react';
import { SearchIndex, SearchBox, SearchForm, Hr } from './FindWay.style';
import styled from 'styled-components';

const ResultContainer = styled.div`
  padding-bottom: 3rem;
  position: absolute;
  top: 101%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.gray04};
  border-top: none;
`;

const ContaiverClose = styled.p`
  position: absolute;
  bottom: 1.2rem;
  right: 1rem;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.primary};
  background-color: white;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.primary};
`;

const BookmarkResultList = styled.ul`
  border-top: none;
  max-height: 120px;
  overflow-y: auto;  /* 스크롤 가능하도록 설정 */
  list-style: none;
  z-index: 9;
`;

const ResultList = styled(BookmarkResultList)`
  position: absolute;
  top: 101%;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;
`

const ResultItem = styled.li`
  padding: 1rem;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.gray06};
  }
  transition: all .4s;

  display: flex;
  align-items: center;
`;

const ResultItemAddress = styled.span`
  font-size: 1.2rem;
  color: #6d6d6d;
  margin-left: 0.7rem;
`;

const Star = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.color || props.theme.colors.gray06};
  margin-right: 1.4rem;
`;

const KakaoMapPlaceSearch = ({ onSelectOrigin, onSelectDestination, originName, destinationName, setOriginName, setDestinationName, bookmarkedPlaces, pathOrigin, pathDestination }) => {
  const [originPlaces, setOriginPlaces] = useState([]);
  const [destinationPlaces, setDestinationPlaces] = useState([]);
  const [isOriginFocused, setIsOriginFocused] = useState(false); // 출발지 input에 포커스가 있는지 여부
  const [isDestinationFocused, setIsDestinationFocused] = useState(false); // 도착지 input에 포커스가 있는지 여부
  const [resultContainerOn, setResultContainerOn] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState(bookmarkedPlaces);

  // 키워드가 지하철역인지 확인하기
  const isSubwayStation = (keyword) => {
    const subwayKeywords = ['역', '선', '철도', '라인', '전철', 'GTX-A'];
    if (keyword === '동탄역') return true;

    const keywordCount = subwayKeywords.reduce((count, subwayKeyword) => {
      return keyword.includes(subwayKeyword) ? count + 1 : count;
    }, 0);

    return keywordCount >= 2;
  };

  // 장소 검색하기
  const searchPlaces = (keyword, isOrigin) => {
    if (!keyword.trim()) {
      alert('장소를 입력해주세요.');
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const results = data.map((place) => ({
          ...place,
          isStation: isSubwayStation(place.place_name),
        }));
        if (isOrigin) {
          setOriginPlaces(results);
        } else {
          setDestinationPlaces(results);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        if (isOrigin) {
          setOriginPlaces([]);
        } else {
          setDestinationPlaces([]);
        }
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
        if (isOrigin) {
          setOriginPlaces([]);
        } else {
          setDestinationPlaces([]);
        }
      }
    });
  };

  // 출발지 검색 제출하기
  const handleOriginSubmit = (e) => {
    e.preventDefault();
    searchPlaces(originName, true);
  };

  // 도착지 검색 제출하기
  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    searchPlaces(destinationName, false);
  };

  // 검색 결과 클릭 시 처리
  const handleOriginResultClick = (place) => {
    onSelectOrigin(place);
    setOriginName(place.place_name);
    setOriginPlaces([]); // 검색 결과 리스트를 초기화
  };

  const handleDestinationResultClick = (place) => {
    onSelectDestination(place);
    setDestinationName(place.place_name);
    setDestinationPlaces([]); // 검색 결과 리스트를 초기화
  };


  // 북마크 관련 -------------------------------------------------------

  // 출발지 입력 포커스 핸들러
  const handleOriginFocus = () => {
    setIsOriginFocused(true);
    setIsDestinationFocused(false);
    setResultContainerOn(true);
  };

  // 도착지 입력 포커스 핸들러
  const handleDestinationFocus = () => {
    setIsDestinationFocused(true);
    setIsOriginFocused(false);
    setResultContainerOn(true);
  };

  // 목록 닫기 클릭 핸들러 추가
  const handleCloseResultContainer = () => {
    setResultContainerOn(false);  // 리스트 닫기
  };

  // 즐겨찾기 클릭 핸들러
  const handleBookmarkClick = (bookmark) => {
    if (isOriginFocused) {
      // 출발지에 즐겨찾기 데이터 설정
      onSelectOrigin({
        place_name: bookmark.placeNickName,
        address_name: bookmark.placeAddress,
        x: bookmark.placeLongitude,
        y: bookmark.placeLatitude,
      });
      setOriginName(bookmark.placeNickName);
    } else if (isDestinationFocused) {
      // 목적지에 즐겨찾기 데이터 설정
      onSelectDestination({
        place_name: bookmark.placeNickName,
        address_name: bookmark.placeAddress,
        x: bookmark.placeLongitude,
        y: bookmark.placeLatitude,
      });
      setDestinationName(bookmark.placeNickName);
    }
    setResultContainerOn(false); // 북마크 클릭 시 목록 닫기
  };

  // useEffect로 bookmarkedPlaces가 변경될 때마다 bookmarkedList를 업데이트
  useEffect(() => {
    setBookmarkedList(bookmarkedPlaces);
  }, [bookmarkedPlaces]);

  const handleInputChange = (e, isOrigin) => {
    if (isOrigin) {
      setOriginName(e.target.value);
    } else {
      setDestinationName(e.target.value);
    }
    setResultContainerOn(false);  // 입력이 변경될 때 목록 닫기
  };

  // 경로 즐겨찾기 -------------------------------------------------------
  // 새로운 출발지/도착지 데이터가 들어왔을 때 input 업데이트
  useEffect(() => {
    if (pathOrigin) {
      setOriginName(pathOrigin.place_name);
      onSelectOrigin(pathOrigin);
    }
  }, [pathOrigin]);
  
  useEffect(() => {
    if (pathDestination) {
      setDestinationName(pathDestination.place_name);
      onSelectDestination(pathDestination);
    }
  }, [pathDestination]);

  return (
    <SearchBox>
      <SearchForm onSubmit={handleOriginSubmit}>
        <SearchIndex
          type="text"
          value={originName}
          onChange={(e) => handleInputChange(e, true)}
          placeholder="출발지를 입력하세요"
          onFocus={handleOriginFocus} // 출발지 포커스 시 실행
        />
        {/* 포커스 상태일 때만 즐겨찾기 목록 표시 */}
        {resultContainerOn && isOriginFocused && bookmarkedPlaces.length > 0 && (
          <ResultContainer>
            <BookmarkResultList>
              {bookmarkedList.map((bookmark) => (
                <ResultItem key={bookmark.placeNo} onClick={() => handleBookmarkClick(bookmark, true)}>
                  <Star fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974
                    5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342
                    7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301
                    17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076
                    9.33995 15.3622L5.36421 18.2507C 4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784 12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274 6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z" 
                    fill={bookmark.placeColor} 
                  />
                </Star>
                  {bookmark.placeNickName} <ResultItemAddress>{bookmark.placeAddress}</ResultItemAddress>
                </ResultItem>
              ))}
            </BookmarkResultList>
            <ContaiverClose onClick={handleCloseResultContainer}>목록 닫기</ContaiverClose>
          </ResultContainer>
        )}
        {/* 검색 결과 표시 */}
        {originPlaces.length > 0 && (
          <ResultList>
            {originPlaces.map((place) => (
              <ResultItem key={place.id} onClick={() => handleOriginResultClick(place)}>
                {place.place_name} <ResultItemAddress>{place.address_name}</ResultItemAddress>
              </ResultItem>
            ))}
          </ResultList>
        )}
      </SearchForm>
      <Hr/>
      <SearchForm onSubmit={handleDestinationSubmit}>
        <SearchIndex
          type="text"
          value={destinationName}
          onChange={(e) => handleInputChange(e, false)}
          placeholder="도착지를 입력하세요"
          onFocus={handleDestinationFocus} // 목적지 포커스 시 실행
        />
        {/* 포커스 상태일 때만 즐겨찾기 목록 표시 */}
        {resultContainerOn && isDestinationFocused && bookmarkedPlaces.length > 0 && (
          <ResultContainer>
            <BookmarkResultList>
              {bookmarkedList.map((bookmark) => (
                <ResultItem key={bookmark.placeNo} onClick={() => handleBookmarkClick(bookmark, false)}>
                  <Star fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974
                    5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342
                    7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301
                    17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076
                    9.33995 15.3622L5.36421 18.2507C 4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784 12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274 6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z" 
                    fill={bookmark.placeColor} 
                  />
                </Star>
                {bookmark.placeNickName} <ResultItemAddress>{bookmark.placeAddress}</ResultItemAddress>
              </ResultItem>
            ))}
          </BookmarkResultList>
          <ContaiverClose onClick={handleCloseResultContainer}>목록 닫기</ContaiverClose>
          </ResultContainer>
      )}
        {/* 검색 결과 표시 */}
        {destinationPlaces.length > 0 && (
          <ResultList>
            {destinationPlaces.map((place) => (
              <ResultItem key={place.id} onClick={() => handleDestinationResultClick(place)}>
                {place.place_name} <ResultItemAddress>{place.address_name}</ResultItemAddress>
              </ResultItem>
            ))}
          </ResultList>
        )}
      </SearchForm>
    </SearchBox>
  );
};

export default KakaoMapPlaceSearch;