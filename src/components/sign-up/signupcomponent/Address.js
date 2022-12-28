import React, {useState} from 'react';
import "./Address.css";

function Address({user, setUser, page, setPage}){
    const [suggestions, setSuggestions] = useState([]);

    function handleAddress(input) {
        const storeSuggestions = function (predictions, status) {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
              alert(status);
              return;
            }
        
            const newSuggestions = [];
            predictions.forEach((prediction) => {
                newSuggestions.push(prediction.description);
            });
            setSuggestions(newSuggestions);
        };

        const autocomplete = new window.google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions({ input: input, types: ["address"] }, storeSuggestions);
        
    }

    function deployDropdown() {
        var dropdown = document.getElementById("suggestions");
        dropdown.classList.add("show");
        dropdown.classList.remove("hide");
      }
    function hideDropdown() {
        var dropdown = document.getElementById("suggestions");
        if (dropdown){
            dropdown.classList.add("hide");
            dropdown.classList.remove("show");
        }
      }

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,
        [name]:value
        });
        if (name === "address"){
            if (value === ""){
                setSuggestions([]);
            }
            else {
            handleAddress(value);
            }
        };
        
    };

    const handleClick = e => {
        const {name} = e.target;
        if (name === "address"){
            setUser({
                ...user,
                zipcode: ""
                });
            deployDropdown();
        }
        if (name === "zipcode"){
            setSuggestions([]);
            setUser({
                ...user,
                address: ""
                });
        }
    };

    const handleSelection = e => {
        const value = e.target.textContent;
        setUser({
        ...user,
        address:value
        });
    }

    const windowOnclick = e => {
        const {name} = e.target;
        if (name === "address"){
            return;
        }
        else {
            hideDropdown();
        }
    }
    window.onclick = windowOnclick;
    
    const next = () => {
        if (user.address || user.zipcode){
            window.onclick = null;
            setPage(page + 1);

        }
        else {
            alert("Invalid input")
        }
    };

    return ( 
        <div className="row text-center">
            <div className="col-md-12">
                <form action="#">
                    <div className="container w-25 position-relative">
                        <div>
                            Full Street Address
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" name="address" value={user.address} onClick={handleClick} onChange={handleChange} placeholder="Street Address"/>
                        </div>
                        <div id="suggestions" className="position-absolute w-100">
                            <ul id="dropdownlist" className="list-group">
                                {suggestions.map((suggestion) => (
                                    <li
                                        className='list-group-item'
                                        onClick={handleSelection}
                                        key={suggestion}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            Or ZIP Code only for limited features
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" name="zipcode" value={user.zipcode} onClick={handleClick} onChange={handleChange} placeholder="ZIP Code"/>
                        </div>
                      </div>
                      <div className="container">
                        <button type="submit" onClick={next} >
                          Next
                        </button>
                        
                      </div>
                </form>
            </div>
        </div>
      
        )  
}

export default Address