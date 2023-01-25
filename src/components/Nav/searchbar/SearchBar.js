import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import names from "./searchNames";
import Button from "react-bootstrap/Button";
import { BiSearchAlt } from 'react-icons/bi';

import "./SearchBar.css";

export default function SearchBar() {

  const navigate = useNavigate();
  //This is where we will store our users search query as a string under the key of value
  const [searchText, setSearchText] = useState({ text: "" });
  //Our search button's destination route is unknown until we determine what type of search the user is doing...
  const [linkRoute, setLinkRoute] = useState("");

  const [uriLink, setUriLink] = useState();

  useEffect(()=>{
    navigate(uriLink);
  },[uriLink])

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  function deployDropdown() {
    console.log("Showing Dropdown");
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.add("show");
    dropdown.classList.remove("hide");
  }
  function hideDropdown() {
    console.log("Hiding Dropdown");
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.add("hide");
    dropdown.classList.remove("show");
  }

  //When we click anywhere in the window, we will close our dropdown if it is currently active
  window.onclick = function () {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.add("hide");
    dropdown.classList.remove("show");
  };

  function filterFunction() {
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("myDropdown");
    var a = div.getElementsByTagName("button");
    for (var i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  //We need to run some validation to determine if the user is trying a zipcode search or a politician name search
  function checkZipOrAddress(value) {
    //** We will need to strengthen this validation in the future **
    if (value.match("[0-9]+")) {
      //We see a street number entered in the searchbar - its implied this is an address. Lets set our links to= attribute
      console.log("A number is here, must be an address");
      setLinkRoute(`/dashboard/${value}`);
      hideDropdown();
    } else if (value === "") {
      hideDropdown();
    } else {
      //Not seeing numbers, must be a politician. Lets set our links to= attribute
      console.log("Not a number.. maybe this is a politician search?");
      setLinkRoute(`/profile/${value}`);
      deployDropdown();
    }
  }

  //When searchbar input changes, lets update our searchText value
  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    checkZipOrAddress(value);
    setSearchText({
      ...searchText,
      [name]: value,
    });
    console.log(searchText);
  }

  function clearSearchText() {
    setSearchText({ text: "" });
  }
  return (
    <>
      {/* Search Results Container */}
      <div>
        {/* <form onSubmit={() => navigate(linkRoute)}> */}
          <input
            className="search-bar"
            type="text"
            placeholder="Search politicians, or by address..."
            id="myInput"
            onChange={handleChange}
            value={searchText.text}
            name="text"
            onKeyUp={filterFunction}
            autoComplete="off"
          />

          <div id="myDropdown" className="dropdown-content">
            {names &&
              names.map((name) => {
                var namelink = `/profile/${name.name}`;
                return (
                  <button
                    className="dropdown-button"
                    key={name.name}
                    // to={namelink}
                    onClick={(e) =>{ 
                      console.log(e)  
                      setUriLink(namelink); 
                      // setSearchText({ text: name.name})
                      // console.log(searchText);
                    }}
                  >
                    {name.name}
                  </button>
                );
              })}
         </div>
      {/* <Link to={linkRoute} onClick={clearSearchText} > */}
        <button
        onClick={()=>{
          navigate(`/profile/${searchText.text}`);
        }}
        className="search-btn" variant="outline-success">
          {/* <BiSearchAlt /> */}
          Search
        </button>
      {/* </Link> */}
        {/* </form> */}
      </div>
    </>
  );
}
