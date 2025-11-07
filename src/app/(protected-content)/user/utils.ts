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

export const fetchUserData = async (userId: string) => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
    throw new Error(errorMessage);
  }
};

export const followUser = async (userId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post(
      `https://games-review-api.onrender.com/api/follow/${userId}`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to follow user';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to follow user';
    throw new Error(errorMessage);
  }
};

export const checkFollowStatus = async (userId: string) => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/follow/${userId}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
    throw new Error(errorMessage);
  }
};

export const unfollowUser = async (userId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.delete(
      `https://games-review-api.onrender.com/api/follow/${userId}`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to unfollow user';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to unfollow user';
    throw new Error(errorMessage);
  }
};