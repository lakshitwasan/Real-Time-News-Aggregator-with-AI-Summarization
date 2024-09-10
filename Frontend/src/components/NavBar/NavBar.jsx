import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="fixed-top">
            <Container>
                {/* Left Side: Page Name */}
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <span style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem' }}>Bulletin</span>
                    <span className="mx-2" style={{ color: '#ccc' }}>|</span>
                    <Nav className="me-auto">
                        <Nav.Link href="/world">World</Nav.Link>
                        <Nav.Link href="/technology">Technology</Nav.Link>
                        <Nav.Link href="/sports">Sports</Nav.Link>
                    </Nav>
                </Navbar.Brand>

                {/* Right Side: Notification and Profile Icon */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {/* Notification Icon */}
                        <Nav.Link href="#notifications">
                            <FaBell size={24} />
                        </Nav.Link>

                        {/* Profile Icon */}
                        <NavDropdown
                            title={<FaUserCircle size={30} />}
                            id="basic-nav-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
