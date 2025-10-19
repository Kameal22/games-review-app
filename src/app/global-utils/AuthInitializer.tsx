"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";

export const AuthInitializer = () => {
  const { isAuthenticated, validateAndCleanupToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Always validate token on app initialization
    validateAndCleanupToken();

    // If user appears authenticated but we're on login page, redirect to dashboard
    if (isAuthenticated && window.location.pathname === "/login") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, validateAndCleanupToken, router]);

  return null; // This component doesn't render anything
};
