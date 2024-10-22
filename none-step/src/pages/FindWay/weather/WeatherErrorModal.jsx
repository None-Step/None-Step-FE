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

const WeatherErrorModal = ({onClose, title, message}) => {
  return (
    <ModalBG>
      <ModalContainer>
        <Title>{title}</Title>
        <Notice>{message}</Notice>
          <ModalBut onClick={onClose}>확인</ModalBut>
      </ModalContainer>
    </ModalBG>
  );
};

export default WeatherErrorModal;
