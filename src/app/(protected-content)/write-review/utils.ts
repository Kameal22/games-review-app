import axios from "axios";
import Cookies from "js-cookie";
import { useGamesStore } from "@/stores/games-store";

export const fetchGames = async () => {
  const { setLoading, setError, setGames } = useGamesStore.getState();
  
  setLoading(true);
  setError(null);
  
  try {
    // Get token from cookies
    const token = Cookies.get('auth_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/game", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Store the recent reviews data in Zustand
    setGames(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch games';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};