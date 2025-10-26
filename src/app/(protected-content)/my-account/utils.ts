import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchUserReviews = async () => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/reviews/me", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user reviews';
    throw new Error(errorMessage);
  }
};

export const fetchMyUserData = async () => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/profile/`, {
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

export const handleUpdateBio = async (bio: string) => {
  try {
    const token = getTokenFromCookie();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.put(`https://games-review-api.onrender.com/api/profile/bio`, {
      bio,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update bio';
    throw new Error(errorMessage);
  }
};