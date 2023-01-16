import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Interests({user, setUser, page, setPage}){
    const handleChange = () => {
        console.log("handle change");
        var array = [];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value);
        }
        setUser({
            ...user,//spread operator 
            interests: array
            });
    }
    
    const navigate = useNavigate();
    const navigateToHome = ()=>{
        navigate('/');
    }

    const updateInfo = async (e) => {
        e.preventDefault();
        const {name,email,password} = user;
        if (name && email && password){
            await axios.put("http://localhost:8000/user", user);
            navigateToHome();
            alert("Signup successful");
        }
        else{
            alert("Invalid input")
        }
    }

    const previous = () => {
        setPage(page - 1);
    };


    const interestOptions = ['technology', 'economy', 'environment'];

    useEffect(() => {
        const interests = document.getElementById('interests')
        if (interests.children.length=== 0){
            for (var i = 0; i < interestOptions.length; i++){
                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.className = 'btn-check';
                x.value = interestOptions[i];
                x.id = 'checkbox-' + interestOptions[i];
                x.addEventListener('click',handleChange);
                var y = document.createElement('LABEL');
                y.textContent = interestOptions[i];
                y.className = 'btn btn-primary';
                y.setAttribute('for', x.id);
                interests.appendChild(x);
                interests.appendChild(y);
            }
        }
        console.log('added buttons');
    });

    return ( 
        <div className="row text-center">
            <div className="col-md-12">
                Interests
            </div>
            <div className="col-md-12">
                <form action="#">
                      <div className="input-group d-inline-flex flex-column w-25" id="interests">
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