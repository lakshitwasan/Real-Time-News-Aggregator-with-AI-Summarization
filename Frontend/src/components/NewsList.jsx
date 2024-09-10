import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const data = await fetchNews();
            setNews(data.articles);
        };
        getNews();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Top News</h1>
            <div className="row">
                {news.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
