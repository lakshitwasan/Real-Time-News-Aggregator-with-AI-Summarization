import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchNews } from '../../services/api'; // Import the API call
import './LatestNewsCarousel.css';

const LatestNewsCarousel = () => {
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const data = await fetchNews();
            setLatestNews(data.articles.slice(0, 8)); // Fetch only 8 latest news articles for the carousel
        };
        getNews();
    }, []);

    return (
        <div className="latest-news-section mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Latest News</h2>
                <a href="/news" className="see-all-link">See All</a>
            </div>

            {/* Carousel for Latest News */}
            <Carousel interval={null} controls={false} indicators={false}>
                {/* First Slide with 4 news */}
                <Carousel.Item>
                    <div className="row">
                        {latestNews.slice(0, 4).map((article, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <img
                                        src={article.urlToImage}
                                        className="card-img-top"
                                        alt={article.title}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text flex-grow-1">{article.description}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                                            Read more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default LatestNewsCarousel;
