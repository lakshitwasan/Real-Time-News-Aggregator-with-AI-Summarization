import axios from 'axios';

export const fetchNews = async (category = 'general') => {
    try {
        const response = await axios.get('http://localhost:5000/news', {
            params: {
                category: category
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { articles: [] };
    }
};
