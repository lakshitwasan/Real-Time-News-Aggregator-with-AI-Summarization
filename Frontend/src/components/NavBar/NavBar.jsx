import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }, 2000); // 2000 ms = 2 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures it only runs once

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

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
                        <Nav.Link as={Link} to="/travel" className="nav-item-link">Travel</Nav.Link>
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

                        {/* Profile Icon or Login Button */}
                        {isLoggedIn ? (
                            <NavDropdown
                                title={<FaUserCircle size={30} />}
                                id="basic-nav-dropdown"
                                align="end"
                            >

                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <button onClick={() => {
                                window.location.href = "/login";
                            }} className="btn btn-danger w-100">
                                Log in
                            </button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
