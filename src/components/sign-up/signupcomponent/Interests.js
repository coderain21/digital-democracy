import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './interests.css';
import Logo from './logo.svg';
import AuthContext from '../../../context/AuthContext';

function Interests({user, setUser, page, setPage}){
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    // interests array needs to be updated with desired values
    const interestOptions = ['technology', 'economy', 'environment'];

    const handleChange = () => {
        var array = [];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value);
        }
        setUser({
            ...user,
            interests: array
        });
    }

    const updateInfo = async (e) => {
        e.preventDefault();
        const {name,email,password} = user;
        if (name && email && password){
            const res = await axios.put("http://localhost:8000/user", user, {
                headers: {
                    'Authorization': 'Bearer ' + auth.accessToken
                }});
            console.log(res.data.message);
            setSuccess(true)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const previous = () => {
        setPage(page - 1);
    }

    return (
        <> 
            {success ? (
                <p>
                    Signup successful
                </p>
            ) : (
                <div className="" style={{backgroundColor: "rgba(154, 150, 150, 0.3)", borderBottom: "3px solid black", display: "flex", justifyContent: "center", height: "250px"}}>
                    <div className='logo' >
                    <Logo className='logo-img' style={{ position:"fixed", left: "100px", top: "30px"}}/>
                    </div>
                    <div className="interest-text" style={{fontSize: "20px"}}>
                        Interests
                    </div>
                    <div className="">
                        <form action="#">
                            <div className="interest-tabs" id="interests">
                                {interestOptions.map((interest) => (
                                    <div key={'checkbox' + interest}>
                                        <input
                                            type='checkbox'
                                            className='btn-check'
                                            value={interest}
                                            id={'checkbox' + interest}
                                            onClick={handleChange} 
                                        />
                                        <label
                                            className='btn btn-primary'
                                            htmlFor={'checkbox' + interest}
                                        >
                                            {interest}
                                        </label>
                                    </div >
                                ))}
                            </div>
                            <div className='checked-text' style={{fontSize: "20px"}}>
                                Checked interests: {user.interests.toString()}
                            </div>
                            <div className="">
                                <button className='previous' type="submit" onClick={previous} >
                                Previous
                                </button>
                                <button className='finish' type="submit" onClick={updateInfo} >
                                Finish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Interests