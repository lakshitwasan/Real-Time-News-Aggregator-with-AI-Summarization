import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { ReactTyped } from "react-typed";
import './Article.css';

const Article = () => {
    const location = useLocation();
    const article = location.state?.article;
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSummarizing, setIsSummarizing] = useState(true);

    useEffect(() => {
        if (article) {
            setIsLoading(false);
            summarizeArticle();
        } else {
            console.error("No article found in state");
        }
    }, [article]);

    const summarizeArticle = async () => {
        setIsSummarizing(true);
        try {
            const response = await axios.post('http://localhost:8080/summarize', {
                text: article.text
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error summarizing article:', error);
        }
        setIsSummarizing(false);
    };

    const formatTextWithLineBreaks = (text) => {
        // Split the text by ". " to identify sentence endings
        const sentences = text.split('. ');

        // Initialize an array to accumulate sentences
        let formattedText = '';
        let periodCount = 0;

        // Loop through the sentences and add line breaks after every 5 periods
        sentences.forEach((sentence, index) => {
            formattedText += sentence + '. ';

            // Increment period count and add line break after every 5 sentences
            periodCount++;
            if (periodCount === 5) {
                formattedText += '<br/><br/>';
                periodCount = 0;  // Reset the counter
            }
        });

        return formattedText;
    };

    if (isLoading) {
        return <div>Loading article...</div>;
    }

    if (!article) {
        return <div>No article found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-danger">{article.title}</h1>
            {article.image && <img src={article.image} alt="Article" className="img-fluid my-3 w-100 mb-4" />}

            <div className="row">
                <div className="col-md-8">
                    <p className="text-justify" dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(article.text) }} />
                    <a href={article.url} className="btn visit-article-btn">Visit Article</a>
                </div>

                <div className="col-md-4">
                    {isSummarizing ? (
                        <div className='p-3'>
                            <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} />
                            <p className="text-center text-muted">Summarizing...</p>
                        </div>
                    ) : (
                        <div className="summary">
                            <h3 className="text-danger text-center mb-3">Summary</h3>
                            <ReactTyped
                                strings={[summary]}
                                typeSpeed={20}
                                backSpeed={50}
                                loop={false}
                                showCursor={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Article;
