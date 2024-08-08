// import logo from './logo.svg';
import { Navigate } from "react-router-dom";
import './account.css';
import Navbar from "./navbar"; // Update the import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
function Account() {

    if(localStorage.getItem("_id") == null){
        alert("You are not logged in.");
    }else{
        fetch("http://localhost:8080/acc/iddata", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({id: localStorage.getItem("_id")})
        }).then((res) => res.json()).then((data => {
            console.log(data);
            document.getElementById("username").innerHTML = data.userName;      
            document.getElementById("bio").innerHTML = data.bio;      
            document.getElementById("pfp").src = data.pfp;  
        }));
    }

  return (
    <div>
      <Navbar />
      <img id="pfp" src=""></img>
      <h1 id="username">USERNAME HERE!!!</h1>
      <h3 id="bio">BIO HERE!!!</h3>
    </div>
  );
}

export default Account;
