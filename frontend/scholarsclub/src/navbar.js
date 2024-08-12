import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    function getUserName(id){
        //console.log(id);
        fetch("http://localhost:8080/acc/iddata", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({id: id})
        }).then((res) => res.json()).then((data => {
            //console.log(data.userName);
            navigate("/account/"+data.userName);
        }));
      }


    function logout(){
        //console.log("logout");
        localStorage.setItem("_id", "");
        navigate("/login");
    }

    function account(){
        const id = localStorage.getItem("_id");
        getUserName(id);
       
    }


    return (
        <BootstrapNavbar bg="dark" data-bs-theme="dark">
            <Container>
                <BootstrapNavbar.Brand href="/">Scholars Club</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/create">Create Account</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                    <Nav.Link onClick={account}>Your Account</Nav.Link>
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;