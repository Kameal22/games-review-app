import axios from "axios";
import { useReviewsStore } from "@/stores/reviews-store";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

type CreateReviewData = {
  gameId: string;
  gameplay: number;
  story: number;
  soundtrack: number;
  graphics: number;
  optimization: number;
  worldDesign: number;
  finalScore: number;
  text: string;
};

export const saveReview = async (review: CreateReviewData) => {
  const { setLoading, setError } = useReviewsStore.getState();
  
  setLoading(true);
  setError(null);
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    console.log("Sending review data:", review);
    
    const response = await axios.post("https://games-review-api.onrender.com/api/reviews/", review, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log("Review response:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Review submission error:", error);
    
    let errorMessage = 'Failed to save review';
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.issues) {
        errorMessage = `Validation error: ${error.response.data.issues.map((issue: { message: string }) => issue.message).join(', ')}`;
      } else {
        errorMessage = error.response?.statusText || error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

export const checkIfGameIsReviewed = async (gameId: string) => {
  const { setLoading, setError } = useReviewsStore.getState();

  setLoading(true);
  setError(null);
  
  try {
    const token = getTokenFromCookie();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`https://games-review-api.onrender.com/api/reviews/check-exists/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to check if game is reviewed';
    setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};