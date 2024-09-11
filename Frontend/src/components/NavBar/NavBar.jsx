import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="fixed-top">
            <Container>
                {/* Left Side: Page Name */}
                <Navbar.Brand className="d-flex align-items-center">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem' }}>Bulletin</span>
                    </Link>
                    <span className="mx-2" style={{ color: '#ccc' }}>|</span>
                    <Nav className="me-auto">
                        {/* LINKING */}
                        <Nav.Link as={Link} to="/world">World</Nav.Link>
                        <Nav.Link as={Link} to="/technology">Technology</Nav.Link>
                        <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
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
