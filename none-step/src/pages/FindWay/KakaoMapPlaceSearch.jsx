// KakaoMapPlaceSearch.jsx

import React from 'react';
import { SearchIndex, SearchIcon, SearchBox, SearchForm, Hr, InputReload } from './FindWay.style';
import ReloadIcon from '@/assets/img/current.svg'
import Search from '@/assets/img/search.svg'

const KakaoMapPlaceSearch = ({ onSelectOrigin, onSelectDestination, originName, destinationName, setOriginName, setDestinationName }) => {
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
        const placeInfo = {
          ...place,
          place_name: place.place_name
        };
        if (isOrigin) {
          onSelectOrigin(placeInfo);
        } else {
          onSelectDestination(placeInfo);
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
    searchPlaces(originName, true);
  };

  // 도착지 검색 제출하기
  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    searchPlaces(destinationName, false);
  };

  return (
    <SearchBox>
      <SearchForm onSubmit={handleOriginSubmit}>
        <SearchIndex
          type="text"
          value={originName}
          onChange={(e) => setOriginName(e.target.value)}
          placeholder="출발지를 입력하세요"
        />
      </SearchForm>
      <Hr/>
      <SearchForm onSubmit={handleDestinationSubmit}>
        <SearchIndex
          type="text"
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
          placeholder="도착지를 입력하세요"
        />
      </SearchForm>
    </SearchBox>
  );
};

export default KakaoMapPlaceSearch;