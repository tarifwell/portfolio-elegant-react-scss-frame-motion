// src/api/abouts.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/abouts";
// const API_URL = process.env.;

export const getAllAbouts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching abouts:", error);
    throw error;
  }
};

/*
export const getAboutsMeta = async () => {
  try {
    const response = await axios.get(`${API_URL}/meta`);
    return response.data;
  } catch (error) {
    console.error("Error fetching abouts meta:", error);
    throw error;
  }
};

export const getAboutById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching about with id ${id}:`, error);
    throw error;
  }
};

// src/api/abouts.js
export const getAboutsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search/by-name`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching abouts by name "${name}":`, error);
    throw error;
  }
};

export const createAbout = async (aboutData) => {
  try {
    const response = await axios.post(API_URL, aboutData);
    return response.data;
  } catch (error) {
    console.error("Error creating about:", error);
    throw error;
  }
};

export const updateAbout = async (id, aboutData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, aboutData);
    return response.data;
  } catch (error) {
    console.error(`Error updating about with id ${id}:`, error);
    throw error;
  }
};

export const deleteAbout = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting about with id ${id}:`, error);
    throw error;
  }
};
*/