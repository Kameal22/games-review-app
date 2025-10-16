"use client";

import { useEffect } from 'react';
import { useUserStore } from '@/stores/user-store';

export const useTokenValidation = () => {
  const { isAuthenticated, validateAndCleanupToken } = useUserStore();

  useEffect(() => {
    // Only validate if user appears to be authenticated
    if (isAuthenticated) {
      validateAndCleanupToken();
    }
  }, [isAuthenticated, validateAndCleanupToken]);
};
