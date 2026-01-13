"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchReview } from "../utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScoreColor } from "@/app/global-utils/get-score-color";
import { getScoreBackground } from "@/app/global-utils/get-score-background";
import { useUserStore } from "@/stores/user-store";
import { deleteReview } from "@/app/(protected-content)/my-account/utils";
import { useToastStore } from "@/stores/toast-store";
import ConfirmModal from "@/app/_components/confirm-modal";
import { useState } from "react";

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useUserStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", params.id],
    queryFn: () => fetchReview(params.id as string),
    enabled: !!params.id, // Only run query if we have an ID
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["review", params.id] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      addToast({
        type: "success",
        title: "Success",
        message: "Review deleted successfully",
      });
      setShowDeleteModal(false);
      // Redirect to dashboard after deletion
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      addToast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to delete review",
      });
      setShowDeleteModal(false);
    },
  });

  // Check if current user owns this review
  const isOwner =
    isAuthenticated && user && review && review.user._id === user._id;

  // Show loading state
  if (isLoading) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-customWhite text-lg">Loading review...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-500 text-lg">Error loading review</p>
                <p className="text-greyText text-sm mt-2">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!review) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="bg-darkBackground p-2"
      >
        <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
          <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-customWhite text-lg">Review not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="bg-darkBackground p-2"
    >
      <div className="bg-darkGreyBackground rounded-xl p-4 w-full h-full flex flex-col gap-4">
        <div className="bg-lightGray rounded-xl p-4 w-full flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
                Back
              </button>
              <h1 className="text-customWhite text-lg lg:text-xl">
                Review Details
              </h1>
            </div>
            {isOwner && (
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleteMutation.isPending}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                title="Delete review"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            )}
          </div>

          {/* Game Information */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={review.game.coverImageUrl}
                  alt={review.game.title}
                  width={200}
                  height={280}
                  className="w-32 h-40 lg:w-48 lg:h-64 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-customWhite text-xl lg:text-2xl font-bold mb-2">
                  {review.game.title}
                </h2>

                {/* <div className="flex flex-wrap gap-2 mb-3">
                  {review.game.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-lightGray text-customWhite px-2 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div> */}

                <p className="text-greyText mb-3">
                  Released: {formatDate(review.game.releaseDate)}
                </p>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-greyText text-sm">Final Score</p>
                    <div
                      className={`text-3xl lg:text-4xl font-bold ${getScoreColor(
                        review.finalScore
                      )}`}
                    >
                      {review.finalScore}/10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Scores */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">
              Score Breakdown
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: "Gameplay", score: review.gameplay },
                { label: "Story", score: review.story },
                { label: "Soundtrack", score: review.soundtrack },
                { label: "Graphics", score: review.graphics },
              ].map(({ label, score }) => (
                <div
                  key={label}
                  className={`p-3 rounded-lg border ${getScoreBackground(
                    score
                  )}`}
                >
                  <p className="text-greyText text-sm mb-1">{label}</p>
                  <p className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}/10
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">Review</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-customWhite whitespace-pre-line leading-relaxed">
                {review.text}
              </p>
            </div>
          </div>

          {/* Author Information */}
          <div className="bg-darkGreyBackground rounded-xl p-4">
            <h3 className="text-customWhite text-lg font-bold mb-3">
              Reviewer
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-lightGray rounded-full flex items-center justify-center">
                <span className="text-customWhite font-bold">
                  {review.user.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-customWhite font-medium">
                  {review.user.displayName}
                </p>
                <p className="text-greyText text-sm">
                  Reviewed on {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push(`/user/${review.user._id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              View Reviewer&apos;s Profile
            </button>
            <button
              onClick={() => router.push(`/game/${review.game.slug}`)}
              className="bg-lightGray hover:bg-lightGrayHover text-customWhite px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              View Game Details
            </button>
          </div> */}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (review?._id) {
            deleteMutation.mutate(review._id);
          }
        }}
        title="Delete Review"
        message={
          review
            ? `Are you sure you want to delete your review for "${review.game.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this review?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default ReviewPage;
