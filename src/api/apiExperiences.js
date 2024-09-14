import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+"/experiences";

export const getAllExperiences = async () => {
    try {
        const response = await axios.get(API_URL);        
        return response.data;
    } catch (error) {
        console.error("Error fetching experiences:", error);
        throw error;
    }
}