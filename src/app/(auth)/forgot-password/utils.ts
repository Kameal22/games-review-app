import axios from "axios";

export const forgotPassword = async (email: string) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", email);
  return response.data;
};
