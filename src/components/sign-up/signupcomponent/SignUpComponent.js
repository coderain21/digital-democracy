import React , {useState} from 'react';
import ProfileInfo from './ProfileInfo';
import Address from './Address';
import Interests from './Interests';


function SignUpComponent() {
  const [page, setPage] = useState(0);
  const [user,setUser] = useState({
    name:"",
    email:"",
    password: "",
    address: "",
    zipcode: "",
    interests: []
  });

  const DisplayPage = () => {
    if (page === 0){
      return <ProfileInfo user={user} setUser={setUser} page={page} setPage={setPage}/>;
    }
    else if (page === 1){
      return <Address user={user} setUser={setUser} page={page} setPage={setPage} />;
    }
    else if (page === 2){
      return <Interests user={user} setUser={setUser} page={page} setPage={setPage} />;
    }
    else {
      return <ProfileInfo user={user} setUser={setUser} page={page} setPage={setPage} />;
    }
  }

  return (
    <div>
      {DisplayPage()}
    </div>
  )
  }

export default SignUpComponent