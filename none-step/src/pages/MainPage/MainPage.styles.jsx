import styled from "styled-components";

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
    background: ${(props) => props.theme.colors.white};
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

    img {
        width: 100%;
        object-fit: contain;
    }
`;

export const CategoryWrapper = styled.div`
    position: relative;
    padding: 20px 0 25px;
    background: ${(props) => props.theme.colors.white};

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
    padding: 20px;
    background: ${(props) => props.theme.colors.white};
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
        font-size: 2.6rem;
    }

    .weather span:last-child {
        display: block;
        font-size: 1.4rem;
        word-break: keep-all;
    }

    .weather_info {
        font-size: 1.6rem;
    }

    .weather_info div span:first-child {
        margin-right: 5px;
    }

    .weather_info div span:last-child {
        color: ${(props) => props.theme.colors.gray01};
    }

    .weather_info .precipitation span {
    }

    .weather_info .wind {
    }

    .weather_info .wind span {
    }

    .no_weather p {
        font-size: 1.6rem;
        margin: 20px 0;
    }
`;

export const ChatWrapper = styled.div`
    padding: 20px;
    background: ${(props) => props.theme.colors.white};
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
`;

export const ChatBtn = styled.button`
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;
    background: none;
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    cursor: pointer;

    img {
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 60px;
        /* opacity: 0.3; */
    }

    span {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 1.8rem;
        font-weight: 600;
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
