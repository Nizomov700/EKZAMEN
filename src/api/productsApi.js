import axios from "axios";

const BASE_URL = "https://fcc9b98a874bc227.mokky.dev/";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
