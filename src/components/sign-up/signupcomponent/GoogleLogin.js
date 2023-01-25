import React, {useContext} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthContext from '../../../context/AuthContext';


function GoogleLoginComponent () {
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);
    const clientId = '809363406953-ud4ktm7gi34c5mm4qhkqh00o90mnq5jc.apps.googleusercontent.com';

    const onSuccess = async (credRes) => {
        try {
            const res = await axios.post("http://localhost:8000/googleLogin", credRes, {
                withCredentials: true
                }
            );
            alert(res.data.message);
            const accessToken =res.data.accessToken
            setAuth({accessToken});
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
    )
}
export default GoogleLoginComponent