import React from 'react'
import styled from 'styled-components'
import rightIcon from '@/assets/img/rightIcon-gray.svg'
import CloseIcon from '@/assets/img/Close.svg'
import axiosInstance from "@/apis/axiosInstance";

const ListContainer = styled.div`
  padding: 1.8rem 1.2rem;
  background-color: ${(props) => props.theme.colors.white};
  border-top: 1px solid ${(props) => props.theme.colors.gray06};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItem = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.color || props.theme.colors.gray06};
  margin-right: 1.4rem;
`;

const PlaceName = styled.span`
  font-size: 1.6rem;
  margin-right: 1rem;
`;

const PlaceAddress = styled(PlaceName)`
  color: ${(props) => props.theme.colors.gray01};
`;


const RightIcon = styled.img`
  display: inline-block;
  margin-right: 1rem;
  width: 12px;
  height: 12px;
`;

const handlePlaceDelete = () => {
  axiosInstance.delete(`/nonestep/book-mark/place-delete?pathNo={}`)
}


export const BookmarkPlace = ({color, placeName, placeAddress, onDelete, placeNo}) => {
  return (
    <>
      <ListContainer>
        <ListItem>
          <Star fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974
            5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342
            7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301
            17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076
            9.33995 15.3622L5.36421 18.2507C4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784
            12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274
            6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z"
            fill={color} />
          </Star>

          <PlaceName>{placeName}</PlaceName>
          <PlaceAddress>{placeAddress}</PlaceAddress>
        </ListItem>
        <img src={CloseIcon} alt='닫기 버튼'
          onClick={() => {
            console.log('삭제 버튼 클릭됨');
            console.log('삭제할 placeNo:', placeNo);
            onDelete(placeNo);
          }}/>
      </ListContainer>
    </>
  )
}

export const BookmarkPath = ({color, originName, destinationName}) => {
  return (
    <>
      <ListContainer>
        <ListItem>
          <Star fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.97668 1.27861C9.27603 0.357304 10.5794 0.357302 10.8788 1.27861L12.3974
            5.95238C12.5313 6.3644 12.9152 6.64336 13.3484 6.64336H18.2627C19.2315 6.64336 19.6342
            7.88297 18.8505 8.45238L14.8748 11.3409C14.5243 11.5956 14.3776 12.0469 14.5115 12.459L16.0301
            17.1327C16.3295 18.054 15.275 18.8202 14.4913 18.2507L10.5155 15.3622C10.165 15.1076 9.69044 15.1076
            9.33995 15.3622L5.36421 18.2507C4.5805 18.8201 3.52602 18.054 3.82537 17.1327L5.34396 12.459C5.47784
            12.0469 5.33118 11.5956 4.98069 11.3409L1.00496 8.45238C0.221242 7.88297 0.624017 6.64336 1.59274
            6.64336H6.50702C6.94025 6.64336 7.32421 6.3644 7.45808 5.95238L8.97668 1.27861Z"
            fill={color} />
          </Star>

          <PlaceName>{originName}</PlaceName>
            <RightIcon src={rightIcon} alt='화살표 아이콘'/>
          <PlaceName>{destinationName}</PlaceName>
        </ListItem>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10.5862L16.95 5.63623L18.364 7.05023L13.414 12.0002L18.364 16.9502L16.95 18.3642L12
          13.4142L7.04999 18.3642L5.63599 16.9502L10.586 12.0002L5.63599 7.05023L7.04999 5.63623L12 10.5862Z"
          fill="#333333"/>
        </svg>
    </ListContainer>
    </>
  )
}