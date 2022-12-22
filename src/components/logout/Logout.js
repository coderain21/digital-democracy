import React from 'react'
import LogoutComponent from './logoutcomponent/LogoutComponent'

function Logout({setAuth}) {
  return (
    <>
    <LogoutComponent setAuth={setAuth}/>
    </>
  )
}

export default Logout