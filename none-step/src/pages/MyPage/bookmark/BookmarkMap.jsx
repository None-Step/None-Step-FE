import React, { useState } from 'react'
import styled from 'styled-components'
import { BG, PageContainer } from '../MyPage.style';
import MenuBar from "@/components/menuBar/MenuBar";
import { PageHeader } from "@/components/header/Headers";
import { BookmarkPlace, BookmarkPath } from './BookmarkList';

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

const TabContent = styled.div`
  display: ${(props) => props.$active ? 'block' : 'none'};
`;

const Bookmark = ({color}) => {
  const [activeTab, setActiveTab] = useState('장소');

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
              <BookmarkPlace
                color={color}
                placeName='집'
                placeAddress='부산광역시 서구 송도해변로' />
            </TabContent>

            <TabContent $active={activeTab === '경로'}>
                <BookmarkPath
                  color={color}
                  originName='집'
                  destinationName='회사'
                  />
            </TabContent>

          </Wrapper>

          <MenuBar />
      </PageContainer>
    </BG>

  )
}

export default Bookmark
