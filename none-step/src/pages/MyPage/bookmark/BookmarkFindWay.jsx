import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BG, PageContainer } from '../MyPage.style';
import MenuBar from "@/components/menuBar/MenuBar";
import { PageHeader } from "@/components/header/Headers";
import { BookmarkPlace, BookmarkPath } from './BookmarkList';
import axiosInstance from "@/apis/axiosInstance";

const Wrapper = styled.div`
    width: 100%;
    padding-top: 70px;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.white};
`;

const Tab = styled.button`
  font-size: 1.4rem;
  flex: 1;
  padding: 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.gray06};
  color: ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.gray02};
  font-weight: ${(props) => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray02};
  display: inline-block;
  padding: 1rem;
`;

const TabContent = styled.div`
  display: ${(props) => props.$active ? 'block' : 'none'};
`;

const BookmarkFindWay = ({color}) => {
  const [activeTab, setActiveTab] = useState('장소');
  const [bookmarkList, setBookmarkList] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const response = await axiosInstance.get('/nonestep/book-mark/place-list');
      setBookmarkList(response.data);
    } catch (error) {
      console.error('즐겨찾기 목록을 불러오는 데 실패했습니다.', error);
    }
  };
  
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // 삭제 핸들러 함수
  const handleDelete = async (placeNo) => {
    console.log('삭제 요청 placeNo:', placeNo);  
    console.log(`/nonestep/book-mark/place-delete?pathNo=${placeNo}`);
  
    // 세션 스토리지에서 토큰 가져오기
    const token = sessionStorage.getItem('accessToken');
  
    if (!token) {
      console.error('토큰이 없습니다. 로그인 상태를 확인하세요.');
      return;
    }
  
    try {
      console.log('삭제 요청 헤더:', {
        Authorization: `Bearer ${token}`,
      });
      
      const response = await axiosInstance.delete(`/nonestep/book-mark/place-delete?pathNo=${placeNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('삭제 요청 응답:', response);
      fetchBookmarks();
    } catch (error) {
      console.error('즐겨찾기 삭제에 실패했습니다.', error);
    }
  };

  return (
    <BG>
      <PageContainer>
          <PageHeader />

          <Wrapper>
            <TabContainer>
              <Tab $active={activeTab === '장소'} onClick={() => setActiveTab('장소')}>장소</Tab>
              <Tab $active={activeTab === '경로'} onClick={() => setActiveTab('경로')}>경로</Tab>
            </TabContainer>

            <TabContent $active={activeTab === '장소'}>
            {bookmarkList && bookmarkList.length > 0 ? (
              bookmarkList.map((bookmark) => (
                <BookmarkPlace
                  key={bookmark.placeNo}
                  color={bookmark.placeColor}
                  placeName={bookmark.placeNickName}
                  placeAddress={bookmark.placeAddress}
                  onDelete={handleDelete}
                  placeNo={bookmark.placeNo}
                />
              ))
            ) : (
              <Span>등록된 즐겨찾기가 없습니다.</Span>
            )}
          </TabContent>

            <TabContent $active={activeTab === '경로'}>
                <BookmarkPath
                  color={color}
                  originName='집'
                  destinationName='회사'
                />
            </TabContent>

            <Span>즐겨찾기 장소는 최대 5곳 등록 가능합니다.</Span>

          </Wrapper>

          <MenuBar />
      </PageContainer>
    </BG>
  )
}

export default BookmarkFindWay;