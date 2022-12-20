import React, {useState, useRef} from 'react';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLoginComponent from './GoogleLogin';
import PasswordStrengthBar from 'react-password-strength-bar';

function ProfileInfo({user, setUser, page, setPage, setAuth}){

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

    const isValidEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    }

    const [passwordScore, setPasswordScore] = useState(0);

    const onChangeScore = (score, feedback) => {
        setPasswordScore(score);
    }
    const signup = ()=>{
        const {name,email,password} = user;
        if (name && email && password){
            if (!isValidEmail(email)){
                alert("Plese enter a valid email")
            }
            else if (passwordScore < 2){
                alert("Plese enter a valid password")
            }
            else {
                try {
                    const res = axios.post("http://localhost:8000/signup", user);
                    console.log(res.data.message);
                    if (res.status === 201){
                        setPage(page + 1);
                    }
                } catch(err) {
                console.error(err);
                }
            }
        }
        else{
            alert("Please fill out all fields")
        }
    }

    return ( 
        <div className="row text-center">
            <div className="container w-25">
              <GoogleLoginComponent setAuth={setAuth}>
              </GoogleLoginComponent>
            </div>
            <div className="col-md-12">
                Create a new account
            </div>
            <span className="col-md-12">
                Already have an account?
                <a href="/login" className="link-primary">
                    Login
                </a>
            </span>
            <div className="col-md-12">
                <form action="#">
                    <div className="container w-25">
                        <div className="input-group">
                            <input type="text" autoComplete="name" className="form-control" name="name" value={user.name} onChange={handleChange} placeholder="Full Name"/>
                        </div>
                      </div>
                      <div className="container w-25">
                        <div className="input-group">
                          <input type="text" autoComplete="email" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
                        </div>
                      </div>
                      <div className="container w-25">
                        <div className="input-group">
                          <input type="password" autoComplete="new-password" className="form-control" name="password" value={user.password} onChange={handleChange} placeholder="password"/>
                        </div>
                        <PasswordStrengthBar 
                            password={user.password}
                            onChangeScore={onChangeScore} />
                      </div>
                      <div className="container">
                        <ReCAPTCHA
                            size="invisible"
                            sitekey="6Lf02yQjAAAAACG2joKuBxO9nGQBjTvBmHpU4AY_"
                            ref={recaptchaRef}
                            onChange={signup}
                        />
                        <button type="submit" onClick={handleRecaptcha} >
                          Sign up
                        </button>
                      </div>
                </form>
      
      
            </div>
        </div>
      
        )
        } 

export default ProfileInfo
