import React, { useState } from 'react';
import { SearchIndex, SearchIcon, SearchBox, SearchForm, Hr } from './FindWay.style';

const KakaoMapPlaceSearch = ({ onSelectOrigin, onSelectDestination }) => {
  const [originKeyword, setOriginKeyword] = useState('');
  const [destinationKeyword, setDestinationKeyword] = useState('');
  const [isOriginStation, setIsOriginStation] = useState(false);
  const [isDestinationStation, setIsDestinationStation] = useState(false);

  // 역 이름에서 호선 정보를 제거하기
  const cleanStationName = (name) => {
    // '역' 이후의 모든 문자 제거 및 앞뒤 공백 제거
    return name.split('역')[0].trim() + '역';
  };

  // 키워드가 지하철역인지 확인하기
  const isSubwayStation = (keyword) => {
    return keyword.includes('역');
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
        const place = data[0];
        const isStation = isSubwayStation(place.place_name);
        const cleanedName = isStation ? cleanStationName(place.place_name) : place.place_name;

        const placeInfo = {
          ...place,
          place_name: cleanedName
        };

        if (isOrigin) {
          setIsOriginStation(isStation);
          onSelectOrigin(placeInfo);
        } else {
          setIsDestinationStation(isStation);
          onSelectDestination(placeInfo);
        }

        // 출발지와 도착지 중 하나가 역인지 확인하기
        if (!isOriginStation && !isDestinationStation && !isStation) {
          alert('출발지와 도착지 중 하나는 지하철역이어야 합니다.');
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  // 출발지 검색 제출하기
  const handleOriginSubmit = (e) => {
    e.preventDefault();
    searchPlaces(originKeyword, true);
  };

  // 도착지 검색 제출하기
  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    searchPlaces(destinationKeyword, false);
  };

  return (
    <SearchBox>
      <SearchForm onSubmit={handleOriginSubmit}>
        <SearchIndex
          type="text"
          value={originKeyword}
          onChange={(e) => setOriginKeyword(e.target.value)}
          placeholder="출발지를 입력하세요"
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <SearchIcon />
        </button>
      </SearchForm>
      <Hr/>
      <SearchForm onSubmit={handleDestinationSubmit}>
        <SearchIndex
          type="text"
          value={destinationKeyword}
          onChange={(e) => setDestinationKeyword(e.target.value)}
          placeholder="도착지를 입력하세요"
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <SearchIcon />
        </button>
      </SearchForm>
    </SearchBox>
  );
};

export default KakaoMapPlaceSearch;