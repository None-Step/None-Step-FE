import styled from 'styled-components'

export const ContentWrapper = styled.div`
  padding: 1rem;
  padding-top: calc(64px + 1rem);
  border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
`;

export const LocationInfo = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 0.8rem;
  border-radius: 5px;
`;

export const LocationText = styled.p`
  font-size: 1.4rem;
  color: #333;

  &:first-of-type {
    padding-bottom: 0.5rem;
  }

  &:last-of-type {
    border-top: 1px solid ${(props) => props.theme.colors.gray05};
    padding-top: 0.5rem;
  }
`;

export const RouteOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray06};

  &:hover {
    background-color: rgba(0, 122, 255, 0.05);
  }
`;

export const RouteInfo = styled.div`

`;

export const RouteType = styled.h4`
  font-size: 1.6rem;
`;

export const RouteDetail = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray02};
`;

export const ArrowButton = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
