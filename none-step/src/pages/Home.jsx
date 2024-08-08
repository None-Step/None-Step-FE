import React from 'react'
import styled from 'styled-components'
import MenuBar from '../components/menuBar/MenuBar'
import { Wrapper } from './Login/Login.style'
import { MainHeader } from '../components/header/Headers'
import LocationTracker from '../components/location/LocationTracker'

const HomeWrapper = styled(Wrapper)`
  background-color: ${(props) => props.theme.colors.gray06};
`

const Home = () => {
  return (
    <HomeWrapper>
      <MainHeader/>
      <LocationTracker />
      <MenuBar/>
    </HomeWrapper>
  )
}

export default Home