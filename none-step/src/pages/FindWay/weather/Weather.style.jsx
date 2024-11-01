import styled, { keyframes } from "styled-components";
import { PopupContainer } from "../popup/FindWayPopup.style";

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
    color: ${(props) => props.theme.colors.gray01};
`;

export const Temperature = styled(WeatherInfo)`
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.black};
`;

export const WeatherBlue = styled(WeatherInfo)`
    color: ${(props) => props.theme.colors.primary};
`;

export const WeatherBlack = styled(WeatherInfo)`
    color: ${(props) => props.theme.colors.black};
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
`;

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
    position: fixed;
    bottom: 85px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    width: 50px;
    margin-left: 10px;
    padding: 0.8rem 1rem;
    border-radius: 4px;
    box-shadow: ${(props) => props.theme.colors.shadow200};
    background-color: ${(props) => props.theme.colors.white};

    cursor: pointer;
    z-index: 3;
`;

export const WeatherImg = styled.img`
    width: 3rem;
    height: 3rem;
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const BigWeatherImg = styled(WeatherImg)`
    width: 15rem;
    height: 15rem;
    opacity: 20%;
    position: absolute;
    bottom: 6rem;
    right: -0.5rem;
    transform: translateX(100%); // 초기 위치
    animation: ${slideIn} 1s ease-out 1s forwards; // 1s 딜레이, forwards로 마지막 상태 유지
`;

export const FloodingCover = styled(Warning)`
    justify-content: left;
`;

export const FloodingWrapper = styled(InfoWrapper)`
    flex-direction: row;
    justify-content: left;
    padding-block: 1rem;
`;

export const WeatherContainer = styled(PopupContainer)`
    overflow-x: hidden;
`;
