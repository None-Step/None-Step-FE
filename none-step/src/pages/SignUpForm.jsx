import React from 'react'
import styled from 'styled-components'
import Logo from '../components/Logo'
import LoginWrap from '../components/LoginWrap'
import TermsOfService from '../components/TermsOfService'

const SignUpForm = () => {
  return (
    <LoginWrap>
      <Logo/>
      <TermsOfService/>
    </LoginWrap>
  )
}

export default SignUpForm
