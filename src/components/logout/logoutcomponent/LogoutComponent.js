import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LogoutComponent ({setAuth}) {
    const navigate = useNavigate();
    const logout = async () => {
        console.log("Logging out");
        try {
            const res = await axios.post("http://localhost:8000/logout", {}, {
                withCredentials: true
            });
            setAuth('');
            alert(res.data.message);
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