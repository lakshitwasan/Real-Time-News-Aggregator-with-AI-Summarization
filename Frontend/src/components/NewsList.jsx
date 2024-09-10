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
        <div>
            <h1>Top News</h1>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;