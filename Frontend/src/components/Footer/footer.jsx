import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-container">
            {/* Left Side: Website Name, Quote, and Social Icons */}
            <div className="footer-left">
                <h2 className="footer-website-name">Bulletin</h2>
                <p className="footer-quote">
                    Craft narratives that ignite inspiration, knowledge, and entertainment✨📖🎬
                </p>
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                </div>
                <p className="footer-copyright">Copyright © 2024 BULETIN</p>
            </div>

            {/* Right Side: Categories and Subheadings */}
            <div className="footer-right">
                <div className="footer-row">
                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Politics</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Elections</Link></li>
                            <li><Link to="/news">Policies</Link></li>
                            <li><Link to="/news">Diplomacy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Sports</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Football</Link></li>
                            <li><Link to="/news">Tennis</Link></li>
                            <li><Link to="/news">Cricket</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Business</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Markets</Link></li>
                            <li><Link to="/news">Startups</Link></li>
                            <li><Link to="/news">Finance</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Technology</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">AI</Link></li>
                            <li><Link to="/news">Gadgets</Link></li>
                            <li><Link to="/news">Software</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-row">
                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Entertainment</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Movies</Link></li>
                            <li><Link to="/news">TV Shows</Link></li>
                            <li><Link to="/news">Music</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Health</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Wellness</Link></li>
                            <li><Link to="/news">Fitness</Link></li>
                            <li><Link to="/news">Nutrition</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Science</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Space</Link></li>
                            <li><Link to="/news">Research</Link></li>
                            <li><Link to="/news">Innovation</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/news">Travel</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/news">Destinations</Link></li>
                            <li><Link to="/news">Guides</Link></li>
                            <li><Link to="/news">Experiences</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
