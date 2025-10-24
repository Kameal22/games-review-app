"use client";
import { useRouter } from "next/navigation";
import UserInfo from "./_components/user-info";
import UserReviews from "./_components/reviews/user-reviews";
import UserUtils from "./_components/user-utils/user-utils";
import { useQuery } from "@tanstack/react-query";
import { fetchMyUserData } from "./utils";
import { User as UserType } from "@/app/types/user";
import { Review } from "@/app/types/review";
import { Watchlist } from "@/app/types/watchlist";

type UserData = {
  user: UserType;
  insights: { averageFinalScore: number; reviewCount: number };
  reviews: Review[];
  watchlist: Watchlist[];
};

const User: React.FC = () => {
  const router = useRouter();

  const { data: userData } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: () => fetchMyUserData(),
  });
  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
        {userData && <UserInfo data={userData.user} />}

        <div className="flex flex-col lg:flex-row grow gap-4">
          {userData && userData?.reviews.length > 0 && (
            <UserReviews reviews={userData.reviews} />
          )}
          {userData && (
            <UserUtils
              watchlist={userData.watchlist}
              insights={userData.insights}
            />
          )}
        </div>

        <button
          onClick={handleBackToDashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 self-start"
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
    </div>
  );
};

export default User;
