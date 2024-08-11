import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    function logout(){
        console.log("logout");
        localStorage.setItem("_id", "");
        navigate("/login");
    }

    return (
        <BootstrapNavbar bg="dark" data-bs-theme="dark">
            <Container>
                <BootstrapNavbar.Brand href="#home">Scholars Club</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/create">Create Account</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;