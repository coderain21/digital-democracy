import React, {useState} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

function GoogleLoginComponent ({setLoginUser}) {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",
        email:"",
        password: "",
        address: "",
        zipcode: "",
        interests: []
      });
    const clientId = '809363406953-ud4ktm7gi34c5mm4qhkqh00o90mnq5jc.apps.googleusercontent.com';

    const navigateToHome = ()=>{
        navigate('/');
    };

    /** 
    useEffect(() => {
    const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: 'email'
        });
        };
        gapi.load('client:auth2', initClient);
    });*/

    const onSuccess = (credRes) => {
        const decodedRes = jwt_decode(credRes.credential);
        setUser({
            ...user,
            name:decodedRes.given_name + decodedRes.family_name,
            email:decodedRes.email
            });
        
        if (user.name && user.email){
            axios.post("http://localhost:8000/signup",user )
            .then(res=>{
                if (res.data.message === "a user already exists with this email address"){
                    axios.post("http://localhost:8000/login",user)
                        .then(res=>{
                            alert(res.data.message);
                            setLoginUser(res.data.user);
                            navigateToHome();
                        })
                }
            })
            navigateToHome();
        }
        else{
                alert("invalid input")
        }
        console.log('success:', credRes);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    return (
    <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
        text="Sign in with Google"
        onSuccess={onSuccess}
        onError={onFailure}
        type="standard"
        />
    </GoogleOAuthProvider>
    );
}
export default GoogleLoginComponent