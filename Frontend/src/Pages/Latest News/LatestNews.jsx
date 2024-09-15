import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestNews.css';

const LatestNews = ({ latestNews }) => {
    const navigate = useNavigate();

    const handleReadMore = (article) => {
        navigate('/article', { state: { article } }); // Pass article via state
    };

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
                                src={article.image}
                                className="card-img-top"
                                alt={article.title}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-left">{article.title}</h5>
                                <p className="card-text text-justify" style={{ textAlign: 'justify' }}>
                                    {article.description}
                                </p>
                                <button
                                    onClick={() => handleReadMore(article)} // Navigate on click
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
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestNews;
