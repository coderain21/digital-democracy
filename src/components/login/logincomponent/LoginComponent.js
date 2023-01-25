import React,{useState, useRef, useContext} from 'react';
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
        name:"",
        password: ""
    });
    const recaptchaRef = useRef(null);

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
        try {
            const res = await axios.post("http://localhost:8000/login",user, {
                withCredentials: true
            });
            alert(res.data.message);
            if (res.status === 200) {
                const accessToken  = res.data.accessToken
                setAuth({accessToken});
                navigate('/');
            }
        } catch(err) {
            alert(err.response.data.message);
        }
    }

    return (
    
        <div className="login-body" style={{backgroundColor: "rgba(154, 150, 150, 0.3)", borderBottom: "3px solid black", display: "flex", justifyContent: "center",borderTop: "3px solid black", height: "380px"}}>
             <div className='logo' >
            <Logo className='logo-img' style={{ position:"fixed", left: "100px"}}/>
            </div>
            <div>
            <div className="login-text" style={{right: "20px",  fontSize: "23px"}}>
                Login To Your Account
            </div>
           
            <div className="google-sign-in" >
                <GoogleLoginComponent  >
                </GoogleLoginComponent>
              
            </div>
          <p>



          </p>
          <div  className='email-text'>
                <form action="#" autoComplete="off">
                    <p style={{textAlign: "center", fontSize: "20px"}}>
                        Enter email and password
                    </p>
                    <div >
                        <div className="input-login" style={{border: "1px solid black", borderRadius: "7px"}}>
                            <input type="text" autoComplete="email" className="form-control" name="email" value={user.email}  onChange={handleChange} placeholder="Your email"/>
                        </div>
                    </div>
                    <p style={{color: "gray"}}>
                        . 
                    </p>
                    <div >
                        <div className="input-login" style={{border: "1px solid black", borderRadius: "7px"}}>
                            <input type="password" autoComplete="current-password" className="form-control" name="password" value={user.password}  onChange={handleChange} placeholder="Your password"/>
                        </div>
                    </div>
                <div className="forgot-link">
                     <div style={{textAlign: "center"}}>
                            <a href="/forgotpassword" className="link-primary">
                                Forgot Your Password?
                            </a>
                    </div>
                    <div className="sign-link" style={{textAlign: "center"}}>
                <button type="button" className="btn btn-link" onClick={() => navigate('/signup')}>
                    Sign Up?
                </button>
            </div>
                    </div>
                    <div >
                        <ReCAPTCHA
                            size="invisible"
                            sitekey="6Lf02yQjAAAAACG2joKuBxO9nGQBjTvBmHpU4AY_"
                            ref={recaptchaRef}
                            onChange={login}
                        />
                        <button className='login' type="submit" onClick={handleRecaptcha}>
                            Login
                        </button>
                    </div>
                
                </form>
            </div>
            </div>
        </div>
    )
    }
export default LoginComponent