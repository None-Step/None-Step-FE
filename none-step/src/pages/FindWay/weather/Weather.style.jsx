import styled from 'styled-components';
import { RouteOption } from '../popup/FindWayPopup.style';

export const Warning = styled.span`
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  background-color: rgba(0, 122, 255, 0.6);
  color: white;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin-top: 1rem;
`;

export const Hidden = styled.span`
  @media all and (max-width: 400px) {
    display: block;
  }
`;

export const WeatherInfo = styled.span`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.gray01};
`;

export const Temperature = styled(WeatherInfo)`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.black};
`;

export const WeatherBlue = styled(WeatherInfo)`
  color: ${props => props.theme.colors.primary};
`;

export const WeatherBlack = styled(WeatherInfo)`
  color: ${props => props.theme.colors.black};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.2rem;
  text-align: center;
`;

export const WeatherBox = styled(InfoWrapper)`
  align-items: self-start;
`;

export const PositionWrapper = styled(InfoWrapper)`
  flex-direction: row;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

export const Flooding = styled(InfoWrapper)`
  flex-direction: row;
  justify-content: left;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ColLeft = styled(Flooding)`
  flex-direction: column;
  align-items: flex-start;
`

export const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Br = styled.br`
  display: none;
  @media all and (max-width: 400px) {
    display: block;
  }
`;

export const IconWrapper = styled(InfoWrapper)`
  flex-direction: row;
  margin-top: 1rem;
`;

export const MinWeather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 0.6rem 0.4rem;
  border-radius: 4px;
  box-shadow: ${props => props.theme.colors.shadow200};
  background-color: ${props => props.theme.colors.white};

  cursor: pointer;
  position: absolute;
  top: ${props =>
    `${
      props.$viewportHeight - (80 + 16 + 80)
    }px`}; // 뷰포트 높이 - (메뉴바 높이 + 여백 + 버튼 높이)
  left: 1rem;
  z-index: 3;
`;

export const WeatherImg = styled.img`
  width: 3rem;
  height: 3rem;
`;
