import React from 'react'
import styled, { keyframes } from 'styled-components'
import spinner from '@/assets/img/spinner.png'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingBG = styled.div`
  position: fixed;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  z-index: 99;

  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = styled.img`
  width: 25px;
  height: 25px;
  animation: ${rotate} 1s linear infinite;
`

const Loading = () => {
  return (
    <LoadingBG>
      <Spinner src={spinner} alt="loading spinner" />
    </LoadingBG>
  )
}

export default Loading