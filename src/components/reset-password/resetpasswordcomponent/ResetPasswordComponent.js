import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import axios from 'axios';

function ResetPasswordComponent () {
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassowrd] = useState('');
    const [match, setMatch] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const navigate = useNavigate();
    const { resetToken } = useParams();

    useEffect(() => {
        setMatch(password === reenterPassword);
        setErrorMessage(null);
    }, [password, reenterPassword])

    useEffect(() => {
        setIsValidPassword(passwordScore >= 2);
        setErrorMessage(null);
    }, [passwordScore])

    const handleChangeScore = (score, feedback) => {
        setPasswordScore(score);
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (!isValidPassword) {
            setErrorMessage('Password is too weak')
        }
        else if (!match) {
            setErrorMessage('Passwords do not match')
        }
        else {
            try {
                const res = await axios.post("http://localhost:8000/resetPassword", {resetToken, password});
                console.log(res.data.info);
                setSuccess(true);
            } catch(err) {
                console.log(err);
                setFailure(true);
            }
        }
        
    }

    return (
        <>
            {success ? (
                <>
                    <p>
                        Your password had been reset.
                    </p>
                    <button 
                        type='button'
                        onClick={() => {navigate('/login')}}
                    >
                        Login
                    </button>
                </>
            ) : (failure ? (
                <>
                    <p>
                        Password reset unsuccessful. Please request another reset link.
                    </p>
                    <button 
                        type='button'
                        onClick={() => {navigate('/forgotpassword')}}
                    >
                        Forgot Password
                    </button>
                </>
            ) : (
                <>
                    {errMessage && 
                        <p>
                            {errMessage}
                        </p>
                    }
                    <form>
                        <label htmlFor='password'>
                            Enter new password
                        </label>
                        <input 
                            id='password'
                            type='password' 
                            autoComplete='new-password' 
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='New Password'
                        />
                        <PasswordStrengthBar 
                            password={password}
                            onChangeScore={handleChangeScore} />
                        <label htmlFor='reenter-password'>
                            Re-enter new password
                        </label>
                        <input 
                            id='reenter-password'
                            type='password' 
                            autoComplete='new-password' 
                            name='reenter-password'
                            value={reenterPassword}
                            onChange={(e) => setReenterPassowrd(e.target.value)}
                            placeholder='Re-enter New Password'
                        />
                        <button 
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Reset password
                        </button>
                    </form>
                </>
            ))}   
        </>
    )
}

export default ResetPasswordComponent