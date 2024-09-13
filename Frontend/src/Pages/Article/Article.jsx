import axios from 'axios'
import React, { useState } from 'react'

const Article = ({ article }) => {

    // call the url from flask server to summarize the article
    const [summary, setSummary] = useState('');


    const summarizeArticle = async () => {
        try {
            const response = await axios.post('http://localhost:8080/summarize', {
                text: article.text
            })
            setSummary(response.data.summary)
        } catch (error) {
            console.error('Error summarizing article:', error)
        }
    }

    return (
        <div>
            <div className="container">
                {
                    <div className="article">
                        <h1>{article.title}</h1>
                        <p>{article.text}</p>
                    </div>
                }
            </div>

            <button onClick={summarizeArticle}>Summarize Article</button>
            <div className="summary">
                <h3>Summary</h3>
                <p>{summary}</p>
            </div>
        </div>
    )
}

export default Article
