import axios from "axios";
import Cookies from "js-cookie";
import { useWatchlistStore } from "@/stores/watchlist.store";
import { useReviewsStore } from "@/stores/reviews-store";

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

export const fetchWatchlist = async () => {
  const { setLoading, setError, setWatchlist } = useWatchlistStore.getState();
  
  setLoading(true);
  setError(null);
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/watchlist/me", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Store the recent reviews data in Zustand
    setWatchlist(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch watchlist';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const fetchUserReviews = async () => {
  const { setLoading, setError, setUserReviews } = useReviewsStore.getState();
  
  setLoading(true);
  setError(null);
  
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
    
    setUserReviews(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch watchlist';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};