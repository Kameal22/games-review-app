"use client";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";
import Login from "./(auth)/login/page";

export default function Home() {
  const { validateAndCleanupToken } = useUserStore();

  useEffect(() => {
    // Validate and cleanup token on page load
    validateAndCleanupToken();
  }, [validateAndCleanupToken]);

  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-darkBackground"
    >
      <Login />
    </div>
  );
}
