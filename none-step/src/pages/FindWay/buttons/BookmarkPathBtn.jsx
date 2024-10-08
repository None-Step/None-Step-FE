import React from 'react'
import styled from 'styled-components'

const PathButton = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50px;
  height: 32px;
  padding: 6px 12px;
  font-size: 1.4rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.colors.shadow200};
  position: absolute;
  top: 150px;
  left: 1rem;
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BookmarkPathBtn = () => {
  return (
    <div>
      
    </div>
  )
}

export default BookmarkPathBtn