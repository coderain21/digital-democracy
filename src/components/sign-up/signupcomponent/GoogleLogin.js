import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function GoogleLoginComponent ({setAuth}) {
    const navigate = useNavigate();
    const clientId = '809363406953-ud4ktm7gi34c5mm4qhkqh00o90mnq5jc.apps.googleusercontent.com';

    const onSuccess = async (credRes) => {
        try {
            const res = await axios.post("http://localhost:8000/googleLogin", credRes);
            alert(res.data.message);
            setAuth(res.data.accessToken);
            navigate('/');
        } catch(err) {
            console.error(err);
            alert("Login failed");
        }
    }

    const onFailure = (err) => {
        console.log('failed:', err);
    }

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