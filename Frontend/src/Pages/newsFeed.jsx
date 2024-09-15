import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("/api/news", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h3>Your News Feed</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <a href={article.url}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NewsFeed;
