import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalBG, ModalContainer, ActionTitle } from '../../MyPage/MyPage.style';
import Button from "@/components/Button";
import Check from '../../../assets/img/Check.svg';
import Close from '../../MyPage/MyPage.style';

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.gray04};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.white};
  transition: border .4s;
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.gray01};
  }
`;

const Label = styled.span`
  font-size: 1.4rem;
  transition: all .4s;
  margin-right: calc(100% - (1.4rem * 5));
  margin-bottom: 1rem;
`;

const InputText = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: ${(props) => props.theme.colors.black};
  &::placeholder {
    color: ${(props) => props.theme.colors.gray02};
  }
`;

const Palette = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 4rem;
`;

const Color = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const colorPalette = ['#F25151','#FF7300','#FFCA28','#3CB44A','#007AFF','#263C96','#674EFF'];

const CheckImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const BookmarkModal = ({onClick}) => {
  const [checkedColors, setCheckedColors] = useState(Array(colorPalette.length).fill(false));
  // => colorPalette와 똑같은 길이의 배열을 생성하고, 그 값을 false로 채워넣기
  // => 즉 checkedColors는 값이 false인 7개의 데이터를 가진 배열이 됨

  const handleChecked = (index) => {
    const updatedCheckedColors = [...checkedColors];
    updatedCheckedColors[index] = !updatedCheckedColors[index];
    setCheckedColors(updatedCheckedColors);
  };

  return (
    <ModalBG onClick={onClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* ModalBG 내부에 컨테이너가 있어서 컨테이너를 클릭해도 모달이 닫힘 => 방지코드 추가 */}
        <ActionTitle>즐겨찾기 등록</ActionTitle>

        <Label>장소명 등록</Label>
        <InputWrap>
          <InputText
            type="text"
            placeholder="즐겨찾기 장소명"
          />
        </InputWrap>

        <Label>색상 선택</Label>
        <Palette>
          {colorPalette.map((color, index) => (
            <Color 
              key={index} 
              style={{ backgroundColor: color }} 
              onClick={() => handleChecked(index)}
            >
              {checkedColors[index] ? (<CheckImg src={Check} alt="체크" />) : null}
            </Color>
          ))}
        </Palette>

        <Button submitMessage="저장하기" />
        <Close onClick={onClick}>닫기</Close>
      </ModalContainer>
    </ModalBG>
  );
}

export default BookmarkModal;