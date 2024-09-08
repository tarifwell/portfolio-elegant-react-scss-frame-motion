import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+"/works";

export const getAllWorks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching works:", error);
        throw error;
    }
}