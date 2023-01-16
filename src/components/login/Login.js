import React from 'react'
import LoginComponent from './logincomponent/LoginComponent'

function Login({setLoginUser}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center'}}>Login</div>
    <LoginComponent setLoginUser={setLoginUser}/>
    </>
  )
}

export default Login