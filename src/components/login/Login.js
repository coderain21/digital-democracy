import React from 'react'
import LoginComponent from './logincomponent/LoginComponent'

function Login({setAuth}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center'}}>Login</div>
    <LoginComponent setAuth={setAuth}/>
    </>
  )
}

export default Login