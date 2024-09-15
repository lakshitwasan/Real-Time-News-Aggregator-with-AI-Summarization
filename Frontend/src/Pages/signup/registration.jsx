import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setErrorMessage(null);

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/auth/register", {
                username,
                password,
            });
            setMessage(response.data.message);
            setUsername("");
            setPassword("");
            setConfirmPassword(""); // Clear confirm password
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Auto-dismiss alerts after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
            setErrorMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, errorMessage]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Sign up to Bulletin</h2>
                <blockquote className="blockquote text-center mb-4" style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                    "Stay informed 📢, stay engaged 💬, and never miss the news that matters 📰"
                </blockquote>

                {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                {message && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 mb-3">
                        Register
                    </button>
                    <div className="text-center mt-2">
                        Already have an account? <a href="/login">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
