import axios from "axios";
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
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    
    const response = await axios.post("https://games-review-api.onrender.com/api/reviews/", review, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    
    return response.data;
  } catch (error) {
    console.error("Review submission error:", error);
    
    let errorMessage = 'Nie udało się zapisać recenzji';
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.issues) {
        errorMessage = `Błąd walidacji: ${error.response.data.issues.map((issue: { message: string }) => issue.message).join(', ')}`;
      } else {
        errorMessage = error.response?.statusText || error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

export const checkIfGameIsReviewed = async (gameId: string) => {
  
  try {
    const token = getTokenFromCookie();

    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }

    const response = await axios.get(`https://games-review-api.onrender.com/api/reviews/check-exists/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się sprawdzić, czy gra została zrecenzowana';
    throw new Error(errorMessage);
  }
};