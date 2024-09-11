import React from 'react';
import './HomePage.css';// Import the new component
import LatestNewsCarousel from '../Latest News Carousal/LatestNewsCarousel';

export default function HomePage() {
    return (
        <>
            <div className="container mt-5">
                <div className="welcome-box p-5 text-center">
                    <h2>Welcome to <span className="bulletin-red">Bulletin</span></h2>
                    <p className="lead">
                        "Stay <span className="bulletin-red">informed</span>, stay <span className="bulletin-red">engaged</span>, and never miss the <span className="bulletin-red">news</span> that matters."
                    </p>
                </div>

                {/* Latest News Carousel */}
                <LatestNewsCarousel />
            </div>
        </>
    );
}
