export type LoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  createdAt: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

// API function for user login
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch('https://games-review-api.onrender.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Login failed with status ${response.status}`);
  }

  const data: LoginResponse = await response.json();
  return data;
};
