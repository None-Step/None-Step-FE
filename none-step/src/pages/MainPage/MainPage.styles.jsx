import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  padding-top: 115px;
  padding-bottom: 75px;
  background: #fafafa;

  h3 {
    margin-bottom: 30px;
    font-size: 1.8rem;
  }
`;

export const NoticeWrapper = styled.div`
  position: fixed;
  top: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 45px;
  padding: 8px 20px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  p {
    margin-left: 10px;
    font-size: 1.6rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const MainSection = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  .banner-container {
    display: flex;
    width: 400%; // 배너 4개라서 400%
    transition: transform 0.5s ease-in-out;
  }

  .banner-wrapper {
    width: calc(100% / 4);
    flex-shrink: 0;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  .controller {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    z-index: 1;
  }

  .play-pause-btn {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    border: none;
    cursor: pointer;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .page-indicator {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 1.4rem;
  }
`;

export const CategoryWrapper = styled.div`
  position: relative;
  padding: 20px 0 25px;
  background: ${props => props.theme.colors.white};

  h3 {
    margin-left: 20px;
  }
`;

export const CategoryArrowLeft = styled.div`
  position: absolute;
  bottom: 25px;
  left: 0;
  display: flex;
  align-items: center;
  width: 50px;
  height: 100px;
  padding-left: 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: #999;
  }
`;

export const CategoryArrowRight = styled.div`
  position: absolute;
  bottom: 25px;
  right: 0;
  display: flex;
  align-items: center;
  width: 50px;
  height: 100px;
  padding-left: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 1) 100%
  );
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: #999;
  }
`;

export const CategoryContainer = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    display: block;
  }
`;

export const CategoryBtn = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
  }

  span {
    display: block;
    font-size: 1.4rem;
    font-weight: 500;
    word-break: keep-all;
  }
`;

export const WeatherWrapper = styled.div`
  min-height: 150px;
  padding: 20px 20px 35px;
  background: ${props => props.theme.colors.white};
`;

export const WeatherRefreshBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  background: transparent;
  box-shadow: ${props => props.theme.colors.shadow200};
  outline: none;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  svg.refresh {
    animation: rotate 0.4s ease-out;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const WeatherTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    margin-bottom: 20px;
  }
`;

export const WeatherAddress = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3px;
  margin-bottom: 20px;

  svg {
    width: 14px;
    height: 14px;
    margin-right: 5px;
    color: #409bff;
  }

  .address {
    display: inline-block;
    color: #424242;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .weather_icon {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 60px;
    height: 60px;
  }

  .weather_icon img {
    width: 100%;
    height: 100%;
  }

  .weather {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 10px;
  }

  .weather span:first-child {
    font-size: 2.8rem;
  }

  .weather span:last-child {
    display: block;
    font-size: 1.4rem;
    word-break: keep-all;
  }

  .weather_info {
    line-height: 1.5;
    font-size: 1.6rem;
  }

  .weather_info div span:first-child {
    margin-right: 7px;
  }

  .weather_info div span:last-child {
    color: ${props => props.theme.colors.gray01};
  }

  .no_weather p {
    font-size: 1.6rem;
    margin: 20px 0;
  }
`;

export const SpinnerBlue = styled.img`
  width: 40px;
  height: 40px;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ChatWrapper = styled.div`
  padding: 20px;
  background: ${props => props.theme.colors.white};
`;

export const ChatContainer = styled.ul`
  width: 100%;

  li {
    float: left;
    width: calc(50% - 7.5px);
    height: 80px;
  }

  li:nth-child(odd) {
    margin-right: 15px;
    margin-bottom: 15px;
  }

  li:nth-child(even) {
    margin-bottom: 15px;
  }

  .daegu_chat img {
    position: absolute;
    bottom: 10px;
    right: 5px;
    width: 90px;
  }
`;

export const ChatBtn = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  background: none;
  box-shadow: ${props => props.theme.colors.shadow200};
  outline: none;
  cursor: pointer;

  span {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.8rem;
    font-weight: 600;
  }

  img {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 60px;
  }
`;

export const FooterWrapper = styled.div`
  padding: 35px 20px;
`;

export const FooterContainer = styled.div`
  p {
    color: #999;
    font-size: 1.2rem;
  }

  p:not(:last-child) {
    margin-bottom: 15px;
  }

  p.qna span:first-child,
  p.license span:first-child {
    margin-right: 7px;
    font-weight: 500;
  }

  p.qna span:last-child,
  p.license span:last-child {
    text-decoration: underline;
    cursor: pointer;
  }
`;
