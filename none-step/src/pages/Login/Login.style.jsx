import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  position: absolute;
`;

export const HrWrap = styled.div`
  width: 100%;
  height: 5rem;
  position: relative;
  margin-block : 1rem .8rem;
`;

export const Hr = styled.hr`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray05};
  position: absolute;
  top: 50%;
  border: none;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.colors.gray02};
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 0.5rem;
  font-size: 1.2rem;

`;

export const SignAction = styled.p`
  width: fit-content;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size : 1.2rem;
  color: ${(props) => props.theme.colors.gray01};
  margin-top: 1.5rem;

  @media screen and (max-height: 660px) {
    &:last-of-type {
      margin-bottom: 5vh;
    }
  }

`;

export const SignActionSpan = styled(Link)`
  display: inline-block;
  margin-inline : 0.5rem;
  cursor: pointer;
  color: inherit;
  word-break: keep-all;
`;

