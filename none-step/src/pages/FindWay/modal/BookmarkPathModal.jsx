import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalBG, ModalContainer, ActionTitle } from '../../MyPage/MyPage.style';
import Button from "@/components/Button";
import Check from '../../../assets/img/Check.svg';
import Close from '../../MyPage/MyPage.style';
import axiosInstance from "@/apis/axiosInstance";
import { useSelector } from 'react-redux';

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
  margin-bottom: 2rem;
  &:nth-of-type(2) {
    margin-bottom: 4rem;
  }
  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.gray01};
  }
`;

const Label = styled.span`
  font-size: 1.4rem;
  transition: all .4s;
  margin-right: calc(100% - (1.4rem * 7));
  margin-bottom: 1rem;
  &:last-of-type {
    margin-right: calc(100% - (1.4rem * 4));
  }
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

const BookmarkPathModal = ({ onClick, origin, destination }) => {
  const [selectColor, setSelectColor] = useState(null);
  const [startNameInput, setStartNameInput] = useState(origin.name || "");
  const [endNameInput, setEndNameInput] = useState(destination.name || "");

  const handleSave = async () => {
    if (!startNameInput || !endNameInput) {
      alert("장소명을 입력해 주세요.");
      return;
    }

    if (selectColor === null) {
      alert("색상을 선택해 주세요.");
      return;
    }

    const selectedColor = colorPalette[selectColor];

    console.log("전송할 데이터:", {
        startLatitude: origin.lat,
        startLongitude: origin.lng,
        endLatitude: destination.lat,
        endLongitude: destination.lng,
        pathStartNickName: startNameInput,
        pathEndNickName: endNameInput,
        pathColor: selectedColor
    })

    try {
      const response = await axiosInstance.post('nonestep/book-mark/path-register', {
        startLatitude: origin.lat.toFixed(13),
        startLongitude: origin.lng.toFixed(13),
        endLatitude: destination.lat.toFixed(13),
        endLongitude: destination.lng.toFixed(13),
        pathStartNickName: startNameInput,
        pathEndNickName: endNameInput,
        pathColor: selectedColor
      });

      console.log("응답 데이터: ", response.data);

      if (response.data.message.toLowerCase() === 'success') {
        alert('즐겨찾기가 성공적으로 등록되었습니다.');
        onClick();  // 모달 닫기
      }
    } catch (error) {
      if (error.response) {
        // 서버 응답이 있는 경우
        console.error("서버 응답 에러:", error.response.data);
        alert(error.response.data);
      } else {
        // 서버 응답이 없는 경우
        console.error("요청 에러:", error.message);
        alert("즐겨찾기 등록에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <ModalBG onClick={onClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ActionTitle>즐겨찾기 경로 등록</ActionTitle>

        <Label>출발 장소명 등록</Label>
        <InputWrap>
          <InputText
            type="text"
            value={startNameInput}
            onChange={(e) => setStartNameInput(e.target.value)}
            placeholder="출발 장소명 입력"
          />
        </InputWrap>

        <Label>도착 장소명 등록</Label>
        <InputWrap>
          <InputText
            type="text"
            value={endNameInput}
            onChange={(e) => setEndNameInput(e.target.value)}
            placeholder="도착 장소명 입력"
          />
        </InputWrap>

        <Label>색상 선택</Label>
        <Palette>
          {colorPalette.map((color, index) => (
            <Color
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => setSelectColor(index)}
            >
              {selectColor === index && <CheckImg src={Check} alt="체크" />}
            </Color>
          ))}
        </Palette>

        <Button submitMessage="저장하기" onClick={handleSave} />
        <Close onClick={onClick}>닫기</Close>
      </ModalContainer>
    </ModalBG>
  );
};

export default BookmarkPathModal;