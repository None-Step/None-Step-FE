import styled from "styled-components";

// 전체 페이지
export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

// 검색 바
export const SearchBox = styled.div`
  position: absolute;
  top: 74px;
  z-index: 3;
  width: calc(100% - 2rem);
  height: 40px;
  border-radius: 4px;
  margin-inline: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem 0.8rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => props.theme.colors.shadow200};
`;

export const LoadingMessage = styled(SearchBox)`
  top: 120px;
  font-size: 1.4rem;
`

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
`;

const SVGWrapper = styled.svg`
  cursor: pointer;
  fill: ${(props) => props.theme.colors.gray01};
  transition: fill 0.3s ease;
  &:hover {
    fill: ${(props) => props.theme.colors.primary};
  }
`;

export const SearchIcon = (props) => (
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
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 40px;
  box-shadow: ${(props) => props.theme.colors.shadow200};
  cursor: pointer;
  position: absolute;
  top: calc(100vh - 140px);
  right: 1rem;
  z-index: 3;
`;

// 커스텀 인포윈도우 스타일
export const CustomOverlay = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.colors.shadow200};
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
  color: ${(props) => props.theme.colors.gray01};
`;

export const Confirm = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.primary};
`;