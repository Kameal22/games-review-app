import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchBestReviews = async (category: string) => {
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
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/reviews/highest-score?category=${category}`, {
      headers,
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch best reviews';
    throw new Error(errorMessage);
  }
};