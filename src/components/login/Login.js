import React from 'react'
import LoginComponent from './logincomponent/LoginComponent'
import './login.css';
function Login({setLoginUser}) {
  return (
    <>

    <LoginComponent setLoginUser={setLoginUser} />
    
    </>
  )
}

export default Login