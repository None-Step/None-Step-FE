import React from 'react';
import styled from 'styled-components';

import {
  But,
  ModalBG,
  Notice,
  Title,
  WithdrawContainer,
} from '../../MyPage/MyPage.style';

const ModalContainer = styled(WithdrawContainer)`
  width: fit-content;
`;

const ModalBut = styled(But)`
  padding: 0.8rem;
  border-radius: 2px;
`;

const MinNotice = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray01};
  margin-bottom: 1rem;
`;

const WeatherErrorModal = ({ onClose, title, message }) => {
  const isWeatherError = title === '날씨 정보';

  return (
    <ModalBG>
      <ModalContainer>
        <Title>{title}</Title>
        <Notice>{message}</Notice>
        {isWeatherError && (
          <MinNotice>
            기상청에서 날씨를 발표하지 않은 지역/시간의 경우, 날씨 정보가
            나타나지 않을 수 있습니다.
          </MinNotice>
        )}
        <ModalBut onClick={onClose}>확인</ModalBut>
      </ModalContainer>
    </ModalBG>
  );
};

export default WeatherErrorModal;
