import React, { useState, useEffect, useRef } from 'react';
import { SearchIndex, SearchBox, SearchForm, Hr } from './FindWay.style';
import styled from 'styled-components';

// ResultList와 ResultItem 스타일 정의
const ResultList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.gray04};
  border-top: none;
  max-height: 120px;
  overflow-y: auto;  /* 스크롤 가능하도록 설정 */
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`;

const ResultItem = styled.li`
  padding: 1rem;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.gray06};
  }
`;

const ResultItemAddress = styled.span`
  font-size: 1.2rem;
  color: #6d6d6d;
  margin-left: 0.7rem;
`

const KakaoMapPlaceSearch = ({ onSelectOrigin, onSelectDestination, originName, destinationName, setOriginName, setDestinationName }) => {
  const [originPlaces, setOriginPlaces] = useState([]);
  const [destinationPlaces, setDestinationPlaces] = useState([]);
  const originResultListRef = useRef(null);
  const destinationResultListRef = useRef(null);

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


  // 외부 클릭 시 검색 결과 닫기
  const handleClickOutside = (event) => {
    if (originResultListRef.current && !originResultListRef.current.contains(event.target)) {
      setOriginPlaces([]);
    }
    if (destinationResultListRef.current && !destinationResultListRef.current.contains(event.target)) {
      setDestinationPlaces([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SearchBox>
      <SearchForm onSubmit={handleOriginSubmit}>
        <SearchIndex
          type="text"
          value={originName}
          onChange={(e) => setOriginName(e.target.value)}
          placeholder="출발지를 입력하세요"
        />
        {originPlaces.length > 0 && (
          <ResultList ref={originResultListRef}>
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
          onChange={(e) => setDestinationName(e.target.value)}
          placeholder="도착지를 입력하세요"
        />
        {destinationPlaces.length > 0 && (
          <ResultList ref={destinationResultListRef}>
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