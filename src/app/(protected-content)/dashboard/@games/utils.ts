import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchGames = async () => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/game/", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch games';
    throw new Error(errorMessage);
  }
};

export const fetchWatchlist = async () => {
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
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch games';
    throw new Error(errorMessage);
  }
};

export const addToWatchlist = async (gameId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post("https://games-review-api.onrender.com/api/watchlist/", {
      gameId, status: "watching"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // Store the recent reviews data in Zustand
    addToWatchlist(response.data);
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add to watchlist';
    throw new Error(errorMessage);
  } finally {
  }
};

export const removeFromWatchlist = async (gameId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.delete(`https://games-review-api.onrender.com/api/watchlist/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to remove from watchlist';
    throw new Error(errorMessage);
  }
};  