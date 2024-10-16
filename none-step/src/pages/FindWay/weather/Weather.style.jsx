import styled from 'styled-components';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.2rem;
  text-align: center;
`;
