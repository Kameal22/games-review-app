"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UserInfo from "./_components/user-info";
import UserReviews from "./_components/reviews/user-reviews";
import UserUtils from "./_components/user-utils/user-utils";
import { fetchUserReviews, fetchWatchlist } from "../utils";

const User: React.FC = () => {
  const router = useRouter();

  // Fetch watchlist data on component mount
  useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
  });

  useQuery({
    queryKey: ["userReviews"],
    queryFn: fetchUserReviews,
  });

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4 relative">
      <div className="bg-lightGray rounded-xl p-4 w-full h-full flex flex-col gap-4">
        <UserInfo />

        <div className="flex flex-col lg:flex-row grow gap-4">
          <UserReviews />
          <UserUtils />
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={handleBackToDashboard}
        className="absolute bottom-8 left-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Dashboard
      </button>
    </div>
  );
};

export default User;
