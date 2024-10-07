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

const BookmarkMap = ({color}) => {

  return (
    <BG>
      <PageContainer>
          <PageHeader />

          <Wrapper>

            <BookmarkPlace
              color={color}
              placeName='집'
              placeAddress='부산광역시 서구 송도해변로' />

          </Wrapper>

          <MenuBar />
      </PageContainer>
    </BG>

  )
}

export default BookmarkMap
