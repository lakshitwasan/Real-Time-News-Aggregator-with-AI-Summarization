import React, { useState, useEffect } from 'react';
import './HomePage.css';
import LatestNews from '../Latest News/LatestNews';
import { fetchNews } from '../../services/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomePage() {
    const [firstNews, setFirstNews] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [loadingFirstNews, setLoadingFirstNews] = useState(true);
    const [loadingLatestNews, setLoadingLatestNews] = useState(true);

    useEffect(() => {
        const getFirstNews = async () => {
            // Fetch technology news first
            const data = await fetchNews("technology");
            const firstArticle = data.articles[0];
            setFirstNews(firstArticle);
            setLoadingFirstNews(false);

            // Introduce a delay before fetching sports news
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

            // Fetch sports news
            const data2 = await fetchNews("sports");
            const trimmedNews = data2.articles.slice(0, 8).map(article => ({
                ...article,
                title: article.title.split(" ").slice(0, 10).join(" ") + "...",
                description: article.text.split(" ").slice(0, 20).join(" ") + "..."
            }));
            setLatestNews(trimmedNews);
            setLoadingLatestNews(false);
        };

        getFirstNews();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="welcome-box p-3 text-center">
                    <p className='welcome-box-header'>WELCOME TO BULLETIN</p>
                    <p className="welcome-quote">
                        "Stay <span>informed</span> 📢, stay <span>engaged</span> 💬,<br />
                        and never miss the <span> news</span> that matters 📰"
                    </p>
                </div>

                {/* Horizontal Card for Technology News */}
                {loadingFirstNews ? (
                    <div className="horizontal-news-card my-5 d-flex">
                        {/* Placeholder for image */}
                        <div className="col-md-6 p-0 first-img-div rounded-3">
                            <Skeleton width={200} count={1} height={200} />
                        </div>

                        {/* Placeholder for text */}
                        <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                            <Skeleton count={1} height={200} />
                        </div>
                    </div>
                ) : (
                    firstNews && (
                        <div className="horizontal-news-card my-5 d-flex">
                            {/* Left side: Image */}
                            <div className="col-md-6 p-0 first-img-div rounded-3">
                                <img
                                    src={firstNews.image}
                                    alt={firstNews.title}
                                    className="img-fluid"
                                    style={{ height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Right side: Heading and Description */}
                            <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                                <div>
                                    <h3 className="first-news-title mb-3">{firstNews.title}</h3>
                                    <p className="first-news-description">{firstNews.summary}</p>
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
                    )
                )}

                {/* Latest News Section */}
                {loadingLatestNews ? (
                    <Skeleton count={4} height={200} />
                ) : (
                    <LatestNews latestNews={latestNews} />
                )}
            </div>
        </>
    );
}

