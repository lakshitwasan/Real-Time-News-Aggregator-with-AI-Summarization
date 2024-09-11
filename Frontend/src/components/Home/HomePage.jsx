import React, { useState, useEffect } from 'react';
import './HomePage.css';
import LatestNews from '../Latest News/LatestNews';
import { fetchNews } from '../../services/api'; // Ensure this API call is updated to accept a category

export default function HomePage() {
    const [firstNews, setFirstNews] = useState(null);

    useEffect(() => {
        const getFirstNews = async () => {
            const data = await fetchNews('technology'); // Request technology news from the API
            // Select the first article if available
            const firstArticle = data.articles[0];
            setFirstNews(firstArticle);
        };
        getFirstNews();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="welcome-box p-3 text-center">
                    <p className='welcome-box-header' > WELCOME TO BULLETIN</p>
                    <p className="welcome-quote">
                        "Stay <span>informed</span> 📢, stay <span>engaged</span> 💬,<br />
                        and never miss the <span> news</span> that matters 📰"
                    </p>
                </div>

                {/* Horizontal Card for Technology News */}
                {firstNews && (
                    <div className="horizontal-news-card my-5 d-flex">
                        {/* Left side: Image */}
                        <div className="col-md-6 p-0 first-img-div rounded-3">
                            <img
                                src={firstNews.urlToImage}
                                alt={firstNews.title}
                                className="img-fluid"
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Right side: Heading and Description */}
                        <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                            <div>
                                <h3 className="first-news-title mb-3">{firstNews.title}</h3>
                                <p className="first-news-description">{firstNews.description}</p>
                            </div>
                            <a
                                href={firstNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-theme mt-3"
                                style={{
                                    backgroundColor: 'white',
                                    color: 'red',
                                    border: '2px solid red',
                                    fontWeight: 'bold',
                                    width: '120px',
                                    fontSize: '0.85rem',
                                    padding: '8px',
                                    marginTop: '20px',
                                    textAlign: 'center',
                                    transition: 'background-color 0.3s ease, color 0.3s ease'
                                }}
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                )}

                {/* Latest News Section */}
                <LatestNews />
            </div>
        </>
    );
}
