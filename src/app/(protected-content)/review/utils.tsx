import axios from "axios";
import { getTokenFromCookie } from "@/app/global-utils/get-token-from-cookies";

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
