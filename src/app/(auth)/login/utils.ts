import axios from "axios";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", credentials);
  return response.data;
};
