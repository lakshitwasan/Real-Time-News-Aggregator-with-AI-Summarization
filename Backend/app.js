require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const REFRESH_INTERVAL = 10 * 60 * 1000; // Refresh every 10 minutes
const REQUEST_DELAY = 1000; // 1 second delay between API requests

app.use(cors());
app.use(express.json()); // To parse JSON requests
app.use("/auth", authRoutes); // Prefix for authentication routes

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

let cachedNewsData = {}; // Cache each category's data separately

// List of categories to fetch
const categories = ["technology", "entertainment", "sports", "business", "health", "science", "lifestyle", "travel"];

// Function to delay API requests
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch news for a given category
async function fetchNewsByCategory(category) {
    try {
        const response = await axios.get("https://api.worldnewsapi.com/search-news", {
            headers: {
                "x-api-key": process.env.NEWS_API_KEY,
            },
            params: {
                categories: category,
                language: "en",
                source_countries: "US",
                number: 12, // Adjust this number per category (if needed)
            },
        });

        if (response.data.news) {
            console.log(`Fetched ${response.data.news.length} articles for category: ${category}`);
            return response.data.news; // Return articles for the category
        } else {
            console.log(`No articles found for category: ${category}`);
            return [];
        }
    } catch (e) {
        console.error(`Error fetching news for category ${category}:`, e.message || e);
        return [];
    }
}

// Function to fetch news for all categories sequentially with a delay
async function fetchAndCacheAllNews() {
    const startTime = Date.now(); // Capture start time
    console.log("Fetching and caching news for all categories...");

    for (const category of categories) {
        const news = await fetchNewsByCategory(category);
        cachedNewsData[category] = news;
        await delay(REQUEST_DELAY); // Delay between each API request
    }

    const endTime = Date.now(); // Capture end time
    const timeTaken = endTime - startTime; // Calculate time taken

    console.log("News data cached successfully.");
    console.log(`Data fetching started at: ${new Date(startTime).toLocaleString()}`);
    console.log(`Data fetching completed at: ${new Date(endTime).toLocaleString()}`);
    console.log(`Total time taken: ${(timeTaken / 1000).toFixed(2)} seconds`);
}

// Call the function once at startup and set an interval to refresh the cache
fetchAndCacheAllNews();
setInterval(fetchAndCacheAllNews, REFRESH_INTERVAL);

// Route to serve news by category
app.get("/:category", (req, res) => {
    const { category } = req.params;

    if (!cachedNewsData[category] || !cachedNewsData[category].length) {
        return res.status(404).json({ message: `No articles found for category: ${category}` });
    }

    res.json({
        status: "success",
        articles: cachedNewsData[category],
    });
});

// Root route to confirm backend is running
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
