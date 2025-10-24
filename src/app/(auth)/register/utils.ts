import axios from "axios";
import { User } from "@/app/types/user";

export type RegisterCredentials = {
  displayName: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type RegisterResponse = {
  user: User;
  token: string;
};

// API function for user registration
export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('https://games-review-api.onrender.com/api/auth/register', {
      email: credentials.email,
      password: credentials.password,
      displayName: credentials.displayName,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred during registration');
  }
};