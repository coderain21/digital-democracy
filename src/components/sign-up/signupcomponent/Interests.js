import React, { useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from '../../../context/AuthContext';

function Interests({user, setUser, page, setPage}){
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
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
            navigate('/');
            alert("Signup successful");
        }
        else{
            alert("Invalid input")
        }
    }

    const previous = () => {
        setPage(page - 1);
    };

    return ( 
        <div className="row text-center">
            <div className="col-md-12">
                Interests
            </div>
            <div className="col-md-12">
                <form action="#">
                      <div className="input-group d-inline-flex flex-column w-25" id="interests">
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
                      <div>
                        Checked interests: {user.interests.toString()}
                      </div>
                      <div className="container">
                        <button type="submit" onClick={previous} >
                          Previous
                        </button>
                        <button type="submit" onClick={updateInfo} >
                          Finish
                        </button>
                      </div>
                </form>
            </div>
        </div>
      
        )  
}

export default Interests