import React from 'react'
import SignUpComponent from './signupcomponent/SignUpComponent'

function SignUp({setLoginUser}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center'}}>SignUp</div>
    <SignUpComponent setLoginUser={setLoginUser} />
    </>
  )
}

export default SignUp