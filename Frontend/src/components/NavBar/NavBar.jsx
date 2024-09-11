import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    return (
        <Navbar expand="lg" className="fixed-top">
            <Container>
                {/* Left Side: Page Name */}
                <Navbar.Brand className="d-flex align-items-center justify-content-start">
                    <Link to="/" className="navbar-title">
                        <span className="navbar-brand-text">Bulletin</span>
                    </Link>
                    <span className="mx-2 navbar-divider">|</span>
                    <Nav className="navbar-links">
                        {/* LINKING */}
                        <Nav.Link as={Link} to="/world" className="nav-item-link">World</Nav.Link>
                        <Nav.Link as={Link} to="/technology" className="nav-item-link">Technology</Nav.Link>
                        <Nav.Link as={Link} to="/sports" className="nav-item-link">Sports</Nav.Link>
                    </Nav>
                </Navbar.Brand>

                {/* Right Side: Notification and Profile Icon */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center justify-content-end navbar-right">
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
