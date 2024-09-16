import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+"/contacts";

export const createContact = async (contactData) => {
    try {
      const response = await axios.post(API_URL, contactData);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  };