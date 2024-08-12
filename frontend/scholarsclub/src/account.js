// import logo from './logo.svg';
import { Navigate } from "react-router-dom";
import './account.css';
import Navbar from "./navbar"; // Update the import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Form, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export async function loader({params}){
    const userName = (params.username);
    return userName;
}

function Account() {

    const navigate = useNavigate();

    const userName = useLoaderData();
    //console.log(userName);

    useEffect(() => {
        if(!userName){
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
                    // //console.log("wat");
                    // if(!data){
                    //     //console.log("hiii!");
                    //     navigate("/404");
                    //     return;
                    // }
                    //console.log(data);
                    document.getElementById("username").innerHTML = data.userName;      
                    document.getElementById("bio").innerHTML = data.bio;      
                    document.getElementById("pfp").src = data.pfp;  
                }));
            }
        }else{
            fetch("http://localhost:8080/acc/undata", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({username: userName})
            }).then((res) => res.json()).then((data => {
                //console.log(data);
                document.getElementById("username").innerHTML = data.userName;      
                document.getElementById("bio").innerHTML = data.bio;      
                document.getElementById("pfp").src = data.pfp;
                
                if(data.id === localStorage.getItem("_id")){
                    document.getElementById("accountedit").style.display = "flex";
                    //console.log(data.id);
                    //console.log(localStorage.getItem("_id"));
                }
                
            }));
        }
    }, []);
  return (
    <div>
      <Navbar />
      <div class="user">
        <div class="pfpuser">
            <img id="pfp" src=""></img>
            <h1 id="username">USERNAME HERE!!!</h1>
        </div>
        <h3 id="bio">BIO HERE!!!</h3>
        <div id="accountedit">
            If you see this text, it means you are logged into this account!
            We'll add account editing stuff here later
        </div>
      </div>
    </div>
    );
}

export default Account;
