import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css';

const NewsList = ({ category }) => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/${category}`);
                setNews(data.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        getNews();
    }, [category]);

    const placeholderImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

    const handleReadMore = (article) => {
        navigate('/article', { state: { article } }); // Pass article via state
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Top {category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
            <div className="row">
                {news.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 d-flex flex-column">
                            <img
                                src={article.image}
                                className="card-img-top img-fluid custom-img"
                                alt={article.title || 'No Image Available'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = placeholderImage;
                                }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text flex-grow-1">{article.summary}</p>
                                <button
                                    onClick={() => handleReadMore(article)} // Navigate on click
                                    className="btn btn-primary mt-auto"
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
