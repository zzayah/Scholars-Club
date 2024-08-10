import { useNavigate } from "react-router-dom";
import './create.css'

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";


import Dropdown from 'react-bootstrap/Dropdown';

export default function Create(){
    const navigate = useNavigate();

    function switchText(){
        
    }

    function handleLogin(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());


        var serverUrl = "http://localhost:8080/acc/create";
        
        fetch(serverUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formJson)
        }).then((res) => res.json()).then((data => {
            if(data.error_msg){
                alert("Account Creation failed: " + data.error_msg);
            }else{
                alert("Account created!");
                localStorage.setItem("_id", data.id);
                navigate("/account/"+formJson["username"]);
            }
        }))
        // .then(response => {
        //     if (response.status == 200) {
        //         localStorage.setItem("_id", )
        //         alert("Account created!");
        //         redirect("/");
        //     } else {
        //         switch(response.status){
        //             case 999:
        //                 alert("Failed to create account, username taken!");
        //             default:
        //                 alert("Failed to create account!");
        //         }
        //     }
        // })
        .catch(error => {
            console.error("Error:", error);

        
  });
        

}


    return (
        <div class="main">
            {/* <div class="header">
                <h1>Green Earth</h1>
            </div> */}
            <div class="content">
                <div class="wrapper">
                    <h1>Create Account</h1>
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
                        <textarea name="bio" placeholder='Enter bio here'/> <FiAlignJustify class="icon"/>
                    </label>
                    <label><br></br></label>

                    <label>
                        <input name="pfp" placeholder='Enter profile photo URL here'/> <FiPhone class="icon"/>
                    </label>
                    <label><br></br></label>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="accType">
                            Account type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Student Leader</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Student</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <label><br></br></label>

                    <button type="submit">Create Account</button>
                    </form>
                </div>
            </div>

        </div>
    )
};