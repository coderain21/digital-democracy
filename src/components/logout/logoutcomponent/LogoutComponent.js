import React, {useContext} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import AuthContext from '../../../context/AuthContext';

function LogoutComponent () {
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);
    const logout = async () => {
        console.log("Logging out");
        try {
            const res = await axios.post("http://localhost:8000/logout", {}, {
                withCredentials: true
            });
            setAuth('');
            console.log(res.data.message)
            alert('Logout successful');
            navigate('/');
        } catch(err) {
            console.error(err);
        }
    }
    return (
        <button type="submit" onClick={logout}>
            Logout
        </button>
    )
}
export default LogoutComponent