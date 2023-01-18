import React, {useState, useEffect, useRef} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function ForgotPasswordComponent () {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const recaptchaRef = useRef(null);

    useEffect(() =>{
        setIsValidEmail(EMAIL_REGEX.test(email));
        setErrorMessage(null);
    }, [email])

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

    const handleSubmit = async () => {
        if (isValidEmail) {
            setErrorMessage(null);
            try {
                const res = await axios.post("http://localhost:8000/forgotPassword", {email});
                if (res.status === 200) {
                    setSuccess(true);
                }
                console.log(res.data.info);
            } catch(err) {
                setErrorMessage('Email failed to send. Please try again.');
            }
        }
        else {
            setErrorMessage('Please enter a valid email');
        }
        
    }

    return (
        <>  
            {success ? (
                <p>
                    A reset link has been sent to your email
                </p>
            ) : (
                <>
                {errMessage && 
                    <p>
                        {errMessage}
                    </p>
                }
                <form>
                    <label htmlFor='email'>
                        Enter Email
                    </label>
                    <input 
                        id='email'
                        type='text' 
                        autoComplete='email' 
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Your Email'
                    />
                    <ReCAPTCHA
                            size="invisible"
                            sitekey="6Lf02yQjAAAAACG2joKuBxO9nGQBjTvBmHpU4AY_"
                            ref={recaptchaRef}
                            onChange={handleSubmit}
                    />
                    <button 
                        type='submit'
                        onClick={handleRecaptcha}
                    >
                        Send Reset Link
                    </button>
                </form>
                </>
            )}   
        </>
    )
}

export default ForgotPasswordComponent