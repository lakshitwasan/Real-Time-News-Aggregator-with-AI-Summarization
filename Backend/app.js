require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors());

// API FETCHING
app.get("/news", async (req, res) => {
    try {
        // Default to 'general' category if not provided
        const category = req.query.category || "general";

        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: "us",
                category: category,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Filter out articles that don't have valid images
        const filteredArticles = response.data.articles.filter(article => article.urlToImage && article.urlToImage !== "");

        // Send only filtered articles to the frontend
        res.json({
            status: response.data.status,
            totalResults: filteredArticles.length,
            articles: filteredArticles
        });
    } catch (e) {
        console.error("Error fetching news:", e);
        res.status(500).send("Error fetching news");
    }
});

// Root route to confirm backend is running
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
