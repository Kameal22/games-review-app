"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentReviews } from "./utils";
import SingleReview from "./_components/single-review";
import { Review } from "@/app/types/review";
import Pagination from "@/app/_components/pagination";

const ReviewsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch reviews on component mount
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReviews,
  });

  // Filter reviews by game name
  const filteredReviews = useMemo(() => {
    if (!reviews) return [];
    if (!searchTerm.trim()) return reviews;

    return reviews.filter((review: Review) =>
      review.game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reviews, searchTerm]);

  // Calculate pagination based on filtered reviews
  const totalPages = filteredReviews
    ? Math.ceil(filteredReviews.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

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

      {/* Search Bar */}
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Search reviews by game name..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="rounded-xl p-3 w-full max-w-md bg-lightGray outline-none caret-customWhite focus:bg-lightGrayHover text-customWhite placeholder-greyText"
        />
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
        ) : filteredReviews && filteredReviews.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {currentReviews.map((review: Review) => (
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
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 flex-1 justify-center items-center">
            <p className="text-white text-xl text-center">
              {searchTerm
                ? `No reviews found for "${searchTerm}"`
                : "No reviews found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
