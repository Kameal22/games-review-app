"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReviewsStore, Review } from "@/stores/reviews-store";
import { fetchRecentReviews } from "./utils";
// import GamesSearch from "./games-search";
import SingleReview from "./_components/single-review";

const ReviewsList: React.FC = () => {
  const [searchTerm] = useState("");
  // Get reviews from Zustand store
  const { reviews, isLoading, error } = useReviewsStore();

  // Fetch reviews on component mount
  useQuery({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReviews,
  });
  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <p className="text-customWhite text-lg lg:text-xl">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Reviews"}
      </p>

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
              {error || "Something went wrong"}
            </p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.map((review: Review) => (
              <SingleReview
                key={review._id}
                data={{
                  name: review.game.title,
                  genre: review.game.genres?.join(", ") || "Unknown",
                  rating: review.finalScore,
                  user: review.user.displayName,
                  image: review.game.coverImageUrl,
                  reviewId: review._id,
                  createdAt: review.createdAt,
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
