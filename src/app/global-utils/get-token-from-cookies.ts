import Cookies from "js-cookie";

export const getTokenFromCookie = (): string | null => {
    const tokenData = Cookies.get('auth_token');
    
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