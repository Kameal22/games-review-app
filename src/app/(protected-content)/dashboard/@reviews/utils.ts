import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchRecentReviews = async () => {
  
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
    
    const response = await axios.get("https://games-review-api.onrender.com/api/reviews/", {
      headers,
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się pobrać najnowszych recenzji';
    throw new Error(errorMessage);
  }
};

export const fetchUserReviews = async (userId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/reviews/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się pobrać recenzji użytkownika';
    throw new Error(errorMessage);
  }
};