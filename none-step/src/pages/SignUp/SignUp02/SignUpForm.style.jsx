import styled from "styled-components";
import InputForm from "../../../components/InputForm";

export const PageTitle = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray01};
  margin-bottom: 3rem;
`;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubmitBut = styled.button`
  width: 80px;
  padding: 1.7rem 2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-left: 0.5rem;

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray02};
  }
`;

export const MarginInputForm = styled(InputForm)`
  margin-bottom: 1.5rem;
`;
