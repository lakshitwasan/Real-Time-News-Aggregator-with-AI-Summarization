import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                username,
                password,
            });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            console.error("Authentication failed:", error);
            setUsername("");
            setPassword("");

            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Auto-dismiss error alert after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Log into Bulletin</h2>
                <blockquote className="blockquote text-center mb-4" style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                    "Stay informed 📢, stay engaged 💬, and never miss the news that matters 📰"
                </blockquote>
                {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMessage}
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
                    <button type="submit" className="btn btn-danger w-100 mb-3">
                        Login
                    </button>
                    <div className="text-center mt-2">
                        Don't have an account? <a href="/register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
