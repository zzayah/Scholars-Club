import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="dark" data-bs-theme="dark">
            <Container>
                <BootstrapNavbar.Brand href="#home">Navbar</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;