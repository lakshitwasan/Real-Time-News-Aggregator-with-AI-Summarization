require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not in .env

app.use(cors());

// API FETCHING
app.get("/news", async (req, res) => {
    try {
        // API call with dynamic category and additional parameters
        const response = await axios.get("https://api.worldnewsapi.com/search-news", {
            headers: {
                "x-api-key": process.env.NEWS_API_KEY
            },
            params: {
                categories: req.query.categories,
                language: "en", // Language of the articles
                source_countries: "US", // Example source country
                number: 10, // Number of articles to fetch
            }
        });

        // console.log("_________________________________")
        // console.log(response)
        // console.log("_________________________________")

        // Check if valid news data exists
        if (response.data.news) {
            res.json({
                status: "success",
                articles: response.data.news
            });
        } else {
            res.status(404).json({ message: "No articles found" });
        }
    } catch (e) {
        console.error("Error fetching news:", e.message || e);
        res.status(500).json({ message: "Error fetching news" });
    }
});

// Root route to confirm backend is running
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
