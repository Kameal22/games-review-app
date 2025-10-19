"use client";
import { useQuery } from "@tanstack/react-query";
// import { Game } from "@/app/types/game";
// import SingleGame from "./_components/single-game";
import { fetchBestReviews } from "./utils";
import { BestReview } from "@/app/types/best-review";
import SingleBestReview from "./_components/single-best-review";

const BestReviewsList: React.FC = () => {
  // Fetch reviews on component mount
  const {
    data: bestReviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bestReviews"],
    queryFn: fetchBestReviews,
  });

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <p className="text-customWhite text-lg lg:text-xl">
        {"Highest Rated Games"}
      </p>
      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-customWhite text-lg text-center">
              Loading best reviews...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-red-500 text-lg text-center">
              Error loading best reviews
            </p>
            <p className="text-greyText text-sm text-center">
              {error?.message || "Something went wrong"}
            </p>
          </div>
        ) : bestReviews.length > 0 ? (
          <>
            {bestReviews.map((review: BestReview) => (
              <SingleBestReview key={review._id} data={review} />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-greyText text-lg text-center">
              No reviews found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestReviewsList;
