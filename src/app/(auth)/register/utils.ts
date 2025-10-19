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
  const response = await fetch('https://games-review-api.onrender.com/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      displayName: credentials.displayName,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Registration failed with status ${response.status}`);
  }

  const data: RegisterResponse = await response.json();
  return data;
};