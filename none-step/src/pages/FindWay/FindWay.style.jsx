import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

// 전체 페이지
export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

// 검색 바
export const SearchBox = styled.div`
  position: absolute;
  top: 70px;
  z-index: 4;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray05};
  padding-inline: 0.8rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const LoadingMessage = styled(SearchBox)`
  top: 170px;
  font-size: 1.4rem;
  margin-inline: 1rem;
  width: calc(100% - 2rem);
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SearchIndex = styled.input`
  font-size: 1.4rem;
  width: calc(100% - 30px);
  height: 100%;
  outline: none;
  border: none;
  padding: 1rem 0.8rem;
`;

export const Hr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme.colors.gray06};
`;

const SVGWrapper = styled.svg`
  cursor: pointer;
  fill: ${props => props.theme.colors.gray01};
  transition: fill 0.3s ease;
  &:hover {
    fill: ${props => props.theme.colors.primary};
  }
`;

export const SearchIcon = props => (
  <SVGWrapper
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="20"
    height="20"
    {...props}
  >
    <path d="M16.281 14.617L20.564 18.899L19.149 20.314L14.867 16.031C13.2737 17.3082 11.292 18.0029 9.25 18C4.282 18 0.25 13.968 0.25 9C0.25 4.032 4.282 0 9.25 0C14.218 0 18.25 4.032 18.25 9C18.2529 11.042 17.5582 13.0237 16.281 14.617ZM14.275 13.875C15.5441 12.5699 16.2529 10.8204 16.25 9C16.25 5.132 13.117 2 9.25 2C5.382 2 2.25 5.132 2.25 9C2.25 12.867 5.382 16 9.25 16C11.0704 16.0029 12.8199 15.2941 14.125 14.025L14.275 13.875V13.875Z" />
  </SVGWrapper>
);

// 현재 위치 다시 불러오기
export const Reload = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: 40px;
  box-shadow: ${props => props.theme.colors.shadow200};
  cursor: pointer;
  position: absolute;
  top: ${props =>
    `${
      props.$viewportHeight - (80 + 16 + 40)
    }px`}; // 뷰포트 높이 - (메뉴바 높이 + 여백 + 버튼 높이)
  right: 1rem;
  z-index: 3;
`;

export const InputReload = styled(Reload)`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.gray06};
`;

// 커스텀 인포윈도우 스타일
export const CustomOverlay = styled.div`
  min-width: 160px;
  min-height: 90px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.colors.shadow200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StationName = styled.h4`
  font-size: 1.6rem;
  color: #333;
`;

export const StationAddress = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray01};
`;

export const Confirm = styled.p`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.primary};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:first-child {
    margin-right: 0.6rem;
  }
`;

export const BookmarkBtn = styled.div`
  /* background-color: rgba(0, 122, 255, 0.15);
  padding: 8px 10px;
  border-radius: 100px; */
  margin-bottom: 0.4rem;
  margin-right: calc(80% - (28px + 0.6rem));

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BookmarkIcon = styled.img`
  margin-right: 0.4rem;
`;

export const BookmarkSpan = styled.span`
  font-size: 1.2rem;
  color: ${props => props.color};
`;

export const RouteInfoBar = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const LocationText = styled.span`
  font-size: 14px;
  color: #333;
  margin-top: 1rem;
`;

export const ArrowIcon = styled(FaArrowRight)`
  width: 1.5rem;
  height: 1.5rem;
  color: #333;
`;

export const UserLocationStart = styled(LocationText)`
  color: ${props => props.theme.colors.primary};
`;
