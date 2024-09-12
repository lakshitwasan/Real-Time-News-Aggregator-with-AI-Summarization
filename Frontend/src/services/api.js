import axios from 'axios';

export const fetchNews = async (category) => {
    try {
        const response = await axios.get('http://localhost:5000/news', {
            params: {
                categories: category,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the news (API.js) :", error.response.data);
        return { articles: [] };
    }
};
