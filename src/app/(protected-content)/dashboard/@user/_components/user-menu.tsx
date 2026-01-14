"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, memo } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useQuery } from "@tanstack/react-query";
import { fetchUserReviews } from "@/app/(protected-content)/my-account/utils";
import { Review } from "@/app/types/review";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { useUserStore } from "@/stores/user-store";

const UserMenu: React.FC = () => {
  const [showReviewedGames, setShowReviewedGames] = useState(false);
  const { activeTab, setActiveTab, setSidebarOpen } = useDashboardStore();
  const { isAuthenticated } = useUserStore();
  const { data: userReviews = [] } = useQuery<Review[]>({
    queryKey: ["userReviews"],
    queryFn: fetchUserReviews,
    enabled: isAuthenticated, // Only fetch if authenticated
  });
  const router = useRouter();

  const toggleReviewedGames = () => {
    setShowReviewedGames((prev) => !prev);
  };

  // Memoize the recent reviews to avoid recalculating on every render
  const recentReviews = useMemo(() => userReviews.slice(0, 3), [userReviews]);

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full">
        <div
          onClick={() => {
            setActiveTab("reviews");
            setSidebarOpen(false);
          }}
          className={`w-full mt-6 p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4 ${
            activeTab === "reviews"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-lightGray hover:bg-lightGrayHover"
          }`}
        >
          <svg
            className="w-4 fill-customWhite flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" />
          </svg>
          <p className="text-customWhite text-sm lg:text-base">
            Najnowsze recenzje
          </p>
        </div>
        <div
          onClick={() => {
            setActiveTab("best-reviews");
            setSidebarOpen(false);
          }}
          className={`w-full mt-2 p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4 ${
            activeTab === "best-reviews"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-lightGray hover:bg-lightGrayHover"
          }`}
        >
          <svg
            className="w-4 fill-customWhite flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M144.3 0l224 0c26.5 0 48.1 21.8 47.1 48.2-.2 5.3-.4 10.6-.7 15.8l49.6 0c26.1 0 49.1 21.6 47.1 49.8-7.5 103.7-60.5 160.7-118 190.5-15.8 8.2-31.9 14.3-47.2 18.8-20.2 28.6-41.2 43.7-57.9 51.8l0 73.1 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0 0-73.1c-16-7.7-35.9-22-55.3-48.3-18.4-4.8-38.4-12.1-57.9-23.1-54.1-30.3-102.9-87.4-109.9-189.9-1.9-28.1 21-49.7 47.1-49.7l49.6 0c-.3-5.2-.5-10.4-.7-15.8-1-26.5 20.6-48.2 47.1-48.2zM101.5 112l-52.4 0c6.2 84.7 45.1 127.1 85.2 149.6-14.4-37.3-26.3-86-32.8-149.6zM380 256.8c40.5-23.8 77.1-66.1 83.3-144.8L411 112c-6.2 60.9-17.4 108.2-31 144.8z" />
          </svg>
          <p className="text-customWhite text-sm lg:text-base">
            Najwyżej oceniane gry
          </p>
        </div>
        <div
          onClick={() => {
            setActiveTab("games");
            setSidebarOpen(false);
          }}
          className={`w-full mt-2 p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4 ${
            activeTab === "games"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-lightGray hover:bg-lightGrayHover"
          }`}
        >
          <svg
            className="w-4 fill-customWhite flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M448 64c106 0 192 86 192 192S554 448 448 448l-256 0C86 448 0 362 0 256S86 64 192 64l256 0zM192 176c-13.3 0-24 10.7-24 24l0 32-32 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l32 0 0 32c0 13.3 10.7 24 24 24s24-10.7 24-24l0-32 32 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-32 0 0-32c0-13.3-10.7-24-24-24zm240 96a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64-96a32 32 0 1 0 0 64 32 32 0 1 0 0-64z" />
          </svg>
          <p className="text-customWhite text-sm lg:text-base">
            Przeglądaj gry
          </p>
        </div>
        {isAuthenticated && (
          <>
            <div
              onClick={() => {
                router.push("/my-account");
                setSidebarOpen(false);
              }}
              className="w-full mt-2 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4"
            >
              <svg
                className="w-4 fill-customWhite flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
              <p className="text-customWhite text-sm lg:text-base">
                Mój profil
              </p>
            </div>
            <div
              className="w-full mt-2 bg-lightGray hover:bg-lightGrayHover p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4"
              onClick={() => {
                router.push("/write-review");
                setSidebarOpen(false);
              }}
            >
              <svg
                className="w-4 fill-customWhite flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
              </svg>
              <p className="text-customWhite text-sm lg:text-base">
                Utwórz recenzję
              </p>
            </div>

            <div
              className="w-full mt-6 lg:mt-12 p-3 cursor-pointer flex justify-between items-center"
              onClick={toggleReviewedGames}
            >
              <p className="text-customWhite text-sm lg:text-base">
                Ostatnio recenzowane
              </p>
              <svg
                className={`w-3 fill-customWhite transition-transform flex-shrink-0 ${
                  showReviewedGames ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </div>

            {showReviewedGames && (
              <div className="mt-2 w-full">
                {recentReviews.map((review: Review, index: number) => (
                  <div
                    onClick={() => {
                      router.push(`/review/${review._id}`);
                      setSidebarOpen(false);
                    }}
                    key={index}
                    className="flex items-center p-2 w-full bg-lightGray rounded-lg mb-2 cursor-pointer hover:bg-lightGrayHover transition-colors duration-200"
                  >
                    <Image
                      src={review.game.coverImageUrl}
                      alt={review.game.title}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg mr-2 lg:mr-3 flex-shrink-0"
                      width={48}
                      height={48}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-customWhite text-sm lg:text-base truncate">
                        {review.game.title}
                      </p>
                      <p className="text-customWhite text-xs lg:text-sm">
                        Ocena:{" "}
                        <span
                          className={`font-bold ${getScoreColor(
                            review.finalScore
                          )}`}
                        >
                          {review.finalScore}/10
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!isAuthenticated && (
          <div
            onClick={() => {
              router.push("/login");
              setSidebarOpen(false);
            }}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-3 lg:gap-4"
          >
            <svg
              className="w-4 fill-customWhite flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <p className="text-customWhite text-sm lg:text-base">Zaloguj się</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(UserMenu);
