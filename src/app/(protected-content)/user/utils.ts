import axios from "axios";
import Cookies from "js-cookie";
import { useWatchlistStore } from "@/stores/watchlist.store";

export const fetchWatchlist = async () => {
  const { setLoading, setError, setWatchlist } = useWatchlistStore.getState();
  
  setLoading(true);
  setError(null);
  
  try {
    // Get token from cookies
    const token = Cookies.get('auth_token');
    
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