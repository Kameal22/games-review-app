import axios from "axios";
import { useReviewsStore } from "@/stores/reviews-store";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchRecentReviews = async () => {
  const { setLoading, setError, setReviews } = useReviewsStore.getState();
  
  setLoading(true);
  setError(null);
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/reviews/", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Store the recent reviews data in Zustand
    setReviews(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recent reviews';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const fetchUserReviews = async (userId: string) => {
  const { setUserReviewsLoading, setUserReviewsError, setUserReviews } = useReviewsStore.getState();
  
  setUserReviewsLoading(true);
  setUserReviewsError(null);
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/reviews/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Store the user reviews data in Zustand
    setUserReviews(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user reviews';
    setUserReviewsError(errorMessage);
    throw error;
  } finally {
    setUserReviewsLoading(false);
  }
};