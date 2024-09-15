import React from 'react';
import '/Footer.css';
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
                <p className="footer-copyright">Copyright © 2024 BULLETIN</p>
            </div>

            {/* Right Side: Categories and Subheadings */}
            <div className="footer-right">
                <div className="footer-row">
                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/lifestyle">Lifestyle</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/lifestyle">Elections</Link></li>
                            <li><Link to="/lifestyle">Policies</Link></li>
                            <li><Link to="/lifestyle">Diplomacy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/sports">Sports</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/sports">Football</Link></li>
                            <li><Link to="/sports">Tennis</Link></li>
                            <li><Link to="/sports">Cricket</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/business">Business</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/business">Markets</Link></li>
                            <li><Link to="/business">Startups</Link></li>
                            <li><Link to="/business">Finance</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/technology">Technology</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/technology">AI</Link></li>
                            <li><Link to="/technology">Gadgets</Link></li>
                            <li><Link to="/technology">Software</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-row">
                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/entertainment">Entertainment</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/entertainment">Movies</Link></li>
                            <li><Link to="/entertainment">TV Shows</Link></li>
                            <li><Link to="/entertainment">Music</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/health">Health</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/health">Wellness</Link></li>
                            <li><Link to="/health">Fitness</Link></li>
                            <li><Link to="/health">Nutrition</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/science">Science</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/science">Space</Link></li>
                            <li><Link to="/science">Research</Link></li>
                            <li><Link to="/science">Innovation</Link></li>
                        </ul>
                    </div>

                    <div className="footer-category">
                        <h4 className="footer-heading"><Link to="/travel">Travel</Link></h4>
                        <ul className="footer-subheadings">
                            <li><Link to="/travel">Destinations</Link></li>
                            <li><Link to="/travel">Guides</Link></li>
                            <li><Link to="/travel">Experiences</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
