require("dotenv").config()
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require('cors');


const PORT = process.env.PORT;

app.use(cors());

// API FETCHING
app.get("/news", async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: "us",
                apiKey: process.env.NEWS_API_KEY
            }
        });
        res.json(response.data);
    } catch (e) {
        res.status(500).send("Error fetching news");
    }
})


app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})