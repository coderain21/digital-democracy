import React from 'react';
import "./Address.css";
import Logo from './logo.svg';
function Address({user, setUser, page, setPage}){

    function setSuggestions(input) {

        clearSuggestions();
        const storeSuggestions = function (predictions, status) {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
              alert(status);
              return;
            }
        
            const dropdownlist = document.getElementById('dropdownlist');
            predictions.forEach((prediction) => {
                var item = document.createElement('li');
                item.className = 'list-group-item';
                item.addEventListener('click',handleSelection);
                item.appendChild(document.createTextNode(prediction.description));
                dropdownlist.appendChild(item);
            });
          };

        const autocomplete = new window.google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions({ input: input, types: ["address"] }, storeSuggestions);
        
        console.log('added dropdown');
    }

    function clearSuggestions() {
        const dropdownlist = document.getElementById('dropdownlist');
        while (dropdownlist.firstChild) {
            dropdownlist.removeChild(dropdownlist.firstChild);
        }
    }

    function deployDropdown() {
        console.log("Showing Dropdown");
        var dropdown = document.getElementById("suggestions");
        dropdown.classList.add("show");
        dropdown.classList.remove("hide");
      }
    function hideDropdown() {
        console.log("Hiding Dropdown");
        var dropdown = document.getElementById("suggestions");
        if (dropdown){
            dropdown.classList.add("hide");
            dropdown.classList.remove("show");
        }
      }

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
        ...user,//spread operator 
        [name]:value
        });
        if (name === "address"){
            if (value === ""){
                clearSuggestions();
            }
            else {
            setSuggestions(value);
            }
        };
        
    };

    const handleClick = e => {
        const {name} = e.target;
        if (name === "address"){
            setUser({
                ...user,//spread operator 
                zipcode: ""
                });
            deployDropdown();
        }
        if (name === "zipcode"){
            clearSuggestions();
            setUser({
                ...user,//spread operator 
                address: ""
                });
        }
    };

    const handleSelection = e => {
        const value = e.target.textContent;
        setUser({
        ...user,//spread operator 
        address:value
        });
        console.log("selection made");
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
        <div  style={{backgroundColor: "rgba(154, 150, 150, 0.3)", borderBottom: "3px solid black", display: "flex", justifyContent: "center", height: "200px"}}>
             <div className='logo' >
            <Logo className='logo-img' style={{ position:"fixed", left: "100px", top: "30px"}}/>
            </div>
            <div >
                <form action="#">
                    <div >
                        <div className='street-text'>
                            Full Street Address
                        </div>
                        <div className="input-address">
                            <input style={{  border: "1px solid black", borderRadius: "8px"}} type="text" className="" name="address" value={user.address} onClick={handleClick} onChange={handleChange} placeholder="Street Address"/>
                        </div>
                        <div >
                            <ul className="list-group">
                            </ul>
                        </div>
                        <div className='zip-text'>
                            Or ZIP Code only for limited features
                        </div>
                        <div className="input-address">
                            <input style={{ width: "60%", border: "1px solid black", borderRadius: "8px"}} type="text" className="" name="zipcode" value={user.zipcode} onClick={handleClick} onChange={handleChange} placeholder="ZIP Code"/>
                        </div>
                      </div>
                      <div >
                        <button className='next' type="submit" onClick={next} >
                          Next
                        </button>
                        
                      </div>
                </form>
            </div>
        </div>
      
        )  
}

export default Address