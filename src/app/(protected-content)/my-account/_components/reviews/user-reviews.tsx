"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "@/app/_components/pagination";
import { Review } from "@/app/types/review";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../utils";
import { useToastStore } from "@/stores/toast-store";
import ConfirmModal from "@/app/_components/confirm-modal";

const UserReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const gamesPerPage = 3;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const totalPages = Math.ceil(reviews.length / gamesPerPage);

  const currentReviews = reviews.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      // Invalidate and refetch user data and reviews
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      addToast({
        type: "success",
        title: "Success",
        message: "Review deleted successfully",
      });
      setReviewToDelete(null);
      // Adjust page if needed after deletion
      if (currentReviews.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to delete review",
      });
      setReviewToDelete(null);
    },
  });

  const handleDeleteClick = (e: React.MouseEvent, reviewId: string) => {
    e.stopPropagation(); // Prevent navigation to review page
    setReviewToDelete(reviewId);
  };

  const handleConfirmDelete = () => {
    if (reviewToDelete) {
      deleteMutation.mutate(reviewToDelete);
    }
  };

  const handleCancelDelete = () => {
    setReviewToDelete(null);
  };

  // If no reviews, show a message
  if (reviews.length === 0) {
    return (
      <div className="flex-1 lg:basis-[60%] flex flex-col justify-center items-center gap-4">
        <p className="text-customWhite text-xl lg:text-2xl font-semibold">
          Reviews
        </p>
        <div className="text-center">
          <p className="text-greyText text-lg mb-4">
            This user hasn&apos;t written any reviews yet.
          </p>
        </div>
      </div>
    );
  }

  const reviewToDeleteData = reviewToDelete
    ? reviews.find((r) => r._id === reviewToDelete)
    : null;

  return (
    <>
      <div className="flex-1 lg:basis-[60%] flex flex-col gap-4">
        <p className="text-customWhite text-xl lg:text-2xl font-semibold">
          Reviews
        </p>
        <div className="flex flex-col gap-3">
          {currentReviews.map((review: Review) => (
            <div
              key={review._id}
              className="bg-lightGray rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center w-full hover:bg-lightGrayHover gap-3 relative"
            >
              <div
                onClick={() => router.push(`/review/${review._id}`)}
                className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={review.game.coverImageUrl}
                    alt={review.game.title}
                    width={128}
                    height={128}
                    className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-customWhite text-lg lg:text-xl font-medium truncate">
                      {review.game.title}
                    </p>
                    <p className="text-greyText text-sm sm:text-base truncate">
                      {review.game.genres.join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-base">
                    <p className="text-customWhite">
                      Rating:{" "}
                      <span
                        className={`font-bold text-lg ${getScoreColor(
                          review.finalScore
                        )}`}
                      >
                        {review.finalScore}/10
                      </span>
                    </p>
                    <p className="text-greyText text-sm sm:text-base">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteClick(e, review._id)}
                disabled={deleteMutation.isPending}
                className="flex-shrink-0 p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete review"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={!!reviewToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        message={
          reviewToDeleteData
            ? `Are you sure you want to delete your review for "${reviewToDeleteData.game.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this review?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </>
  );
};

export default UserReviews;
