import React from 'react'
import SignUpComponent from './signupcomponent/SignUpComponent'
import './signup.css';

function SignUp() {
  return (
    <>
    <div className="signup-text" style={{textAlign: 'center', fontSize: "30px"}}>SignUp</div>
    <SignUpComponent />
    </>
  )
}

export default SignUp