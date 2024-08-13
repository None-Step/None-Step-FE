import React, { useState } from 'react';
import { SearchIndex, SearchIcon, SearchBox, SearchForm } from './FindWay.style';
import styled from 'styled-components';

const ResultList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.gray04};
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
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


const KakaoMapPlaceSearch = ({ onSelectPlace }) => {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);

  const searchPlaces = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      alert('역명을 입력해주세요.');
      return;
    }
    let searchKeyword = keyword;
    if (keyword.slice(-1) !== '역') {
      searchKeyword = keyword + '역';
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        if (data.length > 0) {
          onSelectPlace(data[0]);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <SearchBox>
      <SearchForm onSubmit={searchPlaces}>
        <SearchIndex
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="도착역을 입력하세요"
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <SearchIcon />
        </button>
      </SearchForm>
      {/* {places.length > 0 && (
        <ResultList>
          {places.map((place) => (
            <ResultItem key={place.id} onClick={() => onSelectPlace(place)}>
              {place.place_name} ({place.address_name})
            </ResultItem>
          ))}
        </ResultList>
      )} */}
    </SearchBox>
  );
};

export default KakaoMapPlaceSearch;