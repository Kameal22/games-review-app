"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentReviews } from "./utils";
// import GamesSearch from "./games-search";
import SingleReview from "./_components/single-review";
import { Review } from "@/app/types/review";

const ReviewsList: React.FC = () => {
  const [searchTerm] = useState("");

  // Fetch reviews on component mount
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReviews,
  });

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-customWhite text-xl lg:text-2xl font-semibold">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Reviews"}
        </h2>
        <p className="text-greyText text-base lg:text-lg leading-relaxed">
          {searchTerm
            ? "Discover reviews matching your search criteria"
            : "Stay up-to-date with the newest game reviews from our community. Discover fresh perspectives on the latest releases and hidden gems."}
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-customWhite text-lg text-center">
              Loading reviews...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-red-500 text-lg text-center">
              Error loading reviews
            </p>
            <p className="text-greyText text-sm text-center">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews?.map((review: Review) => (
              <SingleReview
                key={review._id}
                data={{
                  name: review.game.title,
                  genre: review.game.genres?.join(", ") || "Unknown",
                  rating: review.finalScore,
                  user: review.user.displayName,
                  userName: review.user.displayName,
                  image: review.game.coverImageUrl,
                  reviewId: review._id,
                  createdAt: review.createdAt,
                  likes: review.likes || 0,
                  dislikes: review.dislikes || 0,
                }}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-white text-xl text-center">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
