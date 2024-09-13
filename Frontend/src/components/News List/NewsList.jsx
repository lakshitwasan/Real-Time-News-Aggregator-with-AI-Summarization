import React, { useState, useEffect } from 'react';
import './NewsList.css';
import axios from 'axios';

const NewsList = ({ category }) => {
    const [news, setNews] = useState([]);

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
    }, [category]); // Adding 'category' as a dependency ensures it refreshes when the category changes.

    const placeholderImage = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"; // Placeholder image URL

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Top {category.charAt(0).toUpperCase() + category.slice(1)} News</h1> {/* Display the category name */}
            <div className="row">
                {news.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 d-flex flex-column">
                            {/* Image */}
                            <img
                                src={article.image}
                                className="card-img-top img-fluid custom-img"
                                alt={article.title || 'No Image Available'}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                                    e.target.src = placeholderImage; // Fallback to placeholder image
                                }}
                            />
                            {/* Card body */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text flex-grow-1">{article.summary}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
