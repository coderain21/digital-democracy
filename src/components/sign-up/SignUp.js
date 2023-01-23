import React from 'react'
import SignUpComponent from './signupcomponent/SignUpComponent'
import './signup.css';
function SignUp({setLoginUser}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center', fontSize: "30px"}}>SignUp</div>
    <SignUpComponent setLoginUser={setLoginUser} />
    </>
  )
}

export default SignUp