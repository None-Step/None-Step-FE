import React from 'react'
import MenuBar from '../components/menuBar/MenuBar'
import { Wrapper } from './Login/Login.style'
import { MainHeader } from '../components/header/Headers'

const Home = () => {
  return (
    <Wrapper>
      <MainHeader/>
      Home
      <MenuBar/>
    </Wrapper>
  )
}

export default Home