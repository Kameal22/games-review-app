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
    currentPage * gamesPerPage,
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
        title: "Sukces",
        message: "Recenzja została pomyślnie usunięta",
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
        title: "Błąd",
        message: error.message || "Nie udało się usunąć recenzji",
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
          Recenzje
        </p>
        <div className="text-center">
          <p className="text-greyText text-lg mb-4">
            Ten użytkownik nie napisał jeszcze żadnych recenzji.
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
          Recenzje
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
                      Ocena:{" "}
                      <span
                        className={`font-bold text-lg ${getScoreColor(
                          review.finalScore,
                        )}`}
                      >
                        {review.finalScore}/10
                      </span>
                    </p>
                    <p className="text-greyText text-sm sm:text-base">
                      {new Date(review.createdAt).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteClick(e, review._id)}
                disabled={deleteMutation.isPending}
                className="flex-shrink-0 px-3 py-2 text-sm sm:text-base text-red-500 hover:bg-red-500/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed self-center sm:self-auto"
                title="Usuń recenzję"
              >
                Usuń recenzję
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
        title="Usuń recenzję"
        message={
          reviewToDeleteData
            ? `Czy na pewno chcesz usunąć swoją recenzję dla "${reviewToDeleteData.game.title}"? Tej akcji nie można cofnąć.`
            : "Czy na pewno chcesz usunąć tę recenzję?"
        }
        confirmText="Usuń"
        cancelText="Anuluj"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </>
  );
};

export default UserReviews;
