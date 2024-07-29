import styled, { ThemeContext } from 'styled-components';

export const TermsWrap = styled.div`
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 304px;
`;

export const TermsTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Title = styled.p`
  font-size: 1.4rem;
`;

export const Strong = styled.strong`
  color: ${(props) => props.theme.colors.primary};
  margin-right: 0.5rem;
`;

export const Success = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const TermsTextBox = styled.div`
  width: calc(100% - 10px);  /* 스크롤 바를 오른쪽으로 10px 이동시키기 */
  min-width: 304px;
  height: 150px;
  overflow: scroll;
  border: 1px solid ${(props) => props.theme.colors.gray05};
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1rem 1.4rem 0rem 1.9rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.gray02};


  /* 스크롤 바 스타일 조정 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20px;
    background-color: ${(props) => props.theme.colors.gray04};
    border-radius: 10px;
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  .margin {
    margin-bottom : 1rem;
  }

`;

export const TermsTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const TermsStrong = styled.h4`
  margin-bottom: 0.5rem;
`;
