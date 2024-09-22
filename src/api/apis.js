import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// Function to fetch inventory data
export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventoryentity`);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

// Function to find books by author
export const fetchByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findByAuthor/${author}`);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

// Function to find books by genre
export const fetchByGenre = async (genre) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findByGenre/${genre}`);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

// Function to find books by title
export const fetchByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findByTitle/${title}`);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

// Function to find books by date
export const fetchByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findByDate/${date}`);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    console.log(book);
    const response = await axios.post(`${API_BASE_URL}/inventoryentity`, book);
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

export const deleteBook = async (entryID) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/inventoryentity/${entryID}`
    );
    return response.data; // Assuming the API returns the data directly in the response
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};
