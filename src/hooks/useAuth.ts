import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const { user, isAuthenticated, setUser, clearUser } = useUserStore();

  useEffect(() => {
    // Check if we have a token but no user data (e.g., after page refresh)
    const token = Cookies.get("auth_token");
    
    if (token && !user) {
      // You might want to fetch user data from the API here
      // For now, we'll just check if the token exists
      console.log("Token exists but no user data. You might want to fetch user data from API.");
    } else if (!token && user) {
      // Token was removed but user data still exists, clear it
      clearUser();
    }
  }, [user, setUser, clearUser]);

  return {
    user,
    isAuthenticated,
    isLoading: false, // You can add loading state if needed
  };
};
