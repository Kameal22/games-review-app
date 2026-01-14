import axios from "axios";
import { User } from "@/app/types/user";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

// API function for user login
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post('https://games-review-api.onrender.com/api/auth/login', {
      email: credentials.email,
      password: credentials.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Logowanie nie powiodło się';
      throw new Error(errorMessage);
    }
    throw new Error('Wystąpił nieoczekiwany błąd podczas logowania');
  }
};
