import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export type InteractionStatus = {
  type: "like" | "dislike" | null;
};

export const likeReview = async (reviewId: string) => {
  try {
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}/like`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to like review';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to like review';
    throw new Error(errorMessage);
  }
};

export const dislikeReview = async (reviewId: string) => {
  try {
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}/dislike`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to dislike review';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to dislike review';
    throw new Error(errorMessage);
  }
};

export const removeInteraction = async (reviewId: string) => {
  try {
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.delete(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}/interaction`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove interaction';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to remove interaction';
    throw new Error(errorMessage);
  }
};

export const checkInteractionStatus = async (reviewId: string): Promise<InteractionStatus> => {
  try {
    const token = getTokenFromCookie();
    
    // If no token, return null (user is not authenticated)
    if (!token) {
      return { type: null };
    }
    
    const response = await axios.get(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}/interaction`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(error);
    // If error (e.g., 401 or no interaction), return null
    return { type: null };
  }
};
