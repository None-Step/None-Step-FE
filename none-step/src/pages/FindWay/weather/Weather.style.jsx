import styled from 'styled-components';

export const Warning = styled.span`
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  background-color: rgba(236, 34, 31, 0.8);
  color: white;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const WeatherInfo = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray01};
`;

export const Temperature = styled(WeatherInfo)`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
