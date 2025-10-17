import axios from "axios";
import Cookies from "js-cookie";

// Helper function to extract token from cookie
const getTokenFromCookie = (): string | null => {
  const tokenData = Cookies.get("auth_token");

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

export const fetchReview = async (reviewId: string) => {
  try {
    const response = await axios.get(
      `https://games-review-api.onrender.com/api/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch review";
    throw new Error(errorMessage);
  }
};
