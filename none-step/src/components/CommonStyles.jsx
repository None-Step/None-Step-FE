import styled from "styled-components";
import { SignActionSpan } from "../pages/Login/Login.style";
import Button from "./Button";

export const Container = styled.div`
position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 304px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Description = styled(SignActionSpan)`
font-size: 1.6rem;
color: ${(props) => props.theme.colors.gray01};
cursor: auto;
`;

export const SecondaryButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.white};
  color : ${(props) => props.theme.colors.primaty};
  border: 1px solid ${(props) => props.theme.colors.primaty};
`;