import axios from 'axios';

export const fetchNews = async () => {
    try {
        const response = await axios.get("http://localhost:5000/news");
        return response.data;
    } catch (e) {
        console.error(`Error fetching news because ${e.message}`);
    }
};
