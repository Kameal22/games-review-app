"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";

export default function Home() {
  const router = useRouter();
  const { validateAndCleanupToken } = useUserStore();

  useEffect(() => {
    // Validate and cleanup token on page load
    validateAndCleanupToken();
    // Redirect to dashboard
    router.push("/dashboard");
  }, [validateAndCleanupToken, router]);

  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-darkBackground"
    >
      <p className="text-customWhite">Przekierowywanie do panelu...</p>
    </div>
  );
}
