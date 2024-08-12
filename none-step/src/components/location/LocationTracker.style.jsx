import styled from "styled-components";
import { SubmitBut } from "../../pages/MyPage/MyPage.style";

export const HomeContainer = styled.div`
  margin-top: 20rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1.6rem 2rem;
  box-sizing: border-box;
`;

export const InBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LocationBut = styled(SubmitBut)`
  width: fit-content;
  padding: 0.8rem 1.2rem;
  box-sizing: border-box;
`;

export const Location = styled.p`
  font-size: 1.6rem;
  padding-block: 1.5rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThisStop = styled.strong`
  font-size: 1.8rem;
`;

export const Notice = styled.span`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.gray01};

`;

export const AccuracyMessage = styled(Location)`
  font-size: 1.4rem;
  padding: 0 0 2rem 0;
  color: #666666;
`;

export const Br = styled.br`
  display : none;

  @media (max-width: 400px) {
    display: block;
  }
`;

export const Strong = styled.strong`
  color: ${props => props.color};
`;