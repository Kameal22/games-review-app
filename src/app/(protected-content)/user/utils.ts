import axios from "axios";
import Cookies from "js-cookie";

// Helper function to extract token from cookie
const getTokenFromCookie = (): string | null => {
  const tokenData = Cookies.get('auth_token');
  
  if (!tokenData) {
    return null;
  }

  try {
    const parsed = JSON.parse(tokenData);
    return parsed.token;
  } catch (error) {
    console.error(error);
    // Fallback for old token format (just the token string)
    return tokenData;
  }
};

export const fetchUserData = async (userName: string) => {
  
  try {
    // Get token from cookies (optional for viewing)
    const token = getTokenFromCookie();
    
    // Build headers - include Authorization only if token exists
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/profile/${userName}`, {
      headers,
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się pobrać danych użytkownika';
    throw new Error(errorMessage);
  }
};

export const followUser = async (userName: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.post(
      `https://games-review-api.onrender.com/api/follow/${userName}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Nie udało się obserwować użytkownika';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się obserwować użytkownika';
    throw new Error(errorMessage);
  }
};

export const checkFollowStatus = async (userName: string) => {
  
  try {
    // Get token from cookies (required for checking follow status)
    const token = getTokenFromCookie();
    
    // If no token, return null (user is not authenticated, so no follow status)
    if (!token) {
      return { isFollowing: false };
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/follow/${userName}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    // If error (e.g., 401), return not following
    return { isFollowing: false };
  }
};

export const unfollowUser = async (userName: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.delete(
      `https://games-review-api.onrender.com/api/follow/${userName}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Nie udało się przestać obserwować użytkownika';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się przestać obserwować użytkownika';
    throw new Error(errorMessage);
  }
};