import React,{useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLoginComponent from '../../sign-up/signupcomponent/GoogleLogin';
import AuthContext from '../../../context/AuthContext';
import Logo from './logo.svg';

function LoginComponent () {
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);
    const [user,setUser] = useState({
        email:"",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        setErrorMessage(null);
    }, [user.email, user.password])

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,
        [name]:value
        });
    }

    const handleRecaptcha = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        try {
            const res = await axios.post("http://localhost:8000/recaptcha", {token});
            if (res.status === 200) {
                console.log(res.data.message);
            }
        } catch(err) {
            console.error(err);
        }
    }

    const login = async ()=>{
        console.log("logging in");
        if (!(user.email && user.password)) {
            setErrorMessage("Enter your email and password");
        }
        else {
            try {
                const res = await axios.post("http://localhost:8000/login",user, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    const accessToken  = res.data.accessToken
                    setAuth({accessToken});
                    navigate('/');
                }
            } catch(err) {
                setErrorMessage(err.response.data.message);
            }
        }
    }

    return (
        <>
            {errorMessage && 
                <p className='error-msg'>
                    {errorMessage}
                </p>
            }
            <main className='login-main'>
                <Logo className='logo-img'/>
                <section className="login-body" >
                    <div className="login-text">
                        Login To Your Account
                    </div>
                    <GoogleLoginComponent className="google-sign-in">
                    </GoogleLoginComponent>
                    <form action="#" autoComplete="off">
                        <p className='enter-text'>
                            Enter email and password
                        </p>
                        <input 
                            type="text" 
                            autoComplete="email" 
                            className="input-login form-control" 
                            name="email" 
                            value={user.email}  
                            onChange={handleChange} 
                            placeholder="Your email"
                        />
                        <input 
                            type="password" 
                            autoComplete="current-password" 
                            className="input-login form-control" 
                            name="password" 
                            value={user.password}  
                            onChange={handleChange} 
                            placeholder="Your password"
                        />
                        <a href="/forgotpassword" className="link-primary">
                            Forgot Your Password?
                        </a>
                        <button 
                            type="button" 
                            className="btn btn-link" 
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up?
                        </button>
                        <ReCAPTCHA
                            size="invisible"
                            sitekey="6Lf02yQjAAAAACG2joKuBxO9nGQBjTvBmHpU4AY_"
                            ref={recaptchaRef}
                            onChange={login}
                        />
                        <button 
                            className='login' 
                            type="submit" 
                            onClick={handleRecaptcha}
                        >
                            Login
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}
export default LoginComponent