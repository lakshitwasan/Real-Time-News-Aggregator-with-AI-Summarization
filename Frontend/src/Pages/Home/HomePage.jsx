import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePage.css';
import LatestNews from '../Latest News/LatestNews';
import { fetchNews } from '../../services/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Article from '../Article/Article';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    const [firstNews, setFirstNews] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [loadingFirstNews, setLoadingFirstNews] = useState(true);
    const [loadingLatestNews, setLoadingLatestNews] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const getNews = async () => {
            try {
                const techResponse = await axios.get('http://localhost:5000/technology');
                const firstArticle = techResponse.data.articles[0];
                setFirstNews(firstArticle);

                const sportsResponse = await axios.get('http://localhost:5000/sports');
                const trimmedNews = sportsResponse.data.articles.slice(0, 8).map(article => ({
                    ...article,
                    title: article.title.split(" ").slice(0, 10).join(" ") + "...",
                    description: article.text.split(" ").slice(0, 20).join(" ") + "..."
                }));
                setLatestNews(trimmedNews);

                setLoadingFirstNews(false);
                setLoadingLatestNews(false);

            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        const intervalId = setInterval(() => {
            if (loadingFirstNews || loadingLatestNews) {
                getNews();
            }
        }, 2000);

        return () => clearInterval(intervalId);

    }, [loadingFirstNews, loadingLatestNews]);

    // Updated Read More button to navigate to /article with state

    const notify = () => {
        toast.success('You have successfully subscribed to our newsletter!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <>
            {firstNews && !loadingFirstNews && <Article article={firstNews} />}
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
                        <div className="col-md-6 p-0 first-img-div rounded-3">
                            <Skeleton width={200} count={1} height={200} />
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                            <Skeleton count={1} height={200} />
                        </div>
                    </div>
                ) : (
                    firstNews && (
                        <div className="horizontal-news-card my-5 d-flex">
                            <div className="col-md-6 p-0 first-img-div rounded-3">
                                <img
                                    src={firstNews.image}
                                    alt={firstNews.title}
                                    className="img-fluid"
                                    style={{ height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                                <div>
                                    <h3 className="first-news-title mb-3">{firstNews.title}</h3>
                                    <p className="first-news-description">{firstNews.summary}</p>
                                </div>
                                <div className='row'>

                                    <button
                                        onClick={() => navigate('/article', { state: { article: firstNews } })}
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
                                            marginRight: "10px",
                                            transition: 'background-color 0.3s ease, color 0.3s ease'
                                        }}
                                    >
                                        Read More
                                    </button>
                                    <button
                                        onClick={notify}
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
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}

                {loadingLatestNews ? (
                    <Skeleton count={4} height={200} />
                ) : (
                    <LatestNews latestNews={latestNews} />
                )}
            </div>
            <ToastContainer />
        </>
    );
}
