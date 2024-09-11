import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../services/api';
import './LatestNews.css';

const LatestNews = () => {
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const data = await fetchNews();
            // Trim article descriptions to 20 words and titles to 10 words for consistency
            const trimmedNews = data.articles.slice(0, 8).map(article => ({
                ...article,
                title: article.title.split(" ").slice(0, 10).join(" ") + "...",
                description: article.description.split(" ").slice(0, 20).join(" ") + "..."
            }));
            setLatestNews(trimmedNews);
        };
        getNews();
    }, []);

    return (
        <div className="latest-news-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Latest News</h2>
                <a href="/news" className="see-all-link" style={{ color: 'red', fontWeight: 'bold' }}>See All</a>
            </div>

            <div className="row">
                {latestNews.map((article, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card h-100" style={{ minHeight: '380px' }}>
                            <img
                                src={article.urlToImage}
                                className="card-img-top"
                                alt={article.title}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                {/* Trimmed and left-aligned heading */}
                                <h5 className="card-title text-left">{article.title}</h5>

                                {/* Justified content with margin-bottom */}
                                <p className="card-text text-justify" style={{ textAlign: 'justify' }}>
                                    {article.description}
                                </p>
                                {/* Smaller Button with margin from content */}
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-theme mt-auto"
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'red',
                                        border: '2px solid red',
                                        fontWeight: '500',
                                        width: '90px',
                                        fontSize: '0.85rem',
                                        alignSelf: 'flex-start',
                                        padding: '5px',
                                        marginTop: '20px'
                                    }}
                                >
                                    Read
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestNews;
