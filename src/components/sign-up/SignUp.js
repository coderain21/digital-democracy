import React from 'react'
import SignUpComponent from './signupcomponent/SignUpComponent'

function SignUp({setAuth}) {
  return (
    <>
    <div className="mt-5" style={{textAlign: 'center'}}>SignUp</div>
    <SignUpComponent setAuth={setAuth} />
    </>
  )
}

export default SignUp