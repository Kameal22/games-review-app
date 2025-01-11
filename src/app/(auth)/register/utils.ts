import axios from "axios";

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

// API function
export const registerUser = async (credentials: RegisterCredentials) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    credentials
  );
  return response.data;
};