import React from 'react'
import LoginComponent from './logincomponent/LoginComponent'
import './login.css';
function Login({setLoginUser}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center', fontSize: "30px"}}>Login</div>
    <LoginComponent setLoginUser={setLoginUser}/>
    </>
  )
}

export default Login