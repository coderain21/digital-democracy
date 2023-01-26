import React, {useState, useEffect} from 'react';
import "./Address.css";
import Logo from './logo.svg';
function Address({user, setUser, page, setPage}){
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (user.address === "") {
            setSuggestions([]);
        }
        else {
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
            autocomplete.getPlacePredictions({ input: user.address, types: ["address"] }, storeSuggestions);
        }
    }, [user.address])

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,
        [name]:value
        });
    }

    const handleClick = e => {
        const {name} = e.target;
        if (name === "address"){
            setUser({
                ...user,
                zipcode: ""
            });
            setShowDropdown(true);
        }
        if (name === "zipcode"){
            setUser({
                ...user,
                address: ""
            });
        }
    }

    const handleSelection = e => {
        const value = e.target.textContent;
        setUser({
        ...user,
        address:value
        });
    }

    const windowOnclick = e => {
        const {name} = e.target;
        if (name !== "address"){
            setShowDropdown(false);
        }
    }
    window.onclick = windowOnclick;
    
    const next = () => {
        if (user.address || user.zipcode){
            window.onclick = null;
            setPage(page + 1);

        }
        else {
            setErrorMessage("Please enter an address or zipcode.")
        }
    }

    return (
        <>
            {errorMessage && 
                <p>
                    {errorMessage}
                </p>
            }
            <div style={{backgroundColor: "rgba(154, 150, 150, 0.3)", borderBottom: "3px solid black", display: "flex", justifyContent: "center", height: "200px"}}>
                <div className='logo' >
                    <Logo className='logo-img' style={{ position:"fixed", left: "100px", top: "30px"}}/>
                </div>
                <form action="#">
                    <div className="input-address">
                        <label className='street-text' htmlFor="street-address">
                            Full Street Address
                        </label>
                        <input style={{  border: "1px solid black", borderRadius: "8px"}} id="street-address" type="text" className="" name="address" value={user.address} onClick={handleClick} onChange={handleChange} placeholder="Street Address"/>
                    </div>
                    <ul className="list-group">
                        {showDropdown && suggestions.map((suggestion) => (
                            <li
                                className='list-group-item'
                                onClick={handleSelection}
                                key={suggestion}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                    <div className="input-address">
                        <label className='zip-text' htmlFor='zip'>
                            Or ZIP Code only for limited features
                        </label>
                        <input style={{ width: "60%", border: "1px solid black", borderRadius: "8px"}} id='zip' type="text" className="" name="zipcode" value={user.zipcode} onClick={handleClick} onChange={handleChange} placeholder="ZIP Code"/>
                    </div>
                    <button className='next' type="submit" onClick={next} >
                        Next
                    </button>
                </form>
            </div>
        </>
    )
}

export default Address