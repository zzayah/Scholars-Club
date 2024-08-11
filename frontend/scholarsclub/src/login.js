import { Form, Navigate, redirect } from "react-router-dom";
import './login.css'

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Create(){

    const navigate = useNavigate();


    function switchText(){
        
    }

    function handleLogin(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());


        var serverUrl = "http://localhost:8080/acc/login";
        
        fetch(serverUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formJson)
        }).then((res) => res.json()).then((data => {
            if(data.error_msg){
                alert("Login failed!");
            }else{
                alert("Logged in!");
                localStorage.setItem("_id", data.id);
                navigate("/account/"+formJson["username"]);
            }
        }))
        

    }


    return (
        <div class="main">
            {/* <div class="header">
                <h1>Green Earth</h1>
            </div> */}
            <div class="content">
                <div class="wrapper">
                    <h1>Login</h1>
                    <form method="post" onSubmit={handleLogin}>
                        {/* Replace Labels with a div soon */}
                        <label><br></br></label>
                    <label>
                        <input name="username" placeholder='Username' /> <FaUser class="icon"/>
                    </label>
                    <label><br></br></label>
                    <label>
                        <input name="password" placeholder='Password'/> <FaLock class="icon"/>
                    </label>

                    <label><br></br></label>

                    <label>
                        No account? <a href="/create">Create one.</a>
                    </label>

                    <button type="submit">Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
};