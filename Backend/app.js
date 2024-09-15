require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const REFRESH_INTERVAL = 8 * 60 * 60 * 1000; // Refresh every 8 hours
const REQUEST_DELAY = 1000; // 1 second delay between API requests

app.use(cors());
app.use(express.json()); // To parse JSON requests
app.use("/auth", authRoutes); // Prefix for authentication routes

// Define a schema for the news articles
const newsSchema = new mongoose.Schema({
    category: String,
    articles: Array,
    updatedAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const News = mongoose.model("News", newsSchema);

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI, {
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

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

// Function to fetch news for all categories and store in MongoDB
async function fetchAndStoreAllNews() {
    const startTime = Date.now(); // Capture start time
    console.log("Fetching and storing news for all categories...");

    for (const category of categories) {
        const news = await fetchNewsByCategory(category);

        // Store or update the news data in MongoDB
        await News.findOneAndUpdate(
            { category: category },
            { category: category, articles: news, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        await delay(REQUEST_DELAY); // Delay between each API request
    }

    const endTime = Date.now(); // Capture end time
    const timeTaken = endTime - startTime; // Calculate time taken

    console.log("News data stored successfully.");
    console.log(`Data fetching and storing started at: ${new Date(startTime).toLocaleString()}`);
    console.log(`Data fetching and storing completed at: ${new Date(endTime).toLocaleString()}`);
    console.log(`Total time taken: ${(timeTaken / 1000).toFixed(2)} seconds`);
}

// Call the function once at startup and set an interval to refresh the data
fetchAndStoreAllNews();
setInterval(fetchAndStoreAllNews, REFRESH_INTERVAL);

// Route to serve news by category from MongoDB
app.get("/:category", async (req, res) => {
    const { category } = req.params;

    const newsData = await News.findOne({ category: category });
    if (!newsData || !newsData.articles.length) {
        return res.status(404).json({ message: `No articles found for category: ${category}` });
    }

    res.json({
        status: "success",
        articles: newsData.articles,
    });
});

// Root  
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});