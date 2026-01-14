import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

export const fetchUserReviews = async () => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.get("https://games-review-api.onrender.com/api/reviews/me", {
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

export const fetchMyUserData = async () => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się pobrać danych użytkownika';
    throw new Error(errorMessage);
  }
};

export const handleUpdateBio = async (bio: string) => {
  try {
    const token = getTokenFromCookie();
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }

    const response = await axios.put(`https://games-review-api.onrender.com/api/profile/bio`, {
      bio,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się zaktualizować bio';
    throw new Error(errorMessage);
  }
};

export const fetchUserFollowing = async () => {
  
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.get(`https://games-review-api.onrender.com/api/follow/following`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się pobrać danych użytkownika';
    throw new Error(errorMessage);
  }
};

export const unfollowUser = async (userId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.delete(
      `https://games-review-api.onrender.com/api/follow/${userId}`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Nie udało się przestać obserwować użytkownika';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się przestać obserwować użytkownika';
    throw new Error(errorMessage);
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.delete(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}`,
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
      const errorMessage = error.response?.data?.message || error.message || 'Nie udało się usunąć recenzji';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się usunąć recenzji';
    throw new Error(errorMessage);
  }
};

export const updateReviewText = async (reviewId: string, text: string) => {
  try {
    // Get token from cookies
    const token = getTokenFromCookie();
    
    if (!token) {
      throw new Error('Nie znaleziono tokenu uwierzytelniającego');
    }
    
    const response = await axios.patch(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}`,
      { text },
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
      const errorMessage = error.response?.data?.message || error.message || 'Nie udało się zaktualizować recenzji';
      throw new Error(errorMessage);
    }
    const errorMessage = error instanceof Error ? error.message : 'Nie udało się zaktualizować recenzji';
    throw new Error(errorMessage);
  }
};