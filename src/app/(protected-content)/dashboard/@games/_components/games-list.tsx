"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReviewsStore, Review } from "@/stores/reviews-store";
import { fetchRecentReviews } from "../utils";
import GamesSearch from "./games-search";
import Pagination from "./pagination";
import SingleGame from "./single-game";

const GamesListDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const gamesPerPage = 6;

  // Get reviews from Zustand store
  const { reviews, isLoading, error } = useReviewsStore();

  // Fetch reviews on component mount
  useQuery({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReviews,
    enabled: reviews.length === 0, // Only fetch if we don't have reviews
  });

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(
    (review: Review) =>
      review.game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.game.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      review.user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / gamesPerPage);

  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
      <GamesSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <p className="text-customWhite text-lg lg:text-xl">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : "Latest Game Reviews"}
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
        ) : currentReviews.length > 0 ? (
          <>
            {currentReviews.map((review: Review) => (
              <SingleGame
                key={review._id}
                data={{
                  name: review.game.title,
                  genre: review.game.genres.join(", "),
                  rating: review.finalScore,
                  user: review.user.displayName,
                  image: review.game.coverImageUrl,
                  reviewId: review._id,
                  createdAt: review.createdAt,
                }}
              />
            ))}
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
            <p className="text-greyText text-lg text-center">
              No reviews found for &quot;{searchTerm}&quot;
            </p>
            <p className="text-greyText text-sm text-center">
              Try searching for a different game, genre, or reviewer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesListDashboard;
