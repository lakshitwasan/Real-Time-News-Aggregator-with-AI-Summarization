const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({
        userId
            : user._id
    }, "idontsmoke", { expiresIn: "1h" });
    res.json({ token });
});

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        res.json({
            message: "User registered successfully",
            userId: savedUser._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/preferences/:userId", async (req, res) => {
    try {
        const { preferences } = req.body;
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (preferences.length > 2) {
            return res.status(400).send("Maximum 2 preferences allowed");
        }

        user.preferences = preferences;
        await user.save();

        res.status(200).send("Preferences updated successfully");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.get("/preferArticle/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user || user.preferences.length === 0) {
            return res.status(400).send("User preferences not found");
        }

        // Fetch news articles based on preferences
        const preferences = user.preferences.join(",");
        const newsApiUrl = `https://api.worldnewsapi.com/search-news?category=${preferences}`;

        const response = await axios.get(newsApiUrl, {
            headers: {
                "x-api-key": process.env.NEWS_API_KEY,
            },
            params: {
                language: "en",
                source_countries: "US",
                number: 12, // Adjust this number per category (if needed)
            },
        });

        const articles = response.data.news;
        console.log(response.data.news);
        res.status(200).send(articles);
    } catch (error) {
        console.error("Error fetching news articles:", error);
        res.status(500).send("Error fetching news articles");
    }
});

module.exports = router;